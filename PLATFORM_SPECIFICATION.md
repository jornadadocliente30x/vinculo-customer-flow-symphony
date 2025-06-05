
# Plataforma Odontomy - Especificação Completa

## 1. Visão Geral da Plataforma

### 1.1 Descrição
A Odontomy é uma plataforma de automação para agendamentos e atendimento especializada em odontologias. A plataforma oferece funcionalidades completas de CRM, automação de marketing, gestão de leads, chat integrado com WhatsApp e ferramentas de análise.

### 1.2 Arquitetura Tecnológica
- **Frontend**: React + TypeScript + Vite
- **Estilização**: Tailwind CSS + Shadcn/UI
- **Backend**: Supabase (PostgreSQL + Edge Functions)
- **Estado**: Zustand + React Query (TanStack Query)
- **Roteamento**: React Router DOM
- **Autenticação**: Supabase Auth

---

## 2. Identidade Visual

### 2.1 Cores Principais
- **Primária**: Azul (#007bff) - Transmite confiança e profissionalismo
- **Secundária**: Roxo (#6f42c1) - Inovação e tecnologia
- **Sucesso**: Verde (#28a745) - Ações positivas
- **Aviso**: Amarelo (#ffc107) - Alertas e atenção
- **Erro**: Vermelho (#dc3545) - Erros e ações críticas
- **Neutro**: Cinza (#6c757d) - Textos e elementos secundários

### 2.2 Tipografia
- **Fonte Principal**: System fonts (sans-serif)
- **Hierarquia**: text-xs, text-sm, text-base, text-lg, text-xl, text-2xl, text-3xl, text-4xl

### 2.3 Espaçamento
- **Grid**: Sistema baseado em 4px (space-1, space-2, space-4, space-6, space-8, space-12, space-16)
- **Layout**: Container responsivo com max-width

### 2.4 Componentes Visuais
- **Sombras**: shadow-sm, shadow, shadow-md, shadow-lg
- **Bordas**: rounded, rounded-md, rounded-lg, rounded-xl
- **Transições**: transition-colors, transition-all

---

## 3. Estrutura de Banco de Dados

### 3.1 Tabelas Principais

#### 3.1.1 Empresa
```sql
empresa (
  id: integer PRIMARY KEY,
  nome: varchar NOT NULL,
  email: varchar,
  telefone: varchar,
  cnpj: varchar,
  endereco: text,
  ativo: boolean DEFAULT true,
  deleted: boolean DEFAULT false,
  created_at: timestamp,
  updated_at: timestamp
)
```

#### 3.1.2 Usuario
```sql
usuario (
  id: integer PRIMARY KEY,
  nome: varchar NOT NULL,
  email: varchar NOT NULL,
  senha: varchar NOT NULL,
  telefone: varchar,
  empresa_id: integer FK,
  nivel_usuario_id: integer FK,
  ativo: boolean DEFAULT true,
  deleted: boolean DEFAULT false,
  created_at: timestamp,
  updated_at: timestamp,
  user_updated_at: integer
)
```

#### 3.1.3 Lead
```sql
lead (
  id: integer PRIMARY KEY,
  nome: varchar NOT NULL,
  primeiro_nome: varchar,
  ultimo_nome: varchar,
  telefone: varchar NOT NULL,
  email: varchar,
  endereco: text,
  cidade: varchar,
  estado: varchar,
  cpf: varchar,
  data_nascimento: date,
  observacoes: text,
  empresa_id: integer FK,
  status_lead_id: integer FK,
  origem_lead_id: integer FK,
  etapa_jornada_id: integer FK,
  usuario_responsavel_id: integer FK,
  ativo: boolean DEFAULT true,
  deleted: boolean DEFAULT false,
  created_at: timestamp,
  updated_at: timestamp,
  user_updated_at: integer
)
```

#### 3.1.4 Chat
```sql
chat (
  id: integer PRIMARY KEY,
  titulo: varchar,
  lead_id: integer FK,
  usuario_id: integer FK,
  status_chat_id: integer FK,
  ativo: boolean DEFAULT true,
  deleted: boolean DEFAULT false,
  created_at: timestamp,
  updated_at: timestamp
)
```

#### 3.1.5 Mensagem
```sql
mensagem (
  id: integer PRIMARY KEY,
  conteudo: text NOT NULL,
  telefone: varchar NOT NULL,
  anexo: varchar,
  chat_id: integer FK,
  usuario_id: integer FK,
  tipo_mensagem_id: integer FK,
  status_mensagem_id: integer FK,
  lida: boolean DEFAULT false,
  enviada: boolean DEFAULT false,
  created_at: timestamp,
  updated_at: timestamp
)
```

### 3.2 Tabelas de Configuração

#### 3.2.1 Etapa Jornada
```sql
etapa_jornada (
  id: integer PRIMARY KEY,
  nome: varchar NOT NULL,
  descricao: text,
  cor: varchar DEFAULT '#6c757d',
  icone: varchar,
  ordem: integer DEFAULT 0,
  empresa_id: integer FK,
  ativo: boolean DEFAULT true,
  created_at: timestamp,
  updated_at: timestamp
)
```

#### 3.2.2 Status Lead
```sql
status_lead (
  id: integer PRIMARY KEY,
  nome: varchar NOT NULL,
  descricao: text,
  cor: varchar DEFAULT '#17a2b8',
  icone: varchar,
  ordem: integer DEFAULT 0,
  empresa_id: integer FK,
  ativo: boolean DEFAULT true,
  created_at: timestamp,
  updated_at: timestamp
)
```

#### 3.2.3 Origem Lead
```sql
origem_lead (
  id: integer PRIMARY KEY,
  nome: varchar NOT NULL,
  descricao: text,
  cor: varchar DEFAULT '#fd7e14',
  icone: varchar,
  empresa_id: integer FK,
  ativo: boolean DEFAULT true,
  created_at: timestamp,
  updated_at: timestamp
)
```

### 3.3 Tabelas de Sistema

#### 3.3.1 Agente IA
```sql
agente_ia (
  id: integer PRIMARY KEY,
  nome: varchar NOT NULL,
  descricao: text,
  empresa_id: integer FK,
  tipo_agente_id: integer FK,
  modelo: varchar DEFAULT 'gpt-3.5-turbo',
  temperatura: numeric DEFAULT 0.7,
  max_tokens: integer DEFAULT 1000,
  prompt_base: text,
  configuracoes: jsonb DEFAULT '{}',
  ativo: boolean DEFAULT true,
  deleted: boolean DEFAULT false,
  created_at: timestamp,
  updated_at: timestamp
)
```

#### 3.3.2 Agendamento
```sql
agendamento (
  id: integer PRIMARY KEY,
  titulo: varchar NOT NULL,
  descricao: text,
  data_agendamento: timestamp NOT NULL,
  lead_id: integer FK,
  status_agendamento_id: integer FK,
  observacoes: text,
  ativo: boolean DEFAULT true,
  deleted: boolean DEFAULT false,
  created_at: timestamp,
  updated_at: timestamp,
  user_updated_at: integer
)
```

#### 3.3.3 Tratamento
```sql
tratamento (
  id: integer PRIMARY KEY,
  titulo: varchar NOT NULL,
  descricao: text NOT NULL,
  lead_id: integer FK,
  status_tratamento_id: integer FK,
  valor: numeric,
  data_inicio: timestamp,
  data_fim: timestamp,
  observacoes: text,
  ativo: boolean DEFAULT true,
  deleted: boolean DEFAULT false,
  created_at: timestamp,
  updated_at: timestamp,
  user_updated_at: integer
)
```

---

## 4. Tipos de Dados TypeScript

### 4.1 Tipos Base
```typescript
interface BaseEntity {
  id: number;
  created_at: string;
  updated_at: string;
  ativo: boolean;
  deleted?: boolean;
}

interface TimestampedEntity extends BaseEntity {
  user_updated_at?: number;
}

type LoadingState = 'idle' | 'loading' | 'success' | 'error';

interface AsyncState<T> {
  data: T | null;
  loading: LoadingState;
  error: string | null;
}
```

### 4.2 Tipos de Negócio
```typescript
interface Lead extends TimestampedEntity {
  nome: string;
  primeiro_nome?: string;
  ultimo_nome?: string;
  telefone: string;
  email?: string;
  endereco?: string;
  cidade?: string;
  estado?: string;
  cpf?: string;
  data_nascimento?: string;
  observacoes?: string;
  empresa_id: number;
  status_lead_id: number;
  origem_lead_id: number;
  etapa_jornada_id?: number;
  usuario_responsavel_id?: number;
}

interface Chat extends BaseEntity {
  titulo?: string;
  lead_id: number;
  usuario_id?: number;
  status_chat_id: number;
}

interface Mensagem extends BaseEntity {
  conteudo: string;
  telefone: string;
  anexo?: string;
  chat_id: number;
  usuario_id?: number;
  tipo_mensagem_id: number;
  status_mensagem_id: number;
  lida: boolean;
  enviada: boolean;
}
```

---

## 5. Páginas e Componentes

### 5.1 Estrutura de Páginas

#### 5.1.1 Autenticação
- **Login** (`/login`): Formulário de login com email/senha
- **Register** (`/register`): Formulário de cadastro
- **ForgotPassword** (`/forgot-password`): Recuperação de senha
- **ResetPassword** (`/reset-password`): Redefinição de senha

#### 5.1.2 Dashboard Principal
- **Dashboard** (`/dashboard`): Visão geral com métricas e KPIs
- **Profile** (`/dashboard/profile`): Perfil do usuário

#### 5.1.3 Gestão de Leads
- **LeadsPage** (`/dashboard/leads`): Lista e gestão de leads
- **LeadsFunnel** (`/dashboard/leads/funnel`): Funil de vendas tipo Kanban
- **LeadsImportPage** (`/dashboard/leads/import`): Importação de leads

#### 5.1.4 Mensagens
- **WhatsAppChat** (`/dashboard/messages`): Interface de chat integrado

#### 5.1.5 Agentes IA
- **AgentsPage** (`/dashboard/agents`): Configuração de agentes de IA

#### 5.1.6 Conectividade
- **ConnectPage** (`/dashboard/connect`): Integrações e conexões

#### 5.1.7 Administração
- **AdminDashboard** (`/admin`): Dashboard administrativo
- **UsuariosCadastros** (`/admin/usuarios`): Gestão de usuários
- **UsuariosTipos** (`/admin/tipos`): Tipos de usuários

### 5.2 Componentes Principais

#### 5.2.1 Layout
- **AuthLayout**: Layout para páginas de autenticação
- **DashboardLayout**: Layout principal com sidebar
- **AppSidebar**: Menu lateral de navegação

#### 5.2.2 Formulários
- **EditLeadModal**: Modal para editar leads
- **DeleteLeadModal**: Modal de confirmação de exclusão
- **ImportLeadsModal**: Modal para importação
- **ExportReportModal**: Modal para exportação

#### 5.2.3 Visualizações
- **KanbanBoard**: Quadro Kanban para funil de vendas
- **KanbanColumn**: Coluna do Kanban
- **LeadCard**: Card individual do lead
- **MetricCard**: Card de métricas
- **SalesFunnel**: Funil de vendas

#### 5.2.4 Chat
- **ConversationSidebar**: Lista de conversas
- **ChatArea**: Área principal do chat
- **MessageBubble**: Bolha de mensagem
- **MessageInput**: Input para nova mensagem

#### 5.2.5 Shared Components
- **LoadingSpinner**: Spinner de carregamento
- **EmptyState**: Estado vazio
- **ErrorBoundary**: Tratamento de erros

---

## 6. Formulários Detalhados

### 6.1 Formulário de Lead
**Campos obrigatórios:**
- Nome completo
- Telefone
- Status do lead
- Origem do lead

**Campos opcionais:**
- Primeiro nome
- Último nome
- Email
- Endereço
- Cidade
- Estado
- CPF
- Data de nascimento
- Observações
- Etapa da jornada
- Usuário responsável

**Validações:**
- Nome: mínimo 2 caracteres
- Telefone: formato brasileiro
- Email: formato válido
- CPF: formato e dígitos verificadores

### 6.2 Formulário de Chat
**Campos:**
- Título (opcional)
- Lead associado
- Status do chat
- Usuário responsável (opcional)

### 6.3 Formulário de Agente IA
**Campos:**
- Nome do agente
- Descrição
- Tipo de agente
- Modelo de IA (GPT-3.5-turbo, GPT-4, etc.)
- Temperatura (0.0 - 1.0)
- Máximo de tokens
- Prompt base
- Configurações JSON

---

## 7. Lógicas de Negócio

### 7.1 Fluxo de Leads
1. **Criação**: Lead é criado com status inicial
2. **Atribuição**: Lead pode ser atribuído a um usuário responsável
3. **Progressão**: Lead avança pelas etapas da jornada
4. **Conversão**: Lead pode ser convertido em cliente
5. **Arquivamento**: Lead pode ser arquivado ou excluído

### 7.2 Sistema de Chat
1. **Criação de Chat**: Automaticamente criado para cada lead
2. **Mensagens**: Podem ser enviadas/recebidas via WhatsApp
3. **Status**: Chat pode ter diferentes status (ativo, finalizado, etc.)
4. **Histórico**: Todas as mensagens são armazenadas

### 7.3 Automação com IA
1. **Triggers**: Eventos que disparam automações
2. **Processamento**: IA analisa contexto e gera respostas
3. **Personalização**: Prompts específicos por etapa da jornada
4. **Monitoramento**: Logs e métricas de performance

### 7.4 Gestão de Usuários
1. **Níveis de Acesso**: Admin, Manager, Agent, Viewer
2. **Permissões**: Baseadas no nível do usuário
3. **Empresa**: Isolamento por empresa
4. **Auditoria**: Logs de ações dos usuários

---

## 8. Requisitos Funcionais

### 8.1 Autenticação e Autorização
- **RF001**: Sistema deve permitir login com email e senha
- **RF002**: Sistema deve permitir cadastro de novos usuários
- **RF003**: Sistema deve permitir recuperação de senha
- **RF004**: Sistema deve implementar controle de acesso por níveis
- **RF005**: Sistema deve manter sessão ativa do usuário

### 8.2 Gestão de Leads
- **RF006**: Sistema deve permitir cadastro de leads
- **RF007**: Sistema deve permitir edição de leads
- **RF008**: Sistema deve permitir exclusão lógica de leads
- **RF009**: Sistema deve permitir importação de leads via arquivo
- **RF010**: Sistema deve permitir exportação de relatórios
- **RF011**: Sistema deve permitir filtros e busca de leads
- **RF012**: Sistema deve permitir atribuição de responsáveis

### 8.3 Funil de Vendas
- **RF013**: Sistema deve exibir leads em formato Kanban
- **RF014**: Sistema deve permitir arrastar leads entre etapas
- **RF015**: Sistema deve calcular métricas por etapa
- **RF016**: Sistema deve permitir configuração de etapas

### 8.4 Sistema de Chat
- **RF017**: Sistema deve integrar com WhatsApp
- **RF018**: Sistema deve permitir envio de mensagens
- **RF019**: Sistema deve armazenar histórico de conversas
- **RF020**: Sistema deve notificar novas mensagens
- **RF021**: Sistema deve permitir anexos em mensagens

### 8.5 Agentes de IA
- **RF022**: Sistema deve permitir configuração de agentes
- **RF023**: Sistema deve processar mensagens com IA
- **RF024**: Sistema deve gerar respostas automáticas
- **RF025**: Sistema deve personalizar prompts por etapa

### 8.6 Relatórios e Análises
- **RF026**: Sistema deve gerar dashboard com métricas
- **RF027**: Sistema deve calcular taxa de conversão
- **RF028**: Sistema deve mostrar origem dos leads
- **RF029**: Sistema deve exibir performance por usuário

---

## 9. Requisitos Não Funcionais

### 9.1 Performance
- **RNF001**: Tempo de resposta < 2 segundos para operações básicas
- **RNF002**: Suporte a 1000+ usuários simultâneos
- **RNF003**: Carregamento lazy de componentes
- **RNF004**: Cache de dados frequentemente acessados

### 9.2 Segurança
- **RNF005**: Criptografia de dados sensíveis
- **RNF006**: Autenticação JWT com refresh tokens
- **RNF007**: Validação de entrada em todos os formulários
- **RNF008**: Logs de auditoria para ações críticas
- **RNF009**: Row Level Security no banco de dados

### 9.3 Usabilidade
- **RNF010**: Interface responsiva para dispositivos móveis
- **RNF011**: Compatibilidade com principais navegadores
- **RNF012**: Acessibilidade WCAG 2.1 AA
- **RNF013**: Feedback visual para todas as ações

### 9.4 Manutenibilidade
- **RNF014**: Código TypeScript com tipagem forte
- **RNF015**: Testes unitários com cobertura > 80%
- **RNF016**: Documentação técnica atualizada
- **RNF017**: Arquitetura modular e escalável

### 9.5 Disponibilidade
- **RNF018**: Uptime > 99.5%
- **RNF019**: Backup automático diário
- **RNF020**: Recuperação de desastres < 4 horas
- **RNF021**: Monitoramento 24/7

---

## 10. Fluxogramas

### 10.1 Fluxo de Autenticação
```
Início → Tela Login → Validar Credenciais → 
[Válido] → Dashboard Principal
[Inválido] → Mensagem Erro → Tela Login
```

### 10.2 Fluxo de Criação de Lead
```
Dashboard → Botão Novo Lead → Modal Formulário → 
Preencher Dados → Validar → Salvar → 
[Sucesso] → Atualizar Lista → Fechar Modal
[Erro] → Exibir Erro → Corrigir Dados
```

### 10.3 Fluxo de Chat com IA
```
Mensagem Recebida → Identificar Lead → 
Verificar Agente IA → Processar Contexto → 
Gerar Resposta → [Automático] → Enviar Resposta
                 [Manual] → Aguardar Operador
```

### 10.4 Fluxo de Progressão no Funil
```
Lead na Etapa A → Arrastar para Etapa B → 
Validar Permissões → Atualizar Status → 
Disparar Automações → Notificar Responsável → 
Atualizar Métricas
```

---

## 11. PRD (Product Requirements Document)

### 11.1 Problema
Clínicas odontológicas enfrentam dificuldades para:
- Gerenciar leads de forma eficiente
- Automatizar comunicação com pacientes
- Acompanhar jornada do paciente
- Integrar diferentes canais de comunicação
- Gerar relatórios e análises

### 11.2 Solução
Plataforma integrada que oferece:
- CRM especializado para odontologia
- Automação de marketing via WhatsApp
- Agentes de IA para atendimento
- Funil visual de conversão
- Relatórios e dashboards

### 11.3 Objetivos de Negócio
- Aumentar conversão de leads em 30%
- Reduzir tempo de resposta em 50%
- Automatizar 80% das interações iniciais
- Melhorar satisfação do paciente
- Reduzir custo de aquisição

### 11.4 Métricas de Sucesso
- **Taxa de Conversão**: % de leads que viram pacientes
- **Tempo de Resposta**: Tempo médio de primeira resposta
- **NPS**: Net Promoter Score dos usuários
- **Retenção**: % de clientes que renovam anualmente
- **ROI**: Retorno sobre investimento para clínicas

### 11.5 Personas
**Administrador da Clínica**
- Precisa de visão geral do negócio
- Quer relatórios e métricas
- Foca em ROI e eficiência

**Recepcionista/Atendente**
- Usa chat diariamente
- Precisa de interface simples
- Foca em produtividade

**Dentista**
- Consulta histórico do paciente
- Agenda procedimentos
- Acompanha tratamentos

### 11.6 Roadmap
**Fase 1 - MVP (3 meses)**
- Autenticação básica
- CRUD de leads
- Chat simples
- Funil básico

**Fase 2 - Automação (2 meses)**
- Integração WhatsApp
- Agentes de IA básicos
- Automações simples

**Fase 3 - Analytics (2 meses)**
- Dashboard avançado
- Relatórios personalizados
- Métricas de performance

**Fase 4 - Integrações (3 meses)**
- API pública
- Integrações terceiros
- White label

### 11.7 Riscos e Mitigações
**Risco**: Baixa adoção pelos usuários
**Mitigação**: UX intuitivo, treinamento, suporte

**Risco**: Problemas de performance
**Mitigação**: Arquitetura escalável, testes de carga

**Risco**: Falhas de segurança
**Mitigação**: Auditorias regulares, certificações

---

## 12. Arquitetura de Serviços

### 12.1 Camada de Apresentação
- **React Components**: Componentes reutilizáveis
- **Pages**: Páginas da aplicação
- **Layouts**: Templates de layout
- **Routing**: Gerenciamento de rotas

### 12.2 Camada de Negócio
- **Hooks**: Lógica de estado e efeitos
- **Services**: Comunicação com APIs
- **Utils**: Funções utilitárias
- **Stores**: Gerenciamento de estado global

### 12.3 Camada de Dados
- **Supabase Client**: Cliente do banco
- **TypeScript Types**: Tipagem forte
- **API Endpoints**: Endpoints REST
- **Real-time**: Subscriptions em tempo real

### 12.4 Camada de Infraestrutura
- **Edge Functions**: Funções serverless
- **Row Level Security**: Segurança no banco
- **Storage**: Armazenamento de arquivos
- **Auth**: Sistema de autenticação

---

## 13. Considerações Técnicas

### 13.1 Escalabilidade
- Arquitetura baseada em microserviços
- Cache Redis para dados frequentes
- CDN para assets estáticos
- Load balancer para distribuição

### 13.2 Monitoramento
- Logs estruturados
- Métricas de performance
- Alertas automáticos
- Dashboard de observabilidade

### 13.3 Backup e Recuperação
- Backup incremental diário
- Replicação geográfica
- Teste de recuperação mensal
- RTO < 4 horas, RPO < 1 hora

### 13.4 Compliance
- LGPD para dados pessoais
- ISO 27001 para segurança
- SOC 2 Type II para compliance
- Auditoria anual de segurança

---

## 14. Conclusão

A plataforma Odontomy representa uma solução completa para automatização de vendas e atendimento em clínicas odontológicas. Com arquitetura moderna, design responsivo e funcionalidades avançadas de IA, a plataforma visa revolucionar a gestão de relacionamento com pacientes no setor odontológico.

A implementação seguirá metodologia ágil com entregas incrementais, garantindo feedback contínuo dos usuários e evolução constante da plataforma.
