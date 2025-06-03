
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { ArrowRight, Users, MessageCircle, TrendingUp, Shield } from 'lucide-react';

export default function Index() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const features = [
    {
      icon: Users,
      title: 'Gestão de Leads',
      description: 'Gerencie seus leads de forma organizada com funil de vendas personalizado.'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp Integrado',
      description: 'Atenda seus clientes diretamente pelo WhatsApp com automação inteligente.'
    },
    {
      icon: TrendingUp,
      title: 'Analytics Avançado',
      description: 'Acompanhe métricas detalhadas e tome decisões baseadas em dados.'
    },
    {
      icon: Shield,
      title: 'Seguro e Confiável',
      description: 'Seus dados protegidos com as melhores práticas de segurança.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <img 
                src="/brand-logo.svg" 
                alt="Odontomy Brand" 
                className="w-6 h-6"
              />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Odontomy
            </span>
          </div>
          <Button 
            onClick={() => navigate('/auth')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Entrar
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Plataforma de Automação para 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}Odontologias
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Gerencie agendamentos, atenda pacientes pelo WhatsApp e aumente suas vendas 
            com nossa plataforma completa de automação para consultórios odontológicos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => navigate('/auth')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-3"
            >
              Começar Agora
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="text-lg px-8 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              Ver Demonstração
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-24">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center p-6 rounded-2xl bg-white shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para transformar seu consultório?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Junte-se a centenas de dentistas que já usam nossa plataforma.
          </p>
          <Button 
            size="lg"
            onClick={() => navigate('/auth')}
            className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3"
          >
            Criar Conta Grátis
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-24">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <img 
                src="/brand-logo.svg" 
                alt="Odontomy Brand" 
                className="w-5 h-5"
              />
            </div>
            <span className="text-xl font-bold">Odontomy</span>
          </div>
          <p className="text-gray-400">
            © {new Date().getFullYear()} Odontomy. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
