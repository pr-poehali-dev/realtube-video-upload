import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface ChannelData {
  name: string;
  handle: string;
  description: string;
  avatar: string;
  banner: string;
  subscribers: string;
  videosCount: number;
}

interface ChannelPageProps {
  onBack: () => void;
}

const ChannelPage = ({ onBack }: ChannelPageProps) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [channelData, setChannelData] = useState<ChannelData>({
    name: 'Мой Канал',
    handle: '@mychannel',
    description: 'Добро пожаловать на мой канал! Здесь я делюсь интересными видео.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user',
    banner: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&h=300&fit=crop',
    subscribers: '0',
    videosCount: 0,
  });

  const [editForm, setEditForm] = useState(channelData);

  const handleSave = () => {
    setChannelData(editForm);
    setIsEditOpen(false);
  };

  const myVideos = [
    {
      id: 1,
      title: 'Мое первое видео',
      views: '1.2K',
      time: '2 дня назад',
      duration: '10:24',
      thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=225&fit=crop',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 bg-background border-b border-border px-4 py-3">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <Icon name="ArrowLeft" size={24} />
          </Button>
          <h2 className="text-lg font-semibold">{channelData.name}</h2>
        </div>
      </div>

      <div className="relative">
        <div className="h-48 md:h-64 bg-gradient-to-r from-primary/20 to-accent/20 overflow-hidden">
          <img
            src={channelData.banner}
            alt="Banner"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-end gap-4 -mt-12 md:-mt-16 mb-6">
          <Avatar className="h-32 w-32 border-4 border-background">
            <AvatarImage src={channelData.avatar} />
            <AvatarFallback>{channelData.name[0]}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold mb-1">{channelData.name}</h1>
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-3">
              <span>{channelData.handle}</span>
              <span>•</span>
              <span>{channelData.subscribers} подписчиков</span>
              <span>•</span>
              <span>{channelData.videosCount} видео</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4 max-w-2xl">
              {channelData.description}
            </p>
          </div>

          <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-red text-white">
                <Icon name="Settings" size={18} className="mr-2" />
                Настроить канал
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>Настройка канала</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Название канала</Label>
                  <Input
                    id="name"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    placeholder="Введите название"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="handle">Идентификатор</Label>
                  <Input
                    id="handle"
                    value={editForm.handle}
                    onChange={(e) => setEditForm({ ...editForm, handle: e.target.value })}
                    placeholder="@mychannel"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Описание</Label>
                  <Textarea
                    id="description"
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    placeholder="Расскажите о своем канале"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="avatar">URL аватара</Label>
                  <Input
                    id="avatar"
                    value={editForm.avatar}
                    onChange={(e) => setEditForm({ ...editForm, avatar: e.target.value })}
                    placeholder="https://..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="banner">URL баннера</Label>
                  <Input
                    id="banner"
                    value={editForm.banner}
                    onChange={(e) => setEditForm({ ...editForm, banner: e.target.value })}
                    placeholder="https://..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button onClick={handleSave} className="gradient-red text-white flex-1">
                    Сохранить изменения
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                    Отмена
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="videos" className="mb-8">
          <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent p-0">
            <TabsTrigger
              value="videos"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Видео
            </TabsTrigger>
            <TabsTrigger
              value="shorts"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Shorts
            </TabsTrigger>
            <TabsTrigger
              value="about"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              О канале
            </TabsTrigger>
          </TabsList>

          <TabsContent value="videos" className="mt-6">
            {myVideos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {myVideos.map((video) => (
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
                      <h3 className="font-semibold text-sm line-clamp-2 mb-1">
                        {video.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {video.views} просмотров • {video.time}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Icon name="Video" size={64} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Пока нет видео</h3>
                <p className="text-muted-foreground mb-4">
                  Загрузите свое первое видео, чтобы начать
                </p>
                <Button className="gradient-red text-white">
                  <Icon name="Upload" size={18} className="mr-2" />
                  Загрузить видео
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="shorts" className="mt-6">
            <div className="text-center py-20">
              <Icon name="Play" size={64} className="mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Нет Shorts</h3>
              <p className="text-muted-foreground">
                Загрузите короткие вертикальные видео
              </p>
            </div>
          </TabsContent>

          <TabsContent value="about" className="mt-6">
            <Card className="bg-card border-border p-6">
              <h3 className="text-lg font-semibold mb-4">Описание</h3>
              <p className="text-muted-foreground whitespace-pre-wrap mb-6">
                {channelData.description}
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Icon name="Users" size={18} className="text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {channelData.subscribers} подписчиков
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Video" size={18} className="text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {channelData.videosCount} видео
                  </span>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ChannelPage;
