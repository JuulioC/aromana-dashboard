
import { useState, useEffect } from 'react';
import { toast } from './use-toast';

declare global {
  interface Window {
    google: any;
    gapi: any;
  }
}

export interface GoogleUser {
  id: string;
  name: string;
  email: string;
  picture: string;
  accessToken: string;
}

export const useGoogleAuth = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Configurações do OAuth (você precisará substituir pelo seu Client ID)
  // const CLIENT_ID = 'SEU_GOOGLE_CLIENT_ID_AQUI.apps.googleusercontent.com';
  const CLIENT_ID = '239108982428-27grjk11aofudjbaask8jkcb99erc1gu.apps.googleusercontent.com';
  const SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email';

  useEffect(() => {
    loadGoogleScript();
  }, []);

  const loadGoogleScript = () => {
    if (window.gapi) {
      initializeGapi();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () => {
      initializeGapi();
    };
    document.head.appendChild(script);
  };

  const initializeGapi = () => {
    window.gapi.load('auth2', () => {
      window.gapi.auth2.init({
        client_id: CLIENT_ID,
        scope: SCOPES
      }).then(() => {
        setIsInitialized(true);
        
        // Verifica se já existe um usuário logado
        const authInstance = window.gapi.auth2.getAuthInstance();
        if (authInstance.isSignedIn.get()) {
          const googleUser = authInstance.currentUser.get();
          setUserFromGoogle(googleUser);
        }
      }).catch((error: any) => {
        console.error('Erro ao inicializar Google Auth:', error);
        toast({
          title: "Erro de inicialização",
          description: "Não foi possível inicializar a autenticação com Google.",
          variant: "destructive"
        });
      });
    });
  };

  const setUserFromGoogle = (googleUser: any) => {
    const profile = googleUser.getBasicProfile();
    const authResponse = googleUser.getAuthResponse();
    
    const userData: GoogleUser = {
      id: profile.getId(),
      name: profile.getName(),
      email: profile.getEmail(),
      picture: profile.getImageUrl(),
      accessToken: authResponse.access_token
    };
    
    setUser(userData);
    
    // Salva no localStorage
    localStorage.setItem('googleAuth_user', JSON.stringify(userData));
  };

  const signIn = async () => {
    if (!isInitialized) {
      toast({
        title: "Google Auth não inicializado",
        description: "Aguarde a inicialização do sistema.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const authInstance = window.gapi.auth2.getAuthInstance();
      const googleUser = await authInstance.signIn();
      
      setUserFromGoogle(googleUser);
      
      toast({
        title: "Login realizado com sucesso!",
        description: `Bem-vindo, ${googleUser.getBasicProfile().getName()}!`
      });
      
    } catch (error: any) {
      console.error('Erro no login:', error);
      
      if (error.error === 'popup_closed_by_user') {
        toast({
          title: "Login cancelado",
          description: "O popup de login foi fechado.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Erro no login",
          description: "Não foi possível fazer login com Google.",
          variant: "destructive"
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      const authInstance = window.gapi.auth2.getAuthInstance();
      await authInstance.signOut();
      
      setUser(null);
      localStorage.removeItem('googleAuth_user');
      
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado do Google."
      });
      
    } catch (error) {
      console.error('Erro no logout:', error);
      toast({
        title: "Erro no logout",
        description: "Erro ao desconectar da conta Google.",
        variant: "destructive"
      });
    }
  };

  const getStoredUser = () => {
    try {
      const storedUser = localStorage.getItem('googleAuth_user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      }
    } catch (error) {
      console.error('Erro ao recuperar dados do usuário:', error);
    }
  };

  useEffect(() => {
    getStoredUser();
  }, []);

  return {
    user,
    isLoading,
    isInitialized,
    signIn,
    signOut
  };
};
