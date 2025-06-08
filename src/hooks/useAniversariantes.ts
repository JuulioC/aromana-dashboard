
import { useState, useEffect } from 'react';

export interface Aniversariante {
  nome: string;
  dataNascimento: string;
  telefone: string;
}

// Dados simulados para demonstração
const dadosSimulados: Aniversariante[] = [
  {
    nome: "João Silva",
    dataNascimento: "1990-06-08", // Hoje para demonstração
    telefone: "5511999887766"
  },
  {
    nome: "Maria Santos",
    dataNascimento: "1985-06-08", // Hoje para demonstração
    telefone: "5511888776655"
  },
  {
    nome: "Pedro Oliveira",
    dataNascimento: "1992-12-25",
    telefone: "5511777665544"
  },
  {
    nome: "Ana Costa",
    dataNascimento: "1988-03-15",
    telefone: "5511666554433"
  },
  {
    nome: "Carlos Mendes",
    dataNascimento: "1995-07-20",
    telefone: "5511555443322"
  },
  {
    nome: "Lucia Ferreira",
    dataNascimento: "1987-09-10",
    telefone: "5511444332211"
  }
];

export const useAniversariantes = () => {
  const [aniversariantes, setAniversariantes] = useState<Aniversariante[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula carregamento de dados
    const carregarDados = async () => {
      setIsLoading(true);
      
      // Simula delay de rede
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Em uma implementação real, aqui você faria a conexão com Google Sheets
      // Por enquanto, usamos dados simulados
      setAniversariantes(dadosSimulados);
      setIsLoading(false);
    };

    carregarDados();
  }, []);

  const adicionarAniversariante = (novoAniversariante: Aniversariante) => {
    setAniversariantes(prev => [...prev, novoAniversariante]);
  };

  const removerAniversariante = (telefone: string) => {
    setAniversariantes(prev => prev.filter(a => a.telefone !== telefone));
  };

  return {
    aniversariantes,
    isLoading,
    adicionarAniversariante,
    removerAniversariante
  };
};
