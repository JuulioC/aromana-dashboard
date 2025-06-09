
import React from 'react';
import { MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface ConfiguracoesMensagemProps {
  mensagemPadrao: string;
  setMensagemPadrao: (mensagem: string) => void;
}

const ConfiguracoesMensagem = ({
  mensagemPadrao,
  setMensagemPadrao
}: ConfiguracoesMensagemProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MessageSquare className="h-5 w-5 text-blue-500" />
          <span>Mensagem Padrão</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="mensagem">
            Mensagem que será enviada via WhatsApp
          </Label>
          <p className="text-sm text-gray-500 mb-2">
            Use [NOME] para personalizar com o nome do aniversariante
          </p>
          <Textarea
            id="mensagem"
            placeholder="Digite sua mensagem personalizada..."
            value={mensagemPadrao}
            onChange={(e) => setMensagemPadrao(e.target.value)}
            rows={4}
            className="resize-none"
          />
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Preview da mensagem:</h4>
          <p className="text-blue-800 italic">
            {mensagemPadrao.replace('[NOME]', 'João Silva')}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConfiguracoesMensagem;
