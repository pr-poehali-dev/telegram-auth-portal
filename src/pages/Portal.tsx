import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
}

const mockArticles: Article[] = [
  {
    id: 1,
    title: 'Новые возможности платформы',
    excerpt: 'Обзор последних обновлений и функций, которые помогут вам работать эффективнее.',
    date: '2 декабря 2024',
    category: 'Обновления',
    readTime: '5 мин'
  },
  {
    id: 2,
    title: 'Руководство по безопасности',
    excerpt: 'Лучшие практики для защиты вашего аккаунта и данных на платформе.',
    date: '28 ноября 2024',
    category: 'Безопасность',
    readTime: '8 мин'
  },
  {
    id: 3,
    title: 'Интеграция с внешними сервисами',
    excerpt: 'Как подключить сторонние инструменты для расширения функциональности.',
    date: '25 ноября 2024',
    category: 'Интеграции',
    readTime: '6 мин'
  },
  {
    id: 4,
    title: 'Оптимизация рабочего процесса',
    excerpt: 'Советы и трюки для повышения продуктивности при работе с порталом.',
    date: '20 ноября 2024',
    category: 'Советы',
    readTime: '4 мин'
  }
];

const Portal = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/');
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  const filteredArticles = mockArticles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExportData = () => {
    const userData = {
      name: 'Алексей Петров',
      username: '@alex_petrov',
      joinDate: '15 октября 2024',
      articles: mockArticles,
      settings: {
        notifications,
        emailUpdates
      }
    };
    
    const dataStr = JSON.stringify(userData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'portal-data-export.json';
    link.click();
    
    toast.success('Данные экспортированы');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Icon name="Rocket" className="text-primary-foreground" size={24} />
              </div>
              <h1 className="text-xl font-semibold">Портал</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon">
                <Icon name="Bell" size={20} />
              </Button>
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary text-primary-foreground">АП</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="home" className="gap-2">
              <Icon name="Home" size={16} />
              Главная
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2">
              <Icon name="User" size={16} />
              Профиль
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Icon name="Settings" size={16} />
              Настройки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="fade-in space-y-6">
            <div className="max-w-2xl mx-auto space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">Добро пожаловать!</h2>
                <p className="text-muted-foreground">Ваш персональный информационный портал</p>
              </div>

              <div className="relative">
                <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  placeholder="Поиск по контенту..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>

              {searchQuery && (
                <div className="text-sm text-muted-foreground">
                  Найдено результатов: {filteredArticles.length}
                </div>
              )}

              <div className="grid gap-4">
                {filteredArticles.map((article) => (
                  <Card key={article.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">{article.category}</Badge>
                            <span className="text-xs text-muted-foreground">{article.readTime}</span>
                          </div>
                          <CardTitle className="text-xl">{article.title}</CardTitle>
                          <CardDescription>{article.excerpt}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{article.date}</span>
                        <Button variant="ghost" size="sm" className="gap-2">
                          Читать далее
                          <Icon name="ArrowRight" size={16} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="profile" className="fade-in">
            <div className="max-w-2xl mx-auto space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Профиль пользователя</CardTitle>
                  <CardDescription>Информация о вашем аккаунте</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-primary text-primary-foreground text-2xl">АП</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h3 className="text-2xl font-semibold">
                        {user?.first_name} {user?.last_name || ''}
                      </h3>
                      <p className="text-muted-foreground">
                        {user?.username ? `@${user.username}` : `ID: ${user?.id}`}
                      </p>
                      <Badge className="mt-2">Верифицированный</Badge>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Дата регистрации</p>
                        <p className="font-medium">15 октября 2024</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Прочитано статей</p>
                        <p className="font-medium">42</p>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Telegram ID</p>
                      <p className="font-medium font-mono">{user?.id}</p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Последняя активность</p>
                      <p className="font-medium">2 декабря 2024, 14:30</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Избранные категории</CardTitle>
                  <CardDescription>Темы, которые вас интересуют</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="px-3 py-1.5">Обновления</Badge>
                    <Badge variant="secondary" className="px-3 py-1.5">Безопасность</Badge>
                    <Badge variant="secondary" className="px-3 py-1.5">Интеграции</Badge>
                    <Badge variant="secondary" className="px-3 py-1.5">Советы</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="fade-in">
            <div className="max-w-2xl mx-auto space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Уведомления</CardTitle>
                  <CardDescription>Управление настройками уведомлений</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="notifications" className="text-base">Push-уведомления</Label>
                      <p className="text-sm text-muted-foreground">
                        Получать уведомления о новом контенте
                      </p>
                    </div>
                    <Switch
                      id="notifications"
                      checked={notifications}
                      onCheckedChange={setNotifications}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="email-updates" className="text-base">Email-рассылка</Label>
                      <p className="text-sm text-muted-foreground">
                        Получать еженедельную подборку материалов
                      </p>
                    </div>
                    <Switch
                      id="email-updates"
                      checked={emailUpdates}
                      onCheckedChange={setEmailUpdates}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Экспорт данных</CardTitle>
                  <CardDescription>Скачайте все ваши данные с портала</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Экспорт включает профиль, настройки и историю активности в формате JSON
                  </p>
                  <Button onClick={handleExportData} className="gap-2">
                    <Icon name="Download" size={18} />
                    Экспортировать данные
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Аккаунт</CardTitle>
                  <CardDescription>Управление учетной записью</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-accent/50 rounded-lg">
                    <Icon name="Info" size={20} className="text-accent-foreground" />
                    <p className="text-sm">
                      Вы авторизованы через Telegram. Выход произойдет автоматически при закрытии сессии.
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full gap-2"
                    onClick={() => {
                      localStorage.removeItem('user');
                      localStorage.removeItem('session_token');
                      toast.success('Вы вышли из системы');
                      navigate('/');
                    }}
                  >
                    <Icon name="LogOut" size={18} />
                    Выйти из аккаунта
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Portal;