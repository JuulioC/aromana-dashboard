
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, MessageSquare, Upload, Image as ImageIcon, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useConfiguracoes } from '@/hooks/useConfiguracoes';
import { toast } from '@/hooks/use-toast';

const Configuracoes = () => {
  const { configuracoes, salvarConfiguracoes, isLoading } = useConfiguracoes();
  const [mensagemPadrao, setMensagemPadrao] = useState('');
  const [urlImagem, setUrlImagem] = useState('');
  const [novaImagem, setNovaImagem] = useState<File | null>(null);
  const [previewImagem, setPreviewImagem] = useState('');
  const [alertaEmail, setAlertaEmail] = useState(true);
  const [alertaSms, setAlertaSms] = useState(false);
  const [alertaWhatsApp, setAlertaWhatsApp] = useState(true);

  useEffect(() => {
    if (configuracoes) {
      setMensagemPadrao(configuracoes.mensagemPadrao || 'Parabéns [NOME]! Desejamos um feliz aniversário! 🎉🎂');
      setUrlImagem(configuracoes.urlImagem || '');
      setPreviewImagem(configuracoes.urlImagem || '');
      setAlertaEmail(configuracoes.alertaEmail ?? true);
      setAlertaSms(configuracoes.alertaSms ?? false);
      setAlertaWhatsApp(configuracoes.alertaWhatsApp ?? true);
    }
  }, [configuracoes]);

  const handleImagemUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNovaImagem(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImagem(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const salvarConfigs = async () => {
    try {
      let novaUrlImagem = urlImagem;
      
      if (novaImagem) {
        // Simulação de upload - em uma implementação real, você faria upload para um serviço
        const reader = new FileReader();
        reader.onload = async (e) => {
          novaUrlImagem = e.target?.result as string;
          
          await salvarConfiguracoes({
            mensagemPadrao,
            urlImagem: novaUrlImagem,
            alertaEmail,
            alertaSms,
            alertaWhatsApp
          });

          toast({
            title: "Configurações salvas!",
            description: "Suas preferências foram atualizadas com sucesso."
          });
        };
        reader.readAsDataURL(novaImagem);
      } else {
        await salvarConfiguracoes({
          mensagemPadrao,
          urlImagem,
          alertaEmail,
          alertaSms,
          alertaWhatsApp
        });

        toast({
          title: "Configurações salvas!",
          description: "Suas preferências foram atualizadas com sucesso."
        });
      }
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar as configurações.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Link to="/">
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Voltar</span>
                </Button>
              </Link>
              <div className="bg-gradient-to-r from-blue-500 to-green-500 p-2 rounded-lg">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Configurações</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Configurações de Alerta */}
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
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mensagem Padrão */}
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

          {/* Imagem Padrão */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ImageIcon className="h-5 w-5 text-green-500" />
                <span>Imagem Padrão para Felicitações</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="imagem">
                  Selecionar nova imagem
                </Label>
                <div className="mt-2">
                  <div className="flex items-center space-x-4">
                    <input
                      id="imagem"
                      type="file"
                      accept="image/*"
                      onChange={handleImagemUpload}
                      className="hidden"
                    />
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('imagem')?.click()}
                      className="flex items-center space-x-2"
                    >
                      <Upload className="h-4 w-4" />
                      <span>Escolher Imagem</span>
                    </Button>
                  </div>
                </div>
              </div>

              {previewImagem && (
                <div className="mt-4">
                  <Label>Preview da imagem:</Label>
                  <div className="mt-2 max-w-xs">
                    <img 
                      src={previewImagem} 
                      alt="Preview da imagem de felicitação"
                      className="w-full h-auto rounded-lg border border-gray-200 shadow-sm"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Botão Salvar */}
          <Card>
            <CardContent className="pt-6">
              <Button 
                onClick={salvarConfigs}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? 'Salvando...' : 'Salvar Configurações'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Configuracoes;
