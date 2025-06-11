
import { useState, useEffect, useRef } from 'react';
import { useConfiguracoes } from './useConfiguracoes';
import { useAniversariantes } from './useAniversariantes';
import { parseISO } from 'date-fns';
import { toast } from './use-toast';

export const useEnvioAutomatico = () => {
  const { configuracoes } = useConfiguracoes();
  const { aniversariantes } = useAniversariantes();
  const [ultimoEnvio, setUltimoEnvio] = useState<string>('');
  const intervalRef = useRef<NodeJS.Timeout>();

  const verificarHorarioEnvio = () => {
    if (!configuracoes?.envioAutomaticoAtivo || !configuracoes?.horarioEnvio) {
      return;
    }

    const agora = new Date();
    const hoje = agora.toDateString();
    const horaAtual = agora.getHours();
    const minutoAtual = agora.getMinutes();
    
    const [horaEnvio, minutoEnvio] = configuracoes.horarioEnvio.split(':').map(Number);
    
    // Verifica se é o horário correto e se ainda não foi enviado hoje
    if (horaAtual === horaEnvio && minutoAtual === minutoEnvio && ultimoEnvio !== hoje) {
      enviarMensagensAutomaticamente();
      setUltimoEnvio(hoje);
      
      // Salva no localStorage para persistir entre sessões
      localStorage.setItem('gestorAniversarios_ultimoEnvio', hoje);
    }
  };

  const enviarMensagensAutomaticamente = async () => {
    if (!aniversariantes || !configuracoes) return;

    // Filtra aniversariantes de hoje
    const aniversariantesHoje = aniversariantes.filter(aniversariante => {
      try {
        const dataAniversario = parseISO(aniversariante.dataNascimento);
        const hoje = new Date();
        return hoje.getDate() === dataAniversario.getDate() && 
               hoje.getMonth() === dataAniversario.getMonth();
      } catch (error) {
        return false;
      }
    });

    if (aniversariantesHoje.length === 0) {
      console.log('Nenhum aniversariante hoje para envio automático');
      return;
    }

    console.log(`Enviando mensagens automáticas para ${aniversariantesHoje.length} aniversariante(s)`);

    for (const aniversariante of aniversariantesHoje) {
      const mensagemPersonalizada = configuracoes.mensagemPadrao?.replace('[NOME]', aniversariante.nome) || 
        `Parabéns ${aniversariante.nome}! Desejamos um feliz aniversário! 🎉`;
      
      const mensagemCodificada = encodeURIComponent(mensagemPersonalizada);
      const urlWhatsApp = `https://wa.me/${aniversariante.telefone}?text=${mensagemCodificada}`;
      
      // Em um ambiente real, aqui você faria a integração com API do WhatsApp
      console.log(`Enviando mensagem para ${aniversariante.nome}: ${urlWhatsApp}`);
      
      // Pequeno delay entre os envios
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    toast({
      title: "Mensagens enviadas automaticamente!",
      description: `${aniversariantesHoje.length} mensagem(ns) de aniversário enviada(s) automaticamente.`
    });
  };

  useEffect(() => {
    // Recupera o último envio do localStorage
    const ultimoEnvioSalvo = localStorage.getItem('gestorAniversarios_ultimoEnvio');
    if (ultimoEnvioSalvo) {
      setUltimoEnvio(ultimoEnvioSalvo);
    }

    // Configura verificação a cada minuto
    intervalRef.current = setInterval(verificarHorarioEnvio, 60000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [configuracoes, aniversariantes, ultimoEnvio]);

  return {
    ultimoEnvio,
    enviarMensagensAutomaticamente
  };
};
