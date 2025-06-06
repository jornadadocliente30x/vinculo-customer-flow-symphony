
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Escalável",
    price: "R$ 297",
    period: "/mês",
    description: "Para empresas em crescimento",
    features: [
      "Até 7.000 contatos",
      "2 Agentes IA para automação",
      "WhatsApp + Email integrados",
      "CRM intuitivo",
      "Dashboard avançado",
      "Suporte exclusivo",
      "Agendamento automático",
      "Relatórios personalizados"
    ],
    popular: true,
    cta: "Começar Teste Grátis"
  },
  {
    name: "Crescimento",
    price: "R$ 397",
    period: "/mês",
    description: "Para grandes operações",
    features: [
        "Contatos ilimitados",
      "3 Agentes IA para automação",
      "WhatsApp + Email integrados",
      "CRM intuitivo",
      "Dashboard avançado",
      "API e webhooks",
      "Suporte exclusivo",
      "Agendamento automático",
      "Relatórios personalizados",
      "Backup e segurança avançada"
    ],
    popular: false,
    cta: "Falar com Vendas"
  }
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Preços que{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              cabem no seu bolso
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Escolha o plano ideal para a sua Odontológica crescer mais. Todos incluem 14 dias de teste grátis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg p-8 ${
                plan.popular
                  ? "ring-2 ring-blue-600 scale-105"
                  : "hover:shadow-xl transition-shadow duration-300"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Mais Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-1">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                className={`w-full py-3 ${
                  plan.popular
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    : "bg-gray-900 hover:bg-gray-800 text-white"
                }`}
              >
                {plan.cta === "Começar Teste Grátis" ? (
                  <Link to="/auth/register">{plan.cta}</Link>
                ) : (
                  <a href="#contact">{plan.cta}</a>
                )}
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 text-lg">
            Todos os planos incluem: 🔒 SSL grátis • 📊 Analytics básico • 🇧🇷 Suporte em português
          </p>
        </div>
      </div>
    </section>
  );
}
