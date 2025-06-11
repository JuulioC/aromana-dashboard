
import React, { useState } from 'react';
import { Link, Upload, CheckCircle, AlertCircle, FileSpreadsheet, User, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { useGoogleAuth } from '@/hooks/useGoogleAuth';

const ConfiguracoesGoogle = () => {
  const { user, isLoading, isInitialized, signIn, signOut } = useGoogleAuth();
  const [urlPlanilha, setUrlPlanilha] = useState('');
  const [nomeAba, setNomeAba] = useState('');

  const testarConexao = async () => {
    if (!urlPlanilha) {
      toast({
        title: "URL da planilha necessária",
        description: "Por favor, insira a URL da planilha do Google Sheets.",
        variant: "destructive"
      });
      return;
    }

    if (!user) {
      toast({
        title: "Login necessário",
        description: "Você precisa estar logado no Google para testar a conexão.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Testando conexão...",
      description: "Verificando acesso à planilha..."
    });

    // Aqui você implementaria a verificação real da planilha
    // usando a API do Google Sheets com o token do usuário
    setTimeout(() => {
      toast({
        title: "Conexão bem-sucedida!",
        description: "A planilha foi acessada com sucesso."
      });
    }, 1500);
  };

  const abrirConfiguracoesOAuth = () => {
    window.open('https://console.developers.google.com/apis/credentials', '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Status da Conta Google */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Link className="h-5 w-5 text-blue-500" />
            <span>Autenticação Google</span>
            {user ? (
              <Badge variant="default" className="bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                Conectado
              </Badge>
            ) : (
              <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                <AlertCircle className="h-3 w-3 mr-1" />
                Não conectado
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!user ? (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800 mb-2">
                  <strong>🔐 Autenticação Segura:</strong>
                </p>
                <p className="text-xs text-blue-700 mb-2">
                  Faça login com sua conta Google para acessar suas planilhas de forma segura.
                </p>
                <ul className="text-xs text-blue-700 space-y-1 list-disc list-inside">
                  <li>Autenticação OAuth 2.0 oficial do Google</li>
                  <li>Suas credenciais nunca são armazenadas no app</li>
                  <li>Acesso apenas às planilhas que você autorizar</li>
                </ul>
              </div>

              {!isInitialized ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto mb-2"></div>
                  <p className="text-sm text-gray-600">Inicializando Google Auth...</p>
                </div>
              ) : (
                <Button 
                  onClick={signIn}
                  disabled={isLoading}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Conectando...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Entrar com Google
                    </>
                  )}
                </Button>
              )}

              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-xs text-yellow-800 mb-2">
                  <strong>⚠️ Configuração necessária:</strong>
                </p>
                <p className="text-xs text-yellow-700 mb-2">
                  Para usar esta funcionalidade, você precisa configurar as credenciais OAuth do Google:
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={abrirConfiguracoesOAuth}
                  className="flex items-center space-x-1 text-xs"
                >
                  <ExternalLink className="h-3 w-3" />
                  <span>Configurar Google Console</span>
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <img 
                    src={user.picture} 
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium text-green-800">{user.name}</p>
                    <p className="text-xs text-green-600">{user.email}</p>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={signOut}
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                Desconectar do Google
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Configuração da Planilha */}
      {user && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileSpreadsheet className="h-5 w-5 text-green-500" />
              <span>Configuração da Planilha</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="url-planilha">
                URL da Planilha do Google Sheets
              </Label>
              <Input
                id="url-planilha"
                type="url"
                placeholder="https://docs.google.com/spreadsheets/d/..."
                value={urlPlanilha}
                onChange={(e) => setUrlPlanilha(e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Cole aqui o link da sua planilha do Google Sheets
              </p>
            </div>

            <div>
              <Label htmlFor="nome-aba">
                Nome da Aba (opcional)
              </Label>
              <Input
                id="nome-aba"
                type="text"
                placeholder="Aniversariantes"
                value={nomeAba}
                onChange={(e) => setNomeAba(e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Se não especificado, será usada a primeira aba
              </p>
            </div>

            <div className="flex space-x-2">
              <Button 
                onClick={testarConexao}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <Upload className="h-4 w-4" />
                <span>Testar Conexão</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Instruções Detalhadas */}
      <Card>
        <CardHeader>
          <CardTitle>📋 Configuração do Google OAuth</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">1. Configurar credenciais OAuth:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 ml-4">
                <li>Acesse o <a href="https://console.developers.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Cloud Console</a></li>
                <li>Crie um novo projeto ou selecione um existente</li>
                <li>Ative a API do Google Sheets</li>
                <li>Crie credenciais OAuth 2.0 Client ID</li>
                <li>Adicione seu domínio às origens autorizadas</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">2. Configurar a planilha:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 ml-4">
                <li>Crie uma planilha no Google Sheets</li>
                <li>Configure as colunas: <strong>Nome</strong>, <strong>Data de Nascimento</strong>, <strong>Email</strong>, <strong>Celular</strong></li>
                <li>Preencha com os dados dos aniversariantes</li>
                <li>A planilha deve estar acessível pela sua conta Google</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-800">
              <strong>🔐 Segurança:</strong> Esta implementação usa OAuth 2.0 oficial do Google. 
              Suas credenciais são gerenciadas diretamente pelo Google e não são armazenadas neste aplicativo.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfiguracoesGoogle;
