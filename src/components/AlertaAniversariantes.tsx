
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Bell, Users, MessageCircle, X } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Aniversariante {
  nome: string;
  dataNascimento: string;
  telefone: string;
}

interface AlertaAniversariantesProps {
  aniversariantes: Aniversariante[];
  onEnviarParaTodos: () => void;
  onDismiss: () => void;
  isVisible: boolean;
}

const AlertaAniversariantes: React.FC<AlertaAniversariantesProps> = ({
  aniversariantes,
  onEnviarParaTodos,
  onDismiss,
  isVisible
}) => {
  if (!isVisible || aniversariantes.length === 0) {
    return null;
  }

  const hoje = format(new Date(), "dd 'de' MMMM", { locale: ptBR });

  return (
    <Alert className="mb-6 border-orange-200 bg-orange-50 relative animate-pulse">
      <Bell className="h-5 w-5 text-orange-600" />
      <Button
        variant="ghost"
        size="sm"
        onClick={onDismiss}
        className="absolute top-2 right-2 h-6 w-6 p-0 text-orange-600 hover:text-orange-800"
      >
        <X className="h-4 w-4" />
      </Button>
      
      <AlertTitle className="text-orange-800 font-bold flex items-center gap-2">
        <Users className="h-4 w-4" />
        Aniversariantes Aguardando Felicitações!
      </AlertTitle>
      
      <AlertDescription className="text-orange-700 mt-2">
        <p className="mb-3">
          <strong>{aniversariantes.length}</strong> pessoa{aniversariantes.length > 1 ? 's fazem' : ' faz'} aniversário hoje ({hoje}).
        </p>
        
        <div className="mb-4">
          <p className="font-medium mb-2">Aniversariantes:</p>
          <ul className="list-disc list-inside space-y-1">
            {aniversariantes.slice(0, 3).map((aniversariante, index) => (
              <li key={index} className="text-sm">
                {aniversariante.nome}
              </li>
            ))}
            {aniversariantes.length > 3 && (
              <li className="text-sm font-medium">
                ... e mais {aniversariantes.length - 3} pessoa{aniversariantes.length - 3 > 1 ? 's' : ''}
              </li>
            )}
          </ul>
        </div>
        
        <Button 
          onClick={onEnviarParaTodos}
          className="bg-orange-600 hover:bg-orange-700 text-white"
          size="sm"
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Enviar Felicitações para Todos
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default AlertaAniversariantes;
