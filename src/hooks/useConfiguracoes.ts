
import { useState, useEffect } from 'react';

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  celular: string;
  temWhatsApp: boolean;
  ativo: boolean;
}

export interface Configuracoes {
  mensagemPadrao: string;
  urlImagem: string;
  alertaEmail: boolean;
  alertaSms: boolean;
  alertaWhatsApp: boolean;
  usuarios: Usuario[];
}

// Configurações padrão
const configuracoesDefault: Configuracoes = {
  mensagemPadrao: "Parabéns [NOME]! Desejamos um feliz aniversário! 🎉🎂 Que este novo ano de vida seja repleto de alegrias, conquistas e momentos especiais!",
  urlImagem: "",
  alertaEmail: true,
  alertaSms: false,
  alertaWhatsApp: true,
  usuarios: []
};

export const useConfiguracoes = () => {
  const [configuracoes, setConfiguracoes] = useState<Configuracoes | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Carrega configurações do localStorage ou usa padrão
    const carregarConfiguracoes = async () => {
      setIsLoading(true);
      
      try {
        const configSalvas = localStorage.getItem('gestorAniversarios_configuracoes');
        if (configSalvas) {
          const configParsed = JSON.parse(configSalvas);
          // Merge com configurações padrão para garantir que novas propriedades existam
          setConfiguracoes({ ...configuracoesDefault, ...configParsed });
        } else {
          setConfiguracoes(configuracoesDefault);
        }
      } catch (error) {
        console.error('Erro ao carregar configurações:', error);
        setConfiguracoes(configuracoesDefault);
      }
      
      setIsLoading(false);
    };

    carregarConfiguracoes();
  }, []);

  const salvarConfiguracoes = async (novasConfiguracoes: Partial<Configuracoes>) => {
    try {
      const configAtualizadas = { ...configuracoes, ...novasConfiguracoes };
      
      // Salva no localStorage (em uma implementação real, salvaria no Google Sheets)
      localStorage.setItem('gestorAniversarios_configuracoes', JSON.stringify(configAtualizadas));
      
      setConfiguracoes(configAtualizadas);
      
      console.log('Configurações salvas:', configAtualizadas);
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      throw error;
    }
  };

  const adicionarUsuario = async (usuario: Omit<Usuario, 'id'>) => {
    if (!configuracoes) return;
    
    const novoUsuario: Usuario = {
      ...usuario,
      id: Date.now().toString()
    };

    const novosUsuarios = [...configuracoes.usuarios, novoUsuario];
    await salvarConfiguracoes({ usuarios: novosUsuarios });
  };

  const editarUsuario = async (id: string, dadosAtualizados: Partial<Usuario>) => {
    if (!configuracoes) return;
    
    const novosUsuarios = configuracoes.usuarios.map(user => 
      user.id === id ? { ...user, ...dadosAtualizados } : user
    );
    
    await salvarConfiguracoes({ usuarios: novosUsuarios });
  };

  const removerUsuario = async (id: string) => {
    if (!configuracoes) return;
    
    const novosUsuarios = configuracoes.usuarios.filter(user => user.id !== id);
    await salvarConfiguracoes({ usuarios: novosUsuarios });
  };

  return {
    configuracoes,
    isLoading,
    salvarConfiguracoes,
    adicionarUsuario,
    editarUsuario,
    removerUsuario
  };
};
