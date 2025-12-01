import { useEffect, useRef } from 'react';

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

interface TelegramLoginButtonProps {
  botName: string;
  buttonSize?: 'large' | 'medium' | 'small';
  cornerRadius?: number;
  requestAccess?: boolean;
  usePic?: boolean;
  dataOnauth: (user: TelegramUser) => void;
  dataAuthUrl?: string;
}

declare global {
  interface Window {
    TelegramLoginWidget?: {
      dataOnauth?: (user: TelegramUser) => void;
    };
  }
}

const TelegramLoginButton = ({
  botName,
  buttonSize = 'large',
  cornerRadius = 20,
  requestAccess = true,
  usePic = true,
  dataOnauth,
  dataAuthUrl,
}: TelegramLoginButtonProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    window.TelegramLoginWidget = {
      dataOnauth: dataOnauth,
    };

    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.setAttribute('data-telegram-login', botName);
    script.setAttribute('data-size', buttonSize);
    script.setAttribute('data-radius', cornerRadius.toString());
    script.setAttribute('data-request-access', requestAccess ? 'write' : '');
    script.setAttribute('data-userpic', usePic ? 'true' : 'false');
    
    if (dataAuthUrl) {
      script.setAttribute('data-auth-url', dataAuthUrl);
    } else {
      script.setAttribute('data-onauth', 'TelegramLoginWidget.dataOnauth(user)');
    }

    script.async = true;

    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [botName, buttonSize, cornerRadius, requestAccess, usePic, dataOnauth, dataAuthUrl]);

  return <div ref={containerRef} className="flex justify-center" />;
};

export default TelegramLoginButton;
