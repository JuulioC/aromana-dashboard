
import { useState, useEffect } from 'react';

export interface Configuracoes {
  mensagemPadrao: string;
  urlImagem: string;
}

// Configurações padrão
const configuracoesDefault: Configuracoes = {
  mensagemPadrao: "Parabéns [NOME]! Desejamos um feliz aniversário! 🎉🎂 Que este novo ano de vida seja repleto de alegrias, conquistas e momentos especiais!",
  urlImagem: ""
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
          setConfiguracoes(JSON.parse(configSalvas));
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

  return {
    configuracoes,
    isLoading,
    salvarConfiguracoes
  };
};
