
import { Bot, MessageSquare, BarChart3, Zap, Users, Target } from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "WhatsApp Automático",
    description: "Automatize conversas, envie mensagens em massa e gerencie todos os chats em uma única plataforma.",
    color: "from-green-500 to-emerald-600"
  },
  {
    icon: Users,
    title: "CRM Inteligente",
    description: "Gerencie leads com Kanban visual, acompanhe o funil de vendas e nunca perca uma oportunidade.",
    color: "from-blue-500 to-cyan-600"
  },
  {
    icon: Bot,
    title: "Funis de Automação",
    description: "Crie sequências automáticas personalizadas que nutrem leads e convertem em vendas.",
    color: "from-purple-500 to-violet-600"
  },
  {
    icon: BarChart3,
    title: "Analytics Avançado",
    description: "Relatórios detalhados de performance, ROI e métricas que importam para seu negócio.",
    color: "from-orange-500 to-red-600"
  },
  {
    icon: Target,
    title: "Landing Pages",
    description: "Construtor visual de páginas de captura com alta conversão e integração nativa.",
    color: "from-pink-500 to-rose-600"
  },
  {
    icon: Zap,
    title: "Integrações",
    description: "Conecte com suas ferramentas favoritas: Zapier, webhooks, APIs e muito mais.",
    color: "from-indigo-500 to-blue-600"
  }
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tudo que você precisa para{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              vender mais
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Uma plataforma completa que integra CRM, automação de WhatsApp e analytics 
            para turbinar suas vendas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
