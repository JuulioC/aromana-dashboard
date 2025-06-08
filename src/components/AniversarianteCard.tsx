
import React from 'react';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface Aniversariante {
  nome: string;
  dataNascimento: string;
  telefone: string;
}

interface AniversarianteCardProps {
  aniversariante: Aniversariante;
  mensagemPadrao?: string;
  isAniversarioHoje: boolean;
}

const AniversarianteCard: React.FC<AniversarianteCardProps> = ({ 
  aniversariante, 
  mensagemPadrao,
  isAniversarioHoje 
}) => {
  const enviarWhatsApp = () => {
    const mensagemPersonalizada = mensagemPadrao?.replace('[NOME]', aniversariante.nome) || 
      `Parabéns ${aniversariante.nome}! Desejamos um feliz aniversário! 🎉`;
    
    const mensagemCodificada = encodeURIComponent(mensagemPersonalizada);
    const urlWhatsApp = `https://wa.me/${aniversariante.telefone}?text=${mensagemCodificada}`;
    
    window.open(urlWhatsApp, '_blank');
    
    toast({
      title: "WhatsApp aberto!",
      description: `Mensagem preparada para ${aniversariante.nome}.`
    });
  };

  const calcularIdade = () => {
    try {
      const dataNasc = parseISO(aniversariante.dataNascimento);
      const hoje = new Date();
      let idade = hoje.getFullYear() - dataNasc.getFullYear();
      const mesAniversario = dataNasc.getMonth();
      const diaAniversario = dataNasc.getDate();
      
      if (hoje.getMonth() < mesAniversario || 
          (hoje.getMonth() === mesAniversario && hoje.getDate() < diaAniversario)) {
        idade--;
      }
      
      return idade;
    } catch (error) {
      return null;
    }
  };

  const formatarTelefone = (telefone: string) => {
    // Remove todos os caracteres não numéricos
    const somenteNumeros = telefone.replace(/\D/g, '');
    
    // Formata o telefone brasileiro
    if (somenteNumeros.length === 13) {
      return `+${somenteNumeros.substring(0, 2)} (${somenteNumeros.substring(2, 4)}) ${somenteNumeros.substring(4, 9)}-${somenteNumeros.substring(9)}`;
    }
    
    return telefone;
  };

  const idade = calcularIdade();

  return (
    <div className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
      isAniversarioHoje 
        ? 'bg-gradient-to-r from-green-50 to-blue-50 border-green-200' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
              isAniversarioHoje 
                ? 'bg-gradient-to-r from-green-400 to-blue-500' 
                : 'bg-gradient-to-r from-gray-400 to-gray-500'
            }`}>
              {aniversariante.nome.charAt(0).toUpperCase()}
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">
                {aniversariante.nome}
              </h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Phone className="h-3 w-3" />
                  <span>{formatarTelefone(aniversariante.telefone)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>
                    {format(parseISO(aniversariante.dataNascimento), "dd/MM/yyyy", { locale: ptBR })}
                    {idade && ` (${idade} anos)`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Button
          onClick={enviarWhatsApp}
          disabled={!isAniversarioHoje}
          className={`flex items-center space-x-2 transition-all duration-200 ${
            isAniversarioHoje
              ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <MessageCircle className="h-4 w-4" />
          <span>WhatsApp</span>
        </Button>
      </div>
      
      {isAniversarioHoje && (
        <div className="mt-3 pt-3 border-t border-green-200">
          <p className="text-sm text-green-700 font-medium flex items-center">
            🎉 Aniversário hoje! Não esqueça de enviar os parabéns!
          </p>
        </div>
      )}
    </div>
  );
};

export default AniversarianteCard;
