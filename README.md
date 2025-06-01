
# Dentis - Plataforma SaaS de Automação de Vendas

Uma plataforma completa de gestão da jornada do cliente com foco em automação de comunicação e análise de resultados para PMEs brasileiras.

## 🚀 Tecnologias

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Shadcn/UI
- **Build**: Vite
- **Routing**: React Router DOM
- **State Management**: TanStack Query + Zustand (preparado)
- **Forms**: React Hook Form + Zod (preparado)
- **Icons**: Lucide React

## 🏗️ Arquitetura

O projeto segue os princípios de Clean Architecture e Domain-Driven Design:

```
src/
├── components/         # Componentes reutilizáveis
│   ├── ui/            # Componentes base (Shadcn/UI)
│   ├── forms/         # Formulários específicos
│   └── charts/        # Componentes de gráficos
├── pages/             # Páginas da aplicação
├── hooks/             # Custom React hooks
├── lib/               # Configurações e utilitários
├── types/             # Definições TypeScript
├── utils/             # Funções utilitárias
└── services/          # Camada de serviços (API)
```

## 🌟 Funcionalidades

### ✅ Implementado (Fase 1)
- [x] Landing page responsiva e otimizada
- [x] Navegação com menu mobile
- [x] Seções: Hero, Features, Pricing, Contact, Footer
- [x] Formulário de contato funcional
- [x] Design system baseado em Shadcn/UI
- [x] Tipos TypeScript bem definidos
- [x] Estrutura base para expansão

### 🔄 Em Desenvolvimento (Fase 2)
- [ ] Sistema de autenticação (NextAuth.js/Clerk)
- [ ] Dashboard administrativo
- [ ] CRM com Kanban de leads
- [ ] Chat integrado (WhatsApp-like)
- [ ] Sistema de templates

### 📋 Planejado (Fase 3)
- [ ] Funis de automação visual
- [ ] Analytics avançado
- [ ] Integração WhatsApp Business API
- [ ] Sistema de pagamentos
- [ ] Multi-tenancy

## 🎯 Módulos Principais

### 1. CRM & Gestão de Leads
- Kanban visual para pipeline de vendas
- Perfil completo de leads
- Sistema de tags e filtros
- Log de atividades em tempo real

### 2. Automação de Comunicação
- WhatsApp Business API
- Templates personalizáveis
- Sequências automatizadas
- Agendamento de mensagens

### 3. Analytics & Relatórios
- Dashboard com métricas de vendas
- Funil de conversão
- ROI por campanha
- Relatórios personalizáveis

## 🚀 Como usar

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## 📱 Responsividade

O projeto é totalmente responsivo e otimizado para:
- 📱 Mobile (320px+)
- 📟 Tablet (768px+)
- 🖥️ Desktop (1024px+)
- 🖥️ Large Desktop (1440px+)

## 🎨 Design System

Baseado no Shadcn/UI com:
- Paleta de cores: Azul/Roxo gradiente
- Tipografia: Inter (system font)
- Componentes acessíveis (WCAG 2.1)
- Dark mode preparado

## 🔧 Configuração de Desenvolvimento

### Variáveis de Ambiente (futuro)
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
WHATSAPP_API_TOKEN=...
```

### Ferramentas Recomendadas
- VS Code com extensões: TypeScript, Tailwind CSS, ES7+ React
- ESLint + Prettier (configurado)
- Husky para pre-commit hooks (preparado)

## 📊 Performance

- Lighthouse Score: 90+ (meta)
- Core Web Vitals otimizados
- Code splitting por rotas
- Lazy loading de componentes
- Imagens otimizadas

## 🧪 Testes (preparado)

Estrutura preparada para:
- Unit tests: Jest + Testing Library
- E2E tests: Playwright
- Coverage mínimo: 80%

## 🚀 Deploy

Otimizado para deploy em:
- ✅ Vercel (recomendado)
- ✅ Netlify
- ✅ AWS S3 + CloudFront
- 🔄 Docker (preparado)

## 📈 Roadmap

### Sprint 1-2: Foundation ✅
- [x] Setup do projeto
- [x] Landing page
- [x] Design system

### Sprint 3-4: Core Features 🔄
- [ ] Autenticação
- [ ] Dashboard
- [ ] CRM básico

### Sprint 5-6: Automation 📋
- [ ] Funis de automação
- [ ] WhatsApp integration
- [ ] Analytics

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 📞 Suporte

- 📧 Email: contato@dentis.com.br
- 💬 WhatsApp: (11) 99999-9999
- 🌐 Website: https://dentis.com.br

---

Desenvolvido com ❤️ para PMEs brasileiras
