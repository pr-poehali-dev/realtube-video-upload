import { useRef, useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

interface Video {
  id: number;
  title: string;
  channel: string;
  views: string;
  time: string;
  duration: string;
  thumbnail: string;
  videoUrl?: string;
}

interface VideoPlayerProps {
  video: Video;
  onClose: () => void;
  relatedVideos: Video[];
}

const VideoPlayer = ({ video, onClose, relatedVideos }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [showLike, setShowLike] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

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

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume / 100;
    }
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
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

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
        <Button variant="ghost" size="icon" onClick={onClose}>
          <Icon name="ArrowLeft" size={24} />
        </Button>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="relative bg-black rounded-lg overflow-hidden aspect-video mb-4">
              <video
                ref={videoRef}
                className="w-full h-full"
                poster={video.thumbnail}
                onClick={togglePlay}
              >
                <source src={video.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'} type="video/mp4" />
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
                  <Icon name="ThumbsUp" size={80} className="text-primary animate-scale-in" />
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={togglePlay}
                  >
                    <Icon name={isPlaying ? 'Pause' : 'Play'} size={24} />
                  </Button>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20"
                      onClick={toggleMute}
                    >
                      <Icon name={isMuted || volume === 0 ? 'VolumeX' : 'Volume2'} size={20} />
                    </Button>
                    <Slider
                      value={[volume]}
                      onValueChange={handleVolumeChange}
                      max={100}
                      step={1}
                      className="w-24"
                    />
                  </div>

                  <div className="flex-1" />

                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                  >
                    <Icon name="Maximize" size={20} />
                  </Button>
                </div>
              </div>
            </div>

            <Card className="bg-card border-border p-4">
              <h1 className="text-xl font-bold mb-3">{video.title}</h1>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${video.channel}`} />
                    <AvatarFallback>{video.channel[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{video.channel}</p>
                    <p className="text-xs text-muted-foreground">1.2M подписчиков</p>
                  </div>
                  <Button
                    className={isSubscribed ? 'bg-secondary text-foreground' : 'gradient-red text-white'}
                    onClick={() => setIsSubscribed(!isSubscribed)}
                  >
                    {isSubscribed ? 'Вы подписаны' : 'Подписаться'}
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" className="gap-2" onClick={handleLike}>
                    <Icon name="ThumbsUp" size={18} />
                    1.2K
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Icon name="ThumbsDown" size={18} />
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Icon name="Share2" size={18} />
                    Поделиться
                  </Button>
                </div>
              </div>

              <div className="bg-secondary rounded-lg p-4">
                <p className="text-sm font-semibold mb-2">
                  {video.views} просмотров • {video.time}
                </p>
                <p className="text-sm text-muted-foreground">
                  Описание видео появится здесь. Автор может рассказать о содержании,
                  добавить ссылки и временные метки.
                </p>
              </div>
            </Card>

            <Card className="bg-card border-border p-4 mt-4">
              <h3 className="font-semibold mb-4">Комментарии</h3>
              <div className="flex gap-3 mb-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <input
                  type="text"
                  placeholder="Добавьте комментарий..."
                  className="flex-1 bg-transparent border-b border-border pb-2 outline-none focus:border-primary transition-colors"
                />
              </div>
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-sm">Комментарии появятся здесь</p>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <h3 className="font-semibold mb-4">Рекомендации</h3>
            <div className="space-y-3">
              {relatedVideos.map((relVideo) => (
                <Card
                  key={relVideo.id}
                  className="bg-card border-border overflow-hidden hover-lift cursor-pointer flex gap-2 p-2"
                >
                  <div className="relative w-40 aspect-video overflow-hidden rounded flex-shrink-0">
                    <img
                      src={relVideo.thumbnail}
                      alt={relVideo.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
                      {relVideo.duration}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm line-clamp-2 mb-1">
                      {relVideo.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">{relVideo.channel}</p>
                    <p className="text-xs text-muted-foreground">
                      {relVideo.views} • {relVideo.time}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
