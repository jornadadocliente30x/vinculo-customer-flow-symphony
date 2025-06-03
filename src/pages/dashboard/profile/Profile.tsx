
import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuthStore } from '@/stores/authStore';
import { useToast } from '@/hooks/use-toast';
import { User, Lock, Save } from 'lucide-react';

export default function Profile() {
  const { userProfile, updateUser } = useAuthStore();
  const { toast } = useToast();
  
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  const [profile, setProfile] = useState({
    name: userProfile?.name || '',
    email: userProfile?.email || '',
    phone: userProfile?.phone || '',
    avatar: userProfile?.avatar || ''
  });
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSaveProfile = () => {
    updateUser(profile);
    setIsEditing(false);
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram salvas com sucesso.",
    });
  };

  const handleChangePassword = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive"
      });
      return;
    }
    
    if (passwordForm.newPassword.length < 6) {
      toast({
        title: "Erro",
        description: "A nova senha deve ter pelo menos 6 caracteres.",
        variant: "destructive"
      });
      return;
    }

    // Simular mudança de senha
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setIsChangingPassword(false);
    toast({
      title: "Senha alterada",
      description: "Sua senha foi alterada com sucesso.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="bg-gradient-to-r from-white to-gray-50 rounded-xl p-6 border border-gray-100 shadow-soft">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Meu Perfil
          </h1>
          <p className="text-gray-600">Gerencie suas informações pessoais e configurações de conta</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card de Informações Pessoais */}
          <Card className="shadow-soft border-gray-100">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
              <CardTitle className="flex items-center text-xl text-gray-800">
                <User className="w-5 h-5 mr-2" />
                Informações Pessoais
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Avatar */}
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={profile.avatar} alt={profile.name} />
                  <AvatarFallback className="text-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    {profile.name.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Campos do formulário */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Nome Completo
                  </Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    E-mail
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Telefone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                    disabled={!isEditing}
                    className="mt-1"
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>

              {/* Botões de ação */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                {isEditing ? (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false);
                        setProfile({
                          name: userProfile?.name || '',
                          email: userProfile?.email || '',
                          phone: userProfile?.phone || '',
                          avatar: userProfile?.avatar || ''
                        });
                      }}
                    >
                      Cancelar
                    </Button>
                    <Button
                      onClick={handleSaveProfile}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Salvar
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                  >
                    Editar Perfil
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Card de Segurança */}
          <Card className="shadow-soft border-gray-100">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-t-lg">
              <CardTitle className="flex items-center text-xl text-gray-800">
                <Lock className="w-5 h-5 mr-2" />
                Segurança
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {!isChangingPassword ? (
                <div className="text-center py-8">
                  <Lock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Alterar Senha</h3>
                  <p className="text-gray-600 mb-4">
                    Mantenha sua conta segura alterando sua senha regularmente.
                  </p>
                  <Button
                    onClick={() => setIsChangingPassword(true)}
                    variant="outline"
                    className="border-purple-200 text-purple-600 hover:bg-purple-50"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Alterar Senha
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword" className="text-sm font-medium text-gray-700">
                      Senha Atual
                    </Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="newPassword" className="text-sm font-medium text-gray-700">
                      Nova Senha
                    </Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                      Confirmar Nova Senha
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="mt-1"
                    />
                  </div>

                  <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsChangingPassword(false);
                        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                      }}
                    >
                      Cancelar
                    </Button>
                    <Button
                      onClick={handleChangePassword}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                    >
                      Alterar Senha
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
