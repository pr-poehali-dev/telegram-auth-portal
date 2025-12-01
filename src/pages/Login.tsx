import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleTelegramLogin = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      navigate('/portal');
    }, 1500);
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
              <Button 
                onClick={handleTelegramLogin}
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
                    Войти через Telegram
                  </>
                )}
              </Button>

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
