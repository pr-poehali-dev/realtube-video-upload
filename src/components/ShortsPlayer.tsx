import { useRef, useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { isSubscribed, subscribe, unsubscribe } from '@/lib/subscriptions';

interface Short {
  id: number;
  title: string;
  views: string;
  thumbnail: string;
  channel?: string;
  videoUrl?: string;
}

interface ShortsPlayerProps {
  shorts: Short[];
  initialIndex: number;
  onClose: () => void;
}

const ShortsPlayer = ({ shorts, initialIndex, onClose }: ShortsPlayerProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [showLike, setShowLike] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentShort = shorts[currentIndex];
  const channelId = `channel_${currentShort.channel?.replace(/\s+/g, '_').toLowerCase() || 'user'}`;

  useEffect(() => {
    setSubscribed(isSubscribed(channelId));
  }, [channelId, currentIndex]);

  const handleSubscribe = () => {
    if (subscribed) {
      unsubscribe(channelId);
      setSubscribed(false);
    } else {
      subscribe({
        id: channelId,
        name: currentShort.channel || 'Пользователь',
        handle: `@${currentShort.channel?.replace(/\s+/g, '').toLowerCase() || 'user'}`,
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${currentShort.channel || 'User'}`,
        subscribers: currentShort.views,
      });
      setSubscribed(true);
    }
  };

  useEffect(() => {
    if (videoRef.current && isPlaying) {
      videoRef.current.play();
    }
  }, [currentIndex, isPlaying]);

  const handleNext = () => {
    if (currentIndex < shorts.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleLike = () => {
    setShowLike(true);
    setTimeout(() => setShowLike(false), 1000);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY > 0) {
      handleNext();
    } else if (e.deltaY < 0) {
      handlePrev();
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black z-50 overflow-hidden"
      onWheel={handleWheel}
    >
      <div className="absolute top-4 left-4 z-20">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20"
          onClick={onClose}
        >
          <Icon name="X" size={24} />
        </Button>
      </div>

      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20"
          onClick={toggleMute}
        >
          <Icon name={isMuted ? 'VolumeX' : 'Volume2'} size={24} />
        </Button>
      </div>

      <div className="h-full w-full flex items-center justify-center relative">
        <div className="relative h-full max-w-[500px] w-full bg-black">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            poster={currentShort.thumbnail}
            loop
            autoPlay
            playsInline
            onClick={togglePlay}
          >
            <source src={currentShort.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'} type="video/mp4" />
          </video>

          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <Button
                size="icon"
                className="h-16 w-16 rounded-full gradient-red text-white"
                onClick={togglePlay}
              >
                <Icon name="Play" size={32} />
              </Button>
            </div>
          )}

          {showLike && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Icon name="Heart" size={100} className="text-primary animate-scale-in" />
            </div>
          )}

          <div className="absolute right-4 bottom-24 flex flex-col gap-6">
            <button
              onClick={handleLike}
              className="flex flex-col items-center gap-1 text-white"
            >
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center hover:bg-white/30 transition-colors">
                <Icon name="Heart" size={24} />
              </div>
              <span className="text-xs font-semibold">5.8K</span>
            </button>

            <button className="flex flex-col items-center gap-1 text-white">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center hover:bg-white/30 transition-colors">
                <Icon name="MessageCircle" size={24} />
              </div>
              <span className="text-xs font-semibold">432</span>
            </button>

            <button className="flex flex-col items-center gap-1 text-white">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center hover:bg-white/30 transition-colors">
                <Icon name="Share2" size={24} />
              </div>
              <span className="text-xs font-semibold">Поделиться</span>
            </button>

            <button className="flex flex-col items-center gap-1 text-white">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center hover:bg-white/30 transition-colors">
                <Icon name="MoreVertical" size={24} />
              </div>
            </button>
          </div>

          <div className="absolute left-4 right-20 bottom-6 text-white">
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="h-10 w-10 border-2 border-white">
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${currentShort.channel || 'User'}`} />
                <AvatarFallback>{currentShort.channel?.[0] || 'U'}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{currentShort.channel || 'Пользователь'}</p>
                <p className="text-xs opacity-80">{currentShort.views} просмотров</p>
              </div>
              <Button
                size="sm"
                className={subscribed ? 'bg-secondary text-foreground ml-auto' : 'gradient-red text-white ml-auto'}
                onClick={handleSubscribe}
              >
                {subscribed ? 'Подписаны' : 'Подписаться'}
              </Button>
            </div>

            <p className="font-semibold text-sm line-clamp-2 mb-2">
              {currentShort.title}
            </p>
          </div>

          {currentIndex > 0 && (
            <button
              onClick={handlePrev}
              className="absolute left-1/2 top-8 -translate-x-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <Icon name="ChevronUp" size={24} />
            </button>
          )}

          {currentIndex < shorts.length - 1 && (
            <button
              onClick={handleNext}
              className="absolute left-1/2 bottom-32 -translate-x-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <Icon name="ChevronDown" size={24} />
            </button>
          )}
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
        {shorts.map((_, idx) => (
          <div
            key={idx}
            className={`h-1 rounded-full transition-all ${
              idx === currentIndex ? 'w-8 bg-primary' : 'w-1.5 bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ShortsPlayer;