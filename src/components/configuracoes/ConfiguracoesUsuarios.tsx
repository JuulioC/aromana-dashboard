
import React, { useState } from 'react';
import { Users, Plus, Edit2, Trash2, UserCheck, UserX } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import type { Usuario } from '@/hooks/useConfiguracoes';

interface ConfiguracoesUsuariosProps {
  usuarios: Usuario[];
  onAdicionarUsuario: (usuario: Omit<Usuario, 'id'>) => Promise<void>;
  onEditarUsuario: (id: string, dados: Partial<Usuario>) => Promise<void>;
  onRemoverUsuario: (id: string) => Promise<void>;
}

const ConfiguracoesUsuarios = ({
  usuarios,
  onAdicionarUsuario,
  onEditarUsuario,
  onRemoverUsuario
}: ConfiguracoesUsuariosProps) => {
  const [dialogAberto, setDialogAberto] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState<Usuario | null>(null);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    celular: '',
    temWhatsApp: true,
    ativo: true
  });

  const resetForm = () => {
    setFormData({
      nome: '',
      email: '',
      celular: '',
      temWhatsApp: true,
      ativo: true
    });
    setUsuarioEditando(null);
  };

  const abrirDialogAdicionar = () => {
    resetForm();
    setDialogAberto(true);
  };

  const abrirDialogEditar = (usuario: Usuario) => {
    setFormData({
      nome: usuario.nome,
      email: usuario.email,
      celular: usuario.celular,
      temWhatsApp: usuario.temWhatsApp,
      ativo: usuario.ativo
    });
    setUsuarioEditando(usuario);
    setDialogAberto(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.email || !formData.celular) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }

    try {
      if (usuarioEditando) {
        await onEditarUsuario(usuarioEditando.id, formData);
        toast({
          title: "Usuário atualizado!",
          description: "Os dados do usuário foram atualizados com sucesso."
        });
      } else {
        await onAdicionarUsuario(formData);
        toast({
          title: "Usuário adicionado!",
          description: "Novo usuário foi cadastrado com sucesso."
        });
      }
      
      setDialogAberto(false);
      resetForm();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar o usuário.",
        variant: "destructive"
      });
    }
  };

  const handleRemover = async (id: string, nome: string) => {
    if (confirm(`Tem certeza que deseja remover o usuário ${nome}?`)) {
      try {
        await onRemoverUsuario(id);
        toast({
          title: "Usuário removido!",
          description: "O usuário foi removido com sucesso."
        });
      } catch (error) {
        toast({
          title: "Erro",
          description: "Ocorreu um erro ao remover o usuário.",
          variant: "destructive"
        });
      }
    }
  };

  const toggleAtivo = async (usuario: Usuario) => {
    await onEditarUsuario(usuario.id, { ativo: !usuario.ativo });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-blue-500" />
            <span>Usuários do Sistema</span>
          </div>
          <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
            <DialogTrigger asChild>
              <Button onClick={abrirDialogAdicionar} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Usuário
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {usuarioEditando ? 'Editar Usuário' : 'Adicionar Novo Usuário'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="nome">Nome completo</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                    placeholder="Digite o nome completo"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="email@exemplo.com"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="celular">Celular</Label>
                  <Input
                    id="celular"
                    type="tel"
                    value={formData.celular}
                    onChange={(e) => setFormData(prev => ({ ...prev, celular: e.target.value }))}
                    placeholder="(11) 99999-9999"
                    required
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="tem-whatsapp"
                    checked={formData.temWhatsApp}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, temWhatsApp: checked === true }))}
                  />
                  <Label htmlFor="tem-whatsapp">Este número tem WhatsApp</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="ativo"
                    checked={formData.ativo}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, ativo: checked === true }))}
                  />
                  <Label htmlFor="ativo">Usuário ativo</Label>
                </div>
                
                <div className="flex space-x-2">
                  <Button type="submit" className="flex-1">
                    {usuarioEditando ? 'Atualizar' : 'Adicionar'}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setDialogAberto(false)}>
                    Cancelar
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {usuarios.length === 0 ? (
          <div className="text-center py-8">
            <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Nenhum usuário cadastrado ainda.</p>
            <p className="text-sm text-gray-400 mt-2">
              Adicione usuários que poderão enviar mensagens de aniversário.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {usuarios.map((usuario) => (
              <div 
                key={usuario.id} 
                className={`p-4 border rounded-lg ${usuario.ativo ? 'bg-white' : 'bg-gray-50'}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className={`font-medium ${usuario.ativo ? 'text-gray-900' : 'text-gray-500'}`}>
                        {usuario.nome}
                      </h4>
                      {usuario.ativo ? (
                        <UserCheck className="h-4 w-4 text-green-500" />
                      ) : (
                        <UserX className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{usuario.email}</p>
                    <p className="text-sm text-gray-600">
                      {usuario.celular} {usuario.temWhatsApp && '📱'}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={usuario.ativo}
                      onCheckedChange={() => toggleAtivo(usuario)}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => abrirDialogEditar(usuario)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemover(usuario.id, usuario.nome)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ConfiguracoesUsuarios;
