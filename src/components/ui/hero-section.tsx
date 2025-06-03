
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Transforme{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              a Jornada de Pacientes
            </span>{" "}
            com Automação Inteligente
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            A plataforma mais completa em gestão da jornada do paciente para Clínicas Odontológicas. 
            Agentes de IA para Automatizar Atendimentos, Agendamentos, gerenciar pacientes, vender e crescer até 300%.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              asChild
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg"
            >
              <Link to="/auth/register">
                Começar Teste Grátis
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>

          <div className="mt-12 text-sm text-gray-500">
            ✓ Teste grátis por 14 dias • ✓ Sem cartão de crédito • ✓ Suporte em português
          </div>
        </div>

        {/* Hero Image/Dashboard Preview */}
        <div className="mt-16 relative">
          <div className="bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 flex items-center space-x-2 border-b border-gray-200">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="ml-4 text-sm text-gray-600">Dentis - Plataforma de Automação</span>
            </div>
            <div className="h-96 bg-gradient-to-br from-blue-100 to-purple-100 flex">
              {/* Tela do Chat */}
              <div className="flex-1 border-r border-gray-200 p-6">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-white text-xl">💬</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Chat Inteligente</h3>
                  <p className="text-sm text-gray-600">Atendimento automatizado</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                      <span className="text-xs font-medium">Paciente</span>
                    </div>
                    <p className="text-xs text-gray-700">Gostaria de agendar uma consulta</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3 shadow-sm ml-4">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">D</span>
                      </div>
                      <span className="text-xs font-medium">IA Dentis</span>
                    </div>
                    <p className="text-xs text-gray-700">Claro! Que dia seria melhor para você?</p>
                  </div>
                </div>
              </div>
              
              {/* Tela de Criar Agentes IA */}
              <div className="flex-1 p-6">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-white text-xl">🤖</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Agentes IA</h3>
                  <p className="text-sm text-gray-600">Configuração inteligente</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-3 shadow-sm border-2 border-purple-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-purple-700">Agente de Agendamento</span>
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    </div>
                    <p className="text-xs text-gray-600">Automação para consultas</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-700">Agente de Suporte</span>
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    </div>
                    <p className="text-xs text-gray-600">Atendimento especializado</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-700">+ Criar Novo</span>
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">+</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
