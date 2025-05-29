
import { Agent } from '@/types/agents';

export const mockAgents: Agent[] = [
  {
    id: '1',
    title: 'Agente de Boas-vindas',
    description: 'Recebe novos pacientes e faz primeiro contato, explicando os serviços da clínica',
    type: 'Atendimento',
    status: 'Ativo',
    schedule: {
      days: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
      startTime: '08:00',
      endTime: '18:00'
    },
    patientJourney: [
      {
        id: 'step1',
        title: 'Assimilação',
        description: 'Mensagem de boas-vindas e apresentação da clínica'
      },
      {
        id: 'step2',
        title: 'Utilização',
        description: 'Explicação dos primeiros passos e agendamento'
      },
      {
        id: 'step3',
        title: 'Adoção',
        description: 'Acompanhamento pós-consulta e feedback'
      },
      {
        id: 'step4',
        title: 'Expansão',
        description: 'Apresentação de novos tratamentos disponíveis'
      },
      {
        id: 'step5',
        title: 'Evangelismo',
        description: 'Incentivo para indicações e avaliações'
      }
    ],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '2',
    title: 'Agente de Agendamento',
    description: 'Gerencia agendamentos automáticos e confirma consultas com pacientes',
    type: 'Agendamento',
    status: 'Ativo',
    schedule: {
      days: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      startTime: '07:00',
      endTime: '19:00'
    },
    patientJourney: [
      {
        id: 'step1',
        title: 'Assimilação',
        description: 'Apresentação do sistema de agendamento'
      },
      {
        id: 'step2',
        title: 'Utilização',
        description: 'Orientação sobre como agendar consultas'
      },
      {
        id: 'step3',
        title: 'Adoção',
        description: 'Confirmação automática de agendamentos'
      },
      {
        id: 'step4',
        title: 'Expansão',
        description: 'Sugestão de agendamentos de retorno'
      },
      {
        id: 'step5',
        title: 'Evangelismo',
        description: 'Compartilhamento da experiência de agendamento'
      }
    ],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-25')
  },
  {
    id: '3',
    title: 'Suporte Pós-Consulta',
    description: 'Oferece suporte após consultas, tira dúvidas sobre tratamentos e medicações',
    type: 'Suporte',
    status: 'Inativo',
    schedule: {
      days: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
      startTime: '09:00',
      endTime: '17:00'
    },
    patientJourney: [
      {
        id: 'step1',
        title: 'Assimilação',
        description: 'Acolhimento pós-consulta e orientações iniciais'
      },
      {
        id: 'step2',
        title: 'Utilização',
        description: 'Acompanhamento dos primeiros dias pós-tratamento'
      },
      {
        id: 'step3',
        title: 'Adoção',
        description: 'Verificação de evolução e aderência ao tratamento'
      },
      {
        id: 'step4',
        title: 'Expansão',
        description: 'Apresentação de cuidados preventivos adicionais'
      },
      {
        id: 'step5',
        title: 'Evangelismo',
        description: 'Solicitação de feedback e depoimentos'
      }
    ],
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '4',
    title: 'Agente de Emergência',
    description: 'Atende casos de emergência dental fora do horário comercial',
    type: 'Atendimento',
    status: 'Ativo',
    schedule: {
      days: ['Sábado', 'Domingo'],
      startTime: '08:00',
      endTime: '20:00'
    },
    patientJourney: [
      {
        id: 'step1',
        title: 'Assimilação',
        description: 'Triagem inicial de emergência'
      },
      {
        id: 'step2',
        title: 'Utilização',
        description: 'Orientações de primeiros socorros dentais'
      },
      {
        id: 'step3',
        title: 'Adoção',
        description: 'Agendamento de consulta de emergência'
      },
      {
        id: 'step4',
        title: 'Expansão',
        description: 'Prevenção de futuras emergências'
      },
      {
        id: 'step5',
        title: 'Evangelismo',
        description: 'Compartilhamento da experiência de atendimento'
      }
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-22')
  },
  {
    id: '5',
    title: 'Agente de Retorno',
    description: 'Acompanha pacientes em tratamentos longos e agenda retornos',
    type: 'Agendamento',
    status: 'Ativo',
    schedule: {
      days: ['Segunda', 'Quarta', 'Sexta'],
      startTime: '10:00',
      endTime: '16:00'
    },
    patientJourney: [
      {
        id: 'step1',
        title: 'Assimilação',
        description: 'Explicação sobre a importância dos retornos'
      },
      {
        id: 'step2',
        title: 'Utilização',
        description: 'Agendamento automático de retornos'
      },
      {
        id: 'step3',
        title: 'Adoção',
        description: 'Acompanhamento contínuo do tratamento'
      },
      {
        id: 'step4',
        title: 'Expansão',
        description: 'Apresentação de tratamentos complementares'
      },
      {
        id: 'step5',
        title: 'Evangelismo',
        description: 'Depoimentos sobre a evolução do tratamento'
      }
    ],
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-18')
  },
  {
    id: '6',
    title: 'Agente de Lembrete',
    description: 'Envia lembretes de consultas e cuidados preventivos',
    type: 'Suporte',
    status: 'Inativo',
    schedule: {
      days: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
      startTime: '08:00',
      endTime: '17:00'
    },
    patientJourney: [
      {
        id: 'step1',
        title: 'Assimilação',
        description: 'Configuração de preferências de lembrete'
      },
      {
        id: 'step2',
        title: 'Utilização',
        description: 'Envio de lembretes personalizados'
      },
      {
        id: 'step3',
        title: 'Adoção',
        description: 'Acompanhamento da aderência aos lembretes'
      },
      {
        id: 'step4',
        title: 'Expansão',
        description: 'Lembretes sobre novos serviços'
      },
      {
        id: 'step5',
        title: 'Evangelismo',
        description: 'Compartilhamento de dicas de saúde bucal'
      }
    ],
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-16')
  }
];
