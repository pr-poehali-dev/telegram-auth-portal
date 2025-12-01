import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import TelegramLoginButton from '@/components/TelegramLoginButton';
import { toast } from 'sonner';

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

const TELEGRAM_BOT_NAME = import.meta.env.VITE_TELEGRAM_BOT_NAME || 'demo_login_bot';
const BACKEND_URL = 'https://functions.poehali.dev/205c0a6d-1230-42ae-b34d-8d458108a3ba';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [useDemoMode, setUseDemoMode] = useState(false);
  const navigate = useNavigate();

  const handleTelegramAuth = async (user: TelegramUser) => {
    setIsLoading(true);
    
    try {
      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('session_token', data.session_token);
        
        toast.success(`Добро пожаловать, ${data.user.first_name}!`);
        navigate('/portal');
      } else {
        toast.error(data.error || 'Ошибка авторизации');
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast.error('Не удалось подключиться к серверу');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setIsLoading(true);
    
    const demoUser = {
      id: 123456789,
      first_name: 'Алексей',
      last_name: 'Петров',
      username: 'alex_petrov',
    };
    
    localStorage.setItem('user', JSON.stringify(demoUser));
    localStorage.setItem('session_token', 'demo_session');
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Вход в демо-режиме');
      navigate('/portal');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/10 p-4">
      <div className="w-full max-w-md space-y-8 fade-in">
        <div className="text-center space-y-3">
          <div className="w-20 h-20 rounded-2xl bg-primary mx-auto flex items-center justify-center shadow-lg">
            <Icon name="Rocket" className="text-primary-foreground" size={40} />
          </div>
          <h1 className="text-4xl font-bold">Информационный портал</h1>
          <p className="text-muted-foreground text-lg">
            Авторизуйтесь для доступа к контенту
          </p>
        </div>

        <Card className="shadow-xl border-2">
          <CardHeader className="space-y-3 pb-6">
            <CardTitle className="text-2xl text-center">Вход в систему</CardTitle>
            <CardDescription className="text-center text-base">
              Используйте Telegram для быстрого и безопасного входа
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {!useDemoMode && TELEGRAM_BOT_NAME !== 'demo_login_bot' ? (
                <div className="space-y-3">
                  <TelegramLoginButton
                    botName={TELEGRAM_BOT_NAME}
                    buttonSize="large"
                    dataOnauth={handleTelegramAuth}
                  />
                  <Button
                    variant="outline"
                    onClick={() => setUseDemoMode(true)}
                    className="w-full"
                  >
                    Использовать демо-режим
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="p-4 bg-accent/30 rounded-lg border border-accent text-center">
                    <p className="text-sm text-muted-foreground mb-3">
                      {TELEGRAM_BOT_NAME === 'demo_login_bot' 
                        ? 'Настройте бота в переменных окружения для реальной авторизации'
                        : 'Демо-режим для тестирования'}
                    </p>
                  </div>
                  <Button 
                    onClick={handleDemoLogin}
                    disabled={isLoading}
                    className="w-full h-14 text-lg gap-3 shadow-md hover:shadow-lg transition-all"
                    size="lg"
                  >
                    {isLoading ? (
                      <>
                        <Icon name="Loader2" className="animate-spin" size={24} />
                        Подключение...
                      </>
                    ) : (
                      <>
                        <Icon name="Send" size={24} />
                        Войти (Демо)
                      </>
                    )}
                  </Button>
                  {useDemoMode && TELEGRAM_BOT_NAME !== 'demo_login_bot' && (
                    <Button
                      variant="ghost"
                      onClick={() => setUseDemoMode(false)}
                      className="w-full"
                    >
                      Вернуться к Telegram авторизации
                    </Button>
                  )}
                </div>
              )}

              <div className="flex items-center gap-3 p-4 bg-accent/30 rounded-lg border border-accent">
                <Icon name="ShieldCheck" size={20} className="text-accent-foreground flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  Мы не храним ваши данные из Telegram. Вход полностью безопасен.
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/50 flex items-center justify-center">
                  <Icon name="Lock" size={18} className="text-accent-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Защищенный доступ</p>
                  <p className="text-xs text-muted-foreground">Двухфакторная аутентификация</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/50 flex items-center justify-center">
                  <Icon name="Zap" size={18} className="text-accent-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Мгновенный вход</p>
                  <p className="text-xs text-muted-foreground">Без регистрации и паролей</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/50 flex items-center justify-center">
                  <Icon name="Users" size={18} className="text-accent-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Персонализация</p>
                  <p className="text-xs text-muted-foreground">Контент специально для вас</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          Входя в систему, вы соглашаетесь с{' '}
          <a href="#" className="text-primary hover:underline">
            условиями использования
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
