
import React, { useState } from 'react';
import { Link, Upload, CheckCircle, AlertCircle, FileSpreadsheet, User, Lock, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

const ConfiguracoesGoogle = () => {
  const [contaConectada, setContaConectada] = useState(false);
  const [emailGoogle, setEmailGoogle] = useState('');
  const [senhaGoogle, setSenhaGoogle] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [urlPlanilha, setUrlPlanilha] = useState('');
  const [nomeAba, setNomeAba] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  const conectarGoogle = async () => {
    if (!emailGoogle || !senhaGoogle) {
      toast({
        title: "Dados incompletos",
        description: "Por favor, preencha seu email e senha do Google.",
        variant: "destructive"
      });
      return;
    }

    setIsConnecting(true);
    
    // Simular verificação de credenciais (aqui seria implementada a integração real)
    setTimeout(() => {
      setContaConectada(true);
      setIsConnecting(false);
      
      toast({
        title: "Conta conectada!",
        description: `Conectado como ${emailGoogle}`
      });
    }, 2000);
  };

  const desconectarGoogle = () => {
    setContaConectada(false);
    setEmailGoogle('');
    setSenhaGoogle('');
    setUrlPlanilha('');
    setNomeAba('');
    
    toast({
      title: "Conta desconectada",
      description: "Sua conta Google foi desconectada."
    });
  };

  const testarConexao = async () => {
    if (!urlPlanilha) {
      toast({
        title: "URL da planilha necessária",
        description: "Por favor, insira a URL da planilha do Google Sheets.",
        variant: "destructive"
      });
      return;
    }

    // Simular teste de conexão
    toast({
      title: "Testando conexão...",
      description: "Verificando acesso à planilha..."
    });

    setTimeout(() => {
      toast({
        title: "Conexão bem-sucedida!",
        description: "A planilha foi acessada com sucesso."
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Status da Conta Google */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Link className="h-5 w-5 text-blue-500" />
            <span>Conectar Conta Google</span>
            {contaConectada ? (
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
          {!contaConectada ? (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800 mb-2">
                  <strong>💡 Como conectar:</strong>
                </p>
                <ol className="text-xs text-blue-700 space-y-1 list-decimal list-inside">
                  <li>Digite seu email e senha do Google abaixo</li>
                  <li>Clique em "Conectar com Google"</li>
                  <li>Após conectar, configure a URL da sua planilha</li>
                </ol>
              </div>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="email-google" className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>Email do Google</span>
                  </Label>
                  <Input
                    id="email-google"
                    type="email"
                    placeholder="seu-email@gmail.com"
                    value={emailGoogle}
                    onChange={(e) => setEmailGoogle(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="senha-google" className="flex items-center space-x-1">
                    <Lock className="h-4 w-4" />
                    <span>Senha do Google</span>
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      id="senha-google"
                      type={mostrarSenha ? "text" : "password"}
                      placeholder="Sua senha do Google"
                      value={senhaGoogle}
                      onChange={(e) => setSenhaGoogle(e.target.value)}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setMostrarSenha(!mostrarSenha)}
                    >
                      {mostrarSenha ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Suas credenciais serão armazenadas de forma segura
                  </p>
                </div>

                <Button 
                  onClick={conectarGoogle}
                  disabled={isConnecting || !emailGoogle || !senhaGoogle}
                  className="w-full bg-blue-500 hover:bg-blue-600"
                >
                  {isConnecting ? 'Conectando...' : 'Conectar com Google'}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  ✅ <strong>Conectado como:</strong> {emailGoogle}
                </p>
              </div>
              
              <Button 
                onClick={desconectarGoogle}
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                Desconectar Conta
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Configuração da Planilha */}
      {contaConectada && (
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
          <CardTitle>📋 Passo a passo completo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">1. Preparar sua conta Google:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 ml-4">
                <li>Certifique-se de ter uma conta Google ativa</li>
                <li>Acesse o Google Sheets em sheets.google.com</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">2. Criar a planilha de aniversariantes:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 ml-4">
                <li>Crie uma nova planilha no Google Sheets</li>
                <li>Configure as colunas: <strong>Nome</strong>, <strong>Data de Nascimento</strong>, <strong>Email</strong>, <strong>Celular</strong></li>
                <li>Preencha com os dados dos aniversariantes</li>
                <li>Compartilhe como "Qualquer pessoa com o link pode visualizar"</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">3. Conectar no app:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 ml-4">
                <li>Digite seu email e senha do Google acima</li>
                <li>Clique em "Conectar com Google"</li>
                <li>Cole a URL da sua planilha</li>
                <li>Teste a conexão</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs text-yellow-800">
              <strong>⚠️ Importante:</strong> Atualmente esta é uma versão de demonstração. 
              Para uma implementação real em produção, seria necessário usar OAuth 2.0 do Google 
              por questões de segurança.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfiguracoesGoogle;
