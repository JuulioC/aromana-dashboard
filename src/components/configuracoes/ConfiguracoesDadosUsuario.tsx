
import React from 'react';
import { User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

interface ConfiguracoesDadosUsuarioProps {
  emailUsuario: string;
  setEmailUsuario: (email: string) => void;
  celularUsuario: string;
  setCelularUsuario: (celular: string) => void;
  temWhatsApp: boolean;
  setTemWhatsApp: (temWhatsApp: boolean) => void;
}

const ConfiguracoesDadosUsuario = ({
  emailUsuario,
  setEmailUsuario,
  celularUsuario,
  setCelularUsuario,
  temWhatsApp,
  setTemWhatsApp
}: ConfiguracoesDadosUsuarioProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <User className="h-5 w-5 text-purple-500" />
          <span>Seus Dados de Contato</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-base font-medium mb-4 block">
            Configure seus dados para receber as notificações
          </Label>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="email-usuario" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email-usuario"
                type="email"
                placeholder="seu@email.com"
                value={emailUsuario}
                onChange={(e) => setEmailUsuario(e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Email onde você receberá os alertas de aniversariantes
              </p>
            </div>

            <div>
              <Label htmlFor="celular-usuario" className="text-sm font-medium">
                Número do Celular
              </Label>
              <Input
                id="celular-usuario"
                type="tel"
                placeholder="(11) 99999-9999"
                value={celularUsuario}
                onChange={(e) => setCelularUsuario(e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Número para receber SMS e WhatsApp
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="tem-whatsapp"
                checked={temWhatsApp}
                onCheckedChange={(checked) => setTemWhatsApp(checked === true)}
              />
              <Label htmlFor="tem-whatsapp" className="text-sm font-medium">
                Este número tem WhatsApp
              </Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConfiguracoesDadosUsuario;
