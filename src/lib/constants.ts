
// Application Constants

export const APP_CONFIG = {
  name: 'Vinculo',
  description: 'Plataforma de Automação de Vendas para PMEs',
  version: '1.0.0',
  supportEmail: 'contato@vinculo.com.br',
  supportPhone: '+5511999999999'
};

export const LEAD_STATUSES = {
  NEW: 'new',
  CONTACTED: 'contacted', 
  QUALIFIED: 'qualified',
  PROPOSAL: 'proposal',
  NEGOTIATION: 'negotiation',
  WON: 'won',
  LOST: 'lost'
} as const;

export const LEAD_SOURCES = {
  INSTAGRAM: 'instagram',
  FACEBOOK: 'facebook',
  LINKEDIN: 'linkedin',
  WEBSITE: 'website',
  EMAIL: 'email',
  WHATSAPP: 'whatsapp',
  REFERRAL: 'referral',
  OTHER: 'other'
} as const;

export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  AGENT: 'agent',
  VIEWER: 'viewer'
} as const;

export const MESSAGE_TYPES = {
  TEXT: 'text',
  IMAGE: 'image',
  DOCUMENT: 'document',
  AUDIO: 'audio',
  VIDEO: 'video'
} as const;

export const CAMPAIGN_TYPES = {
  WELCOME: 'welcome',
  NURTURE: 'nurture',
  PROMOTIONAL: 'promotional',
  REACTIVATION: 'reactivation'
} as const;

export const SUBSCRIPTION_PLANS = {
  STARTER: {
    name: 'Starter',
    price: 97,
    maxContacts: 1000,
    maxCampaigns: 5,
    features: ['WhatsApp', 'CRM Básico', 'Landing Pages', 'Suporte Email']
  },
  PROFESSIONAL: {
    name: 'Professional', 
    price: 197,
    maxContacts: 5000,
    maxCampaigns: -1, // unlimited
    features: ['Tudo do Starter', 'Analytics', 'API', 'White Label', 'Suporte Prioritário']
  },
  ENTERPRISE: {
    name: 'Enterprise',
    price: 397,
    maxContacts: -1, // unlimited
    maxCampaigns: -1, // unlimited
    features: ['Tudo do Professional', 'Múltiplas Equipes', 'Gerente de Sucesso', 'SLA']
  }
} as const;
