
import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useConfiguracoes } from '@/hooks/useConfiguracoes';
import { toast } from '@/hooks/use-toast';
import ConfiguracoesHeader from '@/components/configuracoes/ConfiguracoesHeader';
import ConfiguracoesUsuarios from '@/components/configuracoes/ConfiguracoesUsuarios';
import ConfiguracoesAlertas from '@/components/configuracoes/ConfiguracoesAlertas';
import ConfiguracoesMensagem from '@/components/configuracoes/ConfiguracoesMensagem';
import ConfiguracoesImagem from '@/components/configuracoes/ConfiguracoesImagem';

const Configuracoes = () => {
  const { 
    configuracoes, 
    salvarConfiguracoes, 
    isLoading,
    adicionarUsuario,
    editarUsuario,
    removerUsuario
  } = useConfiguracoes();
  
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

  const temUsuariosAtivos = configuracoes?.usuarios?.some(user => user.ativo) || false;
  const temUsuariosComEmail = configuracoes?.usuarios?.some(user => user.ativo && user.email) || false;
  const temUsuariosComCelular = configuracoes?.usuarios?.some(user => user.ativo && user.celular) || false;
  const temUsuariosComWhatsApp = configuracoes?.usuarios?.some(user => user.ativo && user.celular && user.temWhatsApp) || false;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <ConfiguracoesHeader />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <ConfiguracoesUsuarios
            usuarios={configuracoes?.usuarios || []}
            onAdicionarUsuario={adicionarUsuario}
            onEditarUsuario={editarUsuario}
            onRemoverUsuario={removerUsuario}
          />

          <ConfiguracoesAlertas
            alertaEmail={alertaEmail}
            setAlertaEmail={setAlertaEmail}
            alertaSms={alertaSms}
            setAlertaSms={setAlertaSms}
            alertaWhatsApp={alertaWhatsApp}
            setAlertaWhatsApp={setAlertaWhatsApp}
            emailUsuario={temUsuariosComEmail ? 'configurado' : ''}
            celularUsuario={temUsuariosComCelular ? 'configurado' : ''}
            temWhatsApp={temUsuariosComWhatsApp}
          />

          <ConfiguracoesMensagem
            mensagemPadrao={mensagemPadrao}
            setMensagemPadrao={setMensagemPadrao}
          />

          <ConfiguracoesImagem
            previewImagem={previewImagem}
            onImagemUpload={handleImagemUpload}
          />

          {!temUsuariosAtivos && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                💡 Adicione pelo menos um usuário ativo para habilitar as funcionalidades de envio de mensagens.
              </p>
            </div>
          )}

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
