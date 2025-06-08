import React, { useState, useMemo } from 'react';
import { format, isToday, isSameDay, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar, Settings, MessageCircle, Users, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAniversariantes } from '@/hooks/useAniversariantes';
import { useConfiguracoes } from '@/hooks/useConfiguracoes';
import { useAlertaAniversariantes } from '@/hooks/useAlertaAniversariantes';
import AniversarianteCard from '@/components/AniversarianteCard';
import CalendarioWidget from '@/components/CalendarioWidget';
import AlertaAniversariantes from '@/components/AlertaAniversariantes';
import { toast } from '@/hooks/use-toast';

const Dashboard = () => {
  const [dataSelecionada, setDataSelecionada] = useState<Date>(new Date());
  const { aniversariantes, isLoading } = useAniversariantes();
  const { configuracoes } = useConfiguracoes();
  const { alertaDismissed, dismissAlert } = useAlertaAniversariantes();

  const aniversariantesFiltrados = useMemo(() => {
    if (!aniversariantes) return [];
    
    return aniversariantes.filter(aniversariante => {
      try {
        const dataAniversario = parseISO(aniversariante.dataNascimento);
        return isSameDay(dataSelecionada, dataAniversario) || 
               (dataSelecionada.getDate() === dataAniversario.getDate() && 
                dataSelecionada.getMonth() === dataAniversario.getMonth());
      } catch (error) {
        console.log('Erro ao processar data:', error);
        return false;
      }
    });
  }, [aniversariantes, dataSelecionada]);

  const aniversariantesHoje = useMemo(() => {
    if (!aniversariantes) return [];
    
    return aniversariantes.filter(aniversariante => {
      try {
        const dataAniversario = parseISO(aniversariante.dataNascimento);
        const hoje = new Date();
        return hoje.getDate() === dataAniversario.getDate() && 
               hoje.getMonth() === dataAniversario.getMonth();
      } catch (error) {
        return false;
      }
    });
  }, [aniversariantes]);

  const enviarMensagemParaTodos = async () => {
    if (aniversariantesHoje.length === 0) {
      toast({
        title: "Nenhum aniversariante",
        description: "Não há aniversariantes para hoje.",
        variant: "destructive"
      });
      return;
    }

    for (const aniversariante of aniversariantesHoje) {
      const mensagemPersonalizada = configuracoes?.mensagemPadrao?.replace('[NOME]', aniversariante.nome) || 
        `Parabéns ${aniversariante.nome}! Desejamos um feliz aniversário! 🎉`;
      
      const mensagemCodificada = encodeURIComponent(mensagemPersonalizada);
      const urlWhatsApp = `https://wa.me/${aniversariante.telefone}?text=${mensagemCodificada}`;
      
      window.open(urlWhatsApp, '_blank');
      
      // Pequeno delay entre as aberturas
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    toast({
      title: "Mensagens enviadas!",
      description: `${aniversariantesHoje.length} mensagem(ns) de aniversário enviada(s).`
    });
  };

  const isDataHoje = isToday(dataSelecionada);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-green-500 p-2 rounded-lg">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Gestor de Aniversários</h1>
            </div>
            
            <Link to="/configuracoes">
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Configurações</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alerta de Aniversariantes */}
        <AlertaAniversariantes
          aniversariantes={aniversariantesHoje}
          onEnviarParaTodos={enviarMensagemParaTodos}
          onDismiss={dismissAlert}
          isVisible={!alertaDismissed && aniversariantesHoje.length > 0}
        />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Aniversariantes Hoje</p>
                  <p className="text-3xl font-bold">{aniversariantesHoje.length}</p>
                </div>
                <Users className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Total de Contatos</p>
                  <p className="text-3xl font-bold">{aniversariantes?.length || 0}</p>
                </div>
                <Phone className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Data Selecionada</p>
                  <p className="text-lg font-bold">
                    {format(dataSelecionada, "dd 'de' MMMM", { locale: ptBR })}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de Aniversariantes */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  <span>
                    {isDataHoje ? 'Aniversariantes de Hoje' : `Aniversariantes - ${format(dataSelecionada, "dd/MM", { locale: ptBR })}`}
                  </span>
                </CardTitle>
                
                {aniversariantesHoje.length > 0 && isDataHoje && (
                  <Button 
                    onClick={enviarMensagemParaTodos}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Enviar para Todos ({aniversariantesHoje.length})
                  </Button>
                )}
              </CardHeader>
              
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="text-gray-500 mt-2">Carregando aniversariantes...</p>
                  </div>
                ) : aniversariantesFiltrados.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">
                      {isDataHoje ? 'Nenhum aniversariante hoje.' : 'Nenhum aniversariante nesta data.'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {aniversariantesFiltrados.map((aniversariante, index) => (
                      <AniversarianteCard 
                        key={index} 
                        aniversariante={aniversariante}
                        mensagemPadrao={configuracoes?.mensagemPadrao}
                        isAniversarioHoje={isDataHoje}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Calendário */}
          <div className="lg:col-span-1">
            <CalendarioWidget 
              dataSelecionada={dataSelecionada}
              onDataSelecionada={setDataSelecionada}
              aniversariantes={aniversariantes || []}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
