import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import ChannelPage from '@/components/ChannelPage';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [showChannel, setShowChannel] = useState(false);

  if (showChannel) {
    return <ChannelPage onBack={() => setShowChannel(false)} />;
  }

  const mockVideos = [
    {
      id: 1,
      title: 'Как создать стартап с нуля',
      channel: 'Бизнес Академия',
      views: '1.2M',
      time: '3 дня назад',
      duration: '15:34',
      thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=225&fit=crop',
    },
    {
      id: 2,
      title: 'Топ 10 городов для путешествий 2025',
      channel: 'Мир Путешествий',
      views: '890K',
      time: '1 неделю назад',
      duration: '12:18',
      thumbnail: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=225&fit=crop',
    },
    {
      id: 3,
      title: 'React + TypeScript: Полный курс',
      channel: 'Code Masters',
      views: '2.5M',
      time: '2 недели назад',
      duration: '45:22',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop',
    },
    {
      id: 4,
      title: 'Утренняя йога для начинающих',
      channel: 'Здоровый Образ',
      views: '450K',
      time: '5 дней назад',
      duration: '20:15',
      thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=225&fit=crop',
    },
    {
      id: 5,
      title: 'Готовим идеальную пасту карбонара',
      channel: 'Кулинарный Блог',
      views: '3.1M',
      time: '1 месяц назад',
      duration: '8:45',
      thumbnail: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=225&fit=crop',
    },
    {
      id: 6,
      title: 'Новый Tesla Model X - полный обзор',
      channel: 'Авто Мания',
      views: '5.2M',
      time: '3 дня назад',
      duration: '18:30',
      thumbnail: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=225&fit=crop',
    },
  ];

  const mockShorts = [
    {
      id: 1,
      title: 'Невероятный трюк на скейте',
      views: '5.8M',
      thumbnail: 'https://images.unsplash.com/photo-1547447134-cd3f5c716030?w=300&h=533&fit=crop',
    },
    {
      id: 2,
      title: 'Котик vs огурец 😂',
      views: '12M',
      thumbnail: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=533&fit=crop',
    },
    {
      id: 3,
      title: 'Лайфхак для кухни',
      views: '3.2M',
      thumbnail: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=300&h=533&fit=crop',
    },
    {
      id: 4,
      title: 'Танец на улице',
      views: '8.5M',
      thumbnail: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&h=533&fit=crop',
    },
  ];

  const navItems = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'shorts', label: 'Shorts', icon: 'Play' },
    { id: 'subscriptions', label: 'Подписки', icon: 'Users' },
    { id: 'library', label: 'Библиотека', icon: 'Folder' },
    { id: 'history', label: 'История', icon: 'History' },
    { id: 'trending', label: 'Тренды', icon: 'TrendingUp' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Icon name="Menu" size={24} />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg gradient-red flex items-center justify-center">
                <Icon name="Play" size={20} className="text-white" />
              </div>
              <h1 className="text-xl font-bold tracking-tight">RealGazGikTube</h1>
            </div>
          </div>

          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Input
                type="text"
                placeholder="Поиск"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-secondary border-border pl-4 pr-12 py-2 rounded-full"
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-1 top-1/2 -translate-y-1/2 gradient-red rounded-full"
              >
                <Icon name="Search" size={18} className="text-white" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon" variant="ghost" className="hover:bg-secondary">
                  <Icon name="Upload" size={22} />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Загрузить видео</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4 py-4">
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                    <Icon name="Upload" size={48} className="mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Перетащите видео сюда или нажмите для выбора
                    </p>
                  </div>
                  <Input type="text" placeholder="Название видео" />
                  <Button className="gradient-red text-white">
                    Загрузить
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button size="icon" variant="ghost" className="hover:bg-secondary">
              <Icon name="Bell" size={22} />
            </Button>

            <Avatar className="h-8 w-8 cursor-pointer" onClick={() => setShowChannel(true)}>
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="sticky top-16 h-[calc(100vh-4rem)] w-64 border-r border-border overflow-y-auto">
          <nav className="py-4 px-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all ${
                  activeSection === item.id
                    ? 'bg-secondary text-primary font-medium'
                    : 'hover:bg-secondary/50 text-foreground'
                }`}
              >
                <Icon name={item.icon} size={20} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="border-t border-border my-4" />

          <div className="px-3 py-2">
            <h3 className="px-4 text-sm font-semibold text-muted-foreground mb-3">
              Подписки
            </h3>
            <div className="space-y-1">
              {['Tech Channel', 'Cooking Show', 'Music Vibes'].map((channel, idx) => (
                <button
                  key={idx}
                  className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${channel}`} />
                    <AvatarFallback>{channel[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm truncate">{channel}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        <main className="flex-1 p-6">
          {activeSection === 'home' && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold mb-6">Рекомендации для вас</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockVideos.map((video) => (
                  <Card
                    key={video.id}
                    className="bg-card border-border overflow-hidden hover-lift cursor-pointer group"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="flex gap-3">
                        <Avatar className="h-9 w-9 mt-1">
                          <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${video.channel}`} />
                          <AvatarFallback>{video.channel[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm line-clamp-2 mb-1">
                            {video.title}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {video.channel}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {video.views} просмотров • {video.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'shorts' && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg gradient-red flex items-center justify-center">
                  <Icon name="Play" size={24} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold">Shorts</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {mockShorts.map((short) => (
                  <Card
                    key={short.id}
                    className="bg-card border-border overflow-hidden hover-lift cursor-pointer group"
                  >
                    <div className="relative aspect-[9/16] overflow-hidden">
                      <img
                        src={short.thumbnail}
                        alt={short.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <p className="text-white font-semibold text-sm line-clamp-2 mb-1">
                          {short.title}
                        </p>
                        <p className="text-white/80 text-xs flex items-center gap-1">
                          <Icon name="Eye" size={12} />
                          {short.views}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {['subscriptions', 'library', 'history', 'trending'].includes(activeSection) && (
            <div className="animate-fade-in text-center py-20">
              <Icon name="Construction" size={64} className="mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-bold mb-2">Раздел в разработке</h2>
              <p className="text-muted-foreground">
                Этот раздел будет доступен в следующих обновлениях
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;