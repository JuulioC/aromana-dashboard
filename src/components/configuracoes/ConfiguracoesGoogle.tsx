
import React, { useState } from 'react';
import { Link, Upload, CheckCircle, AlertCircle, FileSpreadsheet } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

const ConfiguracoesGoogle = () => {
  const [contaConectada, setContaConectada] = useState(false);
  const [emailConta, setEmailConta] = useState('');
  const [urlPlanilha, setUrlPlanilha] = useState('');
  const [nomeAba, setNomeAba] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  const conectarGoogle = async () => {
    setIsConnecting(true);
    
    // Simular conexão com Google (aqui seria implementada a integração real)
    setTimeout(() => {
      setContaConectada(true);
      setEmailConta('usuario@gmail.com');
      setIsConnecting(false);
      
      toast({
        title: "Conta conectada!",
        description: "Sua conta Google foi conectada com sucesso."
      });
    }, 2000);
  };

  const desconectarGoogle = () => {
    setContaConectada(false);
    setEmailConta('');
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
            <span>Conta Google</span>
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
            <div>
              <p className="text-sm text-gray-600 mb-4">
                Conecte sua conta Google para acessar as planilhas do Google Sheets.
              </p>
              <Button 
                onClick={conectarGoogle}
                disabled={isConnecting}
                className="bg-blue-500 hover:bg-blue-600"
              >
                {isConnecting ? 'Conectando...' : 'Conectar com Google'}
              </Button>
            </div>
          ) : (
            <div>
              <p className="text-sm text-gray-600 mb-2">
                Conta conectada: <strong>{emailConta}</strong>
              </p>
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

      {/* Instruções */}
      <Card>
        <CardHeader>
          <CardTitle>Como configurar</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
            <li>Conecte sua conta Google clicando no botão acima</li>
            <li>Crie ou abra uma planilha no Google Sheets</li>
            <li>Configure as colunas: Nome, Data de Nascimento, Email, Celular</li>
            <li>Compartilhe a planilha como "Qualquer pessoa com o link pode visualizar"</li>
            <li>Cole a URL da planilha no campo acima</li>
            <li>Teste a conexão para verificar se está funcionando</li>
          </ol>
          
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-800">
              <strong>Dica:</strong> Certifique-se de que sua planilha tenha as colunas necessárias 
              para que o sistema possa importar os dados dos aniversariantes corretamente.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfiguracoesGoogle;
