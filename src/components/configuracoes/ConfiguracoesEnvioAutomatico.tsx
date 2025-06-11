
import React from 'react';
import { Clock, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

interface ConfiguracoesEnvioAutomaticoProps {
  horarioEnvio: string;
  setHorarioEnvio: (horario: string) => void;
  envioAutomaticoAtivo: boolean;
  setEnvioAutomaticoAtivo: (ativo: boolean) => void;
}

const ConfiguracoesEnvioAutomatico = ({
  horarioEnvio,
  setHorarioEnvio,
  envioAutomaticoAtivo,
  setEnvioAutomaticoAtivo
}: ConfiguracoesEnvioAutomaticoProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Send className="h-5 w-5 text-green-500" />
          <span>Envio Automático</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-2 rounded-full">
              <Clock className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <Label htmlFor="envio-automatico" className="font-medium">
                Ativar Envio Automático
              </Label>
              <p className="text-sm text-gray-500">
                Enviar mensagens automaticamente no horário definido
              </p>
            </div>
          </div>
          <Switch
            id="envio-automatico"
            checked={envioAutomaticoAtivo}
            onCheckedChange={setEnvioAutomaticoAtivo}
          />
        </div>

        {envioAutomaticoAtivo && (
          <div>
            <Label htmlFor="horario-envio">
              Horário para Envio Automático
            </Label>
            <Input
              id="horario-envio"
              type="time"
              value={horarioEnvio}
              onChange={(e) => setHorarioEnvio(e.target.value)}
              className="mt-1 w-48"
            />
            <p className="text-xs text-gray-500 mt-1">
              As mensagens serão enviadas automaticamente todos os dias neste horário
            </p>
          </div>
        )}

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Como funciona:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• O sistema verifica automaticamente a cada minuto</li>
            <li>• No horário definido, envia mensagens para aniversariantes do dia</li>
            <li>• Cada pessoa recebe apenas uma mensagem por dia</li>
            <li>• As mensagens são enviadas via WhatsApp</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConfiguracoesEnvioAutomatico;
