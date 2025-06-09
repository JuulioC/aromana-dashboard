
import React from 'react';
import { Bell, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface ConfiguracoesAlertasProps {
  alertaEmail: boolean;
  setAlertaEmail: (alerta: boolean) => void;
  alertaSms: boolean;
  setAlertaSms: (alerta: boolean) => void;
  alertaWhatsApp: boolean;
  setAlertaWhatsApp: (alerta: boolean) => void;
  emailUsuario: string;
  celularUsuario: string;
  temWhatsApp: boolean;
}

const ConfiguracoesAlertas = ({
  alertaEmail,
  setAlertaEmail,
  alertaSms,
  setAlertaSms,
  alertaWhatsApp,
  setAlertaWhatsApp,
  emailUsuario,
  celularUsuario,
  temWhatsApp
}: ConfiguracoesAlertasProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bell className="h-5 w-5 text-orange-500" />
          <span>Configurações de Alerta</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-base font-medium">
            Como você deseja receber alertas sobre aniversariantes?
          </Label>
          <p className="text-sm text-gray-500 mb-4">
            Selecione as formas de notificação que você prefere receber
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <MessageSquare className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <Label htmlFor="alerta-email" className="font-medium">Email</Label>
                  <p className="text-sm text-gray-500">Receber notificações por email</p>
                </div>
              </div>
              <Switch
                id="alerta-email"
                checked={alertaEmail}
                onCheckedChange={setAlertaEmail}
                disabled={!emailUsuario}
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <MessageSquare className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <Label htmlFor="alerta-sms" className="font-medium">SMS</Label>
                  <p className="text-sm text-gray-500">Receber notificações por SMS</p>
                </div>
              </div>
              <Switch
                id="alerta-sms"
                checked={alertaSms}
                onCheckedChange={setAlertaSms}
                disabled={!celularUsuario}
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 p-2 rounded-full">
                  <MessageSquare className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <Label htmlFor="alerta-whatsapp" className="font-medium">WhatsApp</Label>
                  <p className="text-sm text-gray-500">Receber notificações via WhatsApp</p>
                </div>
              </div>
              <Switch
                id="alerta-whatsapp"
                checked={alertaWhatsApp}
                onCheckedChange={setAlertaWhatsApp}
                disabled={!celularUsuario || !temWhatsApp}
              />
            </div>
          </div>

          {(!emailUsuario || !celularUsuario) && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                💡 Configure seus dados de contato acima para habilitar as opções de notificação
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ConfiguracoesAlertas;
