
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon } from 'lucide-react';
import { parseISO, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Aniversariante {
  nome: string;
  dataNascimento: string;
  telefone: string;
}

interface CalendarioWidgetProps {
  dataSelecionada: Date;
  onDataSelecionada: (date: Date) => void;
  aniversariantes: Aniversariante[];
}

const CalendarioWidget: React.FC<CalendarioWidgetProps> = ({
  dataSelecionada,
  onDataSelecionada,
  aniversariantes
}) => {
  // Função para verificar se uma data tem aniversariantes
  const temAniversariante = (date: Date) => {
    return aniversariantes.some(aniversariante => {
      try {
        const dataAniversario = parseISO(aniversariante.dataNascimento);
        return date.getDate() === dataAniversario.getDate() && 
               date.getMonth() === dataAniversario.getMonth();
      } catch (error) {
        return false;
      }
    });
  };

  // Customizar os dias do calendário
  const modifiers = {
    aniversario: (date: Date) => temAniversariante(date)
  };

  const modifiersStyles = {
    aniversario: {
      backgroundColor: '#10b981',
      color: 'white',
      fontWeight: 'bold',
      borderRadius: '50%'
    }
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CalendarIcon className="h-5 w-5 text-blue-500" />
          <span>Calendário</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={dataSelecionada}
          onSelect={(date) => date && onDataSelecionada(date)}
          locale={ptBR}
          modifiers={modifiers}
          modifiersStyles={modifiersStyles}
          className="rounded-md border"
        />
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-600">Dias com aniversariantes</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-gray-600">Data selecionada</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarioWidget;
