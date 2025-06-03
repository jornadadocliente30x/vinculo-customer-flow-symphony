export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      agendamento: {
        Row: {
          ativo: boolean | null
          created_at: string | null
          data_agendamento: string
          deleted: boolean | null
          descricao: string | null
          id: number
          lead_id: number
          observacoes: string | null
          status_agendamento_id: number
          titulo: string
          updated_at: string | null
          user_updated_at: number | null
        }
        Insert: {
          ativo?: boolean | null
          created_at?: string | null
          data_agendamento: string
          deleted?: boolean | null
          descricao?: string | null
          id?: number
          lead_id: number
          observacoes?: string | null
          status_agendamento_id: number
          titulo: string
          updated_at?: string | null
          user_updated_at?: number | null
        }
        Update: {
          ativo?: boolean | null
          created_at?: string | null
          data_agendamento?: string
          deleted?: boolean | null
          descricao?: string | null
          id?: number
          lead_id?: number
          observacoes?: string | null
          status_agendamento_id?: number
          titulo?: string
          updated_at?: string | null
          user_updated_at?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_agendamento_lead"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "lead"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_agendamento_status"
            columns: ["status_agendamento_id"]
            isOneToOne: false
            referencedRelation: "status_agendamento"
            referencedColumns: ["id"]
          },
        ]
      }
      agente_ia: {
        Row: {
          ativo: boolean | null
          configuracoes: Json | null
          created_at: string | null
          deleted: boolean | null
          descricao: string | null
          empresa_id: number
          id: number
          max_tokens: number | null
          modelo: string | null
          nome: string
          prompt_base: string | null
          temperatura: number | null
          tipo_agente_id: number
          updated_at: string | null
        }
        Insert: {
          ativo?: boolean | null
          configuracoes?: Json | null
          created_at?: string | null
          deleted?: boolean | null
          descricao?: string | null
          empresa_id: number
          id?: number
          max_tokens?: number | null
          modelo?: string | null
          nome: string
          prompt_base?: string | null
          temperatura?: number | null
          tipo_agente_id: number
          updated_at?: string | null
        }
        Update: {
          ativo?: boolean | null
          configuracoes?: Json | null
          created_at?: string | null
          deleted?: boolean | null
          descricao?: string | null
          empresa_id?: number
          id?: number
          max_tokens?: number | null
          modelo?: string | null
          nome?: string
          prompt_base?: string | null
          temperatura?: number | null
          tipo_agente_id?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_agente_empresa"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresa"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_agente_tipo"
            columns: ["tipo_agente_id"]
            isOneToOne: false
            referencedRelation: "tipo_agente"
            referencedColumns: ["id"]
          },
        ]
      }
      chat: {
        Row: {
          ativo: boolean | null
          created_at: string | null
          deleted: boolean | null
          id: number
          lead_id: number
          status_chat_id: number
          titulo: string | null
          updated_at: string | null
          usuario_id: number | null
        }
        Insert: {
          ativo?: boolean | null
          created_at?: string | null
          deleted?: boolean | null
          id?: number
          lead_id: number
          status_chat_id: number
          titulo?: string | null
          updated_at?: string | null
          usuario_id?: number | null
        }
        Update: {
          ativo?: boolean | null
          created_at?: string | null
          deleted?: boolean | null
          id?: number
          lead_id?: number
          status_chat_id?: number
          titulo?: string | null
          updated_at?: string | null
          usuario_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_chat_lead"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "lead"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_chat_status"
            columns: ["status_chat_id"]
            isOneToOne: false
            referencedRelation: "status_chat"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_chat_usuario"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuario"
            referencedColumns: ["id"]
          },
        ]
      }
      empresa: {
        Row: {
          ativo: boolean | null
          cnpj: string | null
          created_at: string | null
          deleted: boolean | null
          email: string | null
          endereco: string | null
          id: number
          nome: string
          telefone: string | null
          updated_at: string | null
        }
        Insert: {
          ativo?: boolean | null
          cnpj?: string | null
          created_at?: string | null
          deleted?: boolean | null
          email?: string | null
          endereco?: string | null
          id?: number
          nome: string
          telefone?: string | null
          updated_at?: string | null
        }
        Update: {
          ativo?: boolean | null
          cnpj?: string | null
          created_at?: string | null
          deleted?: boolean | null
          email?: string | null
          endereco?: string | null
          id?: number
          nome?: string
          telefone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      etapa_agente: {
        Row: {
          agente_ia_id: number
          ativo: boolean | null
          configuracoes: Json | null
          created_at: string | null
          etapa_jornada_id: number
          id: number
          prompt_especifico: string | null
          updated_at: string | null
        }
        Insert: {
          agente_ia_id: number
          ativo?: boolean | null
          configuracoes?: Json | null
          created_at?: string | null
          etapa_jornada_id: number
          id?: number
          prompt_especifico?: string | null
          updated_at?: string | null
        }
        Update: {
          agente_ia_id?: number
          ativo?: boolean | null
          configuracoes?: Json | null
          created_at?: string | null
          etapa_jornada_id?: number
          id?: number
          prompt_especifico?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_etapa_agente_ia"
            columns: ["agente_ia_id"]
            isOneToOne: false
            referencedRelation: "agente_ia"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_etapa_agente_jornada"
            columns: ["etapa_jornada_id"]
            isOneToOne: false
            referencedRelation: "etapa_jornada"
            referencedColumns: ["id"]
          },
        ]
      }
      etapa_jornada: {
        Row: {
          ativo: boolean | null
          cor: string | null
          created_at: string | null
          descricao: string | null
          empresa_id: number | null
          icone: string | null
          id: number
          nome: string
          ordem: number | null
          updated_at: string | null
        }
        Insert: {
          ativo?: boolean | null
          cor?: string | null
          created_at?: string | null
          descricao?: string | null
          empresa_id?: number | null
          icone?: string | null
          id?: number
          nome: string
          ordem?: number | null
          updated_at?: string | null
        }
        Update: {
          ativo?: boolean | null
          cor?: string | null
          created_at?: string | null
          descricao?: string | null
          empresa_id?: number | null
          icone?: string | null
          id?: number
          nome?: string
          ordem?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_etapa_jornada_empresa"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresa"
            referencedColumns: ["id"]
          },
        ]
      }
      etapa_personalizada: {
        Row: {
          ativo: boolean | null
          configuracoes: Json | null
          created_at: string | null
          empresa_id: number
          etapa_jornada_id: number
          nome_personalizado: string | null
          updated_at: string | null
        }
        Insert: {
          ativo?: boolean | null
          configuracoes?: Json | null
          created_at?: string | null
          empresa_id: number
          etapa_jornada_id: number
          nome_personalizado?: string | null
          updated_at?: string | null
        }
        Update: {
          ativo?: boolean | null
          configuracoes?: Json | null
          created_at?: string | null
          empresa_id?: number
          etapa_jornada_id?: number
          nome_personalizado?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_etapa_personalizada_empresa"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresa"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_etapa_personalizada_jornada"
            columns: ["etapa_jornada_id"]
            isOneToOne: false
            referencedRelation: "etapa_jornada"
            referencedColumns: ["id"]
          },
        ]
      }
      lead: {
        Row: {
          ativo: boolean | null
          cpf: string | null
          created_at: string | null
          deleted: boolean | null
          email: string | null
          empresa_id: number
          id: number
          nome: string
          observacoes: string | null
          origem_lead_id: number
          status_lead_id: number
          telefone: string
          updated_at: string | null
          user_updated_at: number | null
        }
        Insert: {
          ativo?: boolean | null
          cpf?: string | null
          created_at?: string | null
          deleted?: boolean | null
          email?: string | null
          empresa_id: number
          id?: number
          nome: string
          observacoes?: string | null
          origem_lead_id: number
          status_lead_id: number
          telefone: string
          updated_at?: string | null
          user_updated_at?: number | null
        }
        Update: {
          ativo?: boolean | null
          cpf?: string | null
          created_at?: string | null
          deleted?: boolean | null
          email?: string | null
          empresa_id?: number
          id?: number
          nome?: string
          observacoes?: string | null
          origem_lead_id?: number
          status_lead_id?: number
          telefone?: string
          updated_at?: string | null
          user_updated_at?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_lead_empresa"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresa"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_lead_origem"
            columns: ["origem_lead_id"]
            isOneToOne: false
            referencedRelation: "origem_lead"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_lead_status"
            columns: ["status_lead_id"]
            isOneToOne: false
            referencedRelation: "status_lead"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_tag: {
        Row: {
          lead_id: number
          tag_id: number
        }
        Insert: {
          lead_id: number
          tag_id: number
        }
        Update: {
          lead_id?: number
          tag_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_lead_tag_lead"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "lead"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_lead_tag_tag"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tag"
            referencedColumns: ["id"]
          },
        ]
      }
      mensagem: {
        Row: {
          anexo: string | null
          chat_id: number
          conteudo: string
          created_at: string | null
          enviada: boolean | null
          id: number
          lida: boolean | null
          status_mensagem_id: number
          telefone: string
          tipo_mensagem_id: number
          updated_at: string | null
          usuario_id: number | null
        }
        Insert: {
          anexo?: string | null
          chat_id: number
          conteudo: string
          created_at?: string | null
          enviada?: boolean | null
          id?: number
          lida?: boolean | null
          status_mensagem_id: number
          telefone: string
          tipo_mensagem_id: number
          updated_at?: string | null
          usuario_id?: number | null
        }
        Update: {
          anexo?: string | null
          chat_id?: number
          conteudo?: string
          created_at?: string | null
          enviada?: boolean | null
          id?: number
          lida?: boolean | null
          status_mensagem_id?: number
          telefone?: string
          tipo_mensagem_id?: number
          updated_at?: string | null
          usuario_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_mensagem_chat"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chat"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_mensagem_status"
            columns: ["status_mensagem_id"]
            isOneToOne: false
            referencedRelation: "status_mensagem"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_mensagem_tipo"
            columns: ["tipo_mensagem_id"]
            isOneToOne: false
            referencedRelation: "tipo_mensagem"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_mensagem_usuario"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuario"
            referencedColumns: ["id"]
          },
        ]
      }
      nivel_usuario: {
        Row: {
          ativo: boolean | null
          created_at: string | null
          descricao: string | null
          id: number
          nome: string
          ordem: number | null
          permissoes: Json | null
          updated_at: string | null
        }
        Insert: {
          ativo?: boolean | null
          created_at?: string | null
          descricao?: string | null
          id?: number
          nome: string
          ordem?: number | null
          permissoes?: Json | null
          updated_at?: string | null
        }
        Update: {
          ativo?: boolean | null
          created_at?: string | null
          descricao?: string | null
          id?: number
          nome?: string
          ordem?: number | null
          permissoes?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      origem_lead: {
        Row: {
          ativo: boolean | null
          cor: string | null
          created_at: string | null
          descricao: string | null
          empresa_id: number | null
          icone: string | null
          id: number
          nome: string
          updated_at: string | null
        }
        Insert: {
          ativo?: boolean | null
          cor?: string | null
          created_at?: string | null
          descricao?: string | null
          empresa_id?: number | null
          icone?: string | null
          id?: number
          nome: string
          updated_at?: string | null
        }
        Update: {
          ativo?: boolean | null
          cor?: string | null
          created_at?: string | null
          descricao?: string | null
          empresa_id?: number | null
          icone?: string | null
          id?: number
          nome?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_origem_lead_empresa"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresa"
            referencedColumns: ["id"]
          },
        ]
      }
      pagamento: {
        Row: {
          ativo: boolean | null
          created_at: string | null
          data_pagamento: string | null
          data_vencimento: string | null
          deleted: boolean | null
          descricao: string | null
          id: number
          lead_id: number
          observacoes: string | null
          status_pagamento_id: number
          updated_at: string | null
          user_updated_at: number | null
          valor: number
        }
        Insert: {
          ativo?: boolean | null
          created_at?: string | null
          data_pagamento?: string | null
          data_vencimento?: string | null
          deleted?: boolean | null
          descricao?: string | null
          id?: number
          lead_id: number
          observacoes?: string | null
          status_pagamento_id: number
          updated_at?: string | null
          user_updated_at?: number | null
          valor: number
        }
        Update: {
          ativo?: boolean | null
          created_at?: string | null
          data_pagamento?: string | null
          data_vencimento?: string | null
          deleted?: boolean | null
          descricao?: string | null
          id?: number
          lead_id?: number
          observacoes?: string | null
          status_pagamento_id?: number
          updated_at?: string | null
          user_updated_at?: number | null
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_pagamento_lead"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "lead"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_pagamento_status"
            columns: ["status_pagamento_id"]
            isOneToOne: false
            referencedRelation: "status_pagamento"
            referencedColumns: ["id"]
          },
        ]
      }
      prontuario: {
        Row: {
          ativo: boolean | null
          created_at: string | null
          deleted: boolean | null
          descricao: string
          id: number
          lead_id: number
          observacoes: string | null
          protocolo: string
          titulo: string
          updated_at: string | null
          user_updated_at: number | null
        }
        Insert: {
          ativo?: boolean | null
          created_at?: string | null
          deleted?: boolean | null
          descricao: string
          id?: number
          lead_id: number
          observacoes?: string | null
          protocolo?: string
          titulo: string
          updated_at?: string | null
          user_updated_at?: number | null
        }
        Update: {
          ativo?: boolean | null
          created_at?: string | null
          deleted?: boolean | null
          descricao?: string
          id?: number
          lead_id?: number
          observacoes?: string | null
          protocolo?: string
          titulo?: string
          updated_at?: string | null
          user_updated_at?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_prontuario_lead"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "lead"
            referencedColumns: ["id"]
          },
        ]
      }
      status_agendamento: {
        Row: {
          ativo: boolean | null
          cor: string | null
          created_at: string | null
          descricao: string | null
          icone: string | null
          id: number
          nome: string
          ordem: number | null
          updated_at: string | null
        }
        Insert: {
          ativo?: boolean | null
          cor?: string | null
          created_at?: string | null
          descricao?: string | null
          icone?: string | null
          id?: number
          nome: string
          ordem?: number | null
          updated_at?: string | null
        }
        Update: {
          ativo?: boolean | null
          cor?: string | null
          created_at?: string | null
          descricao?: string | null
          icone?: string | null
          id?: number
          nome?: string
          ordem?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      status_chat: {
        Row: {
          ativo: boolean | null
          cor: string | null
          created_at: string | null
          descricao: string | null
          empresa_id: number | null
          icone: string | null
          id: number
          nome: string
          ordem: number | null
          updated_at: string | null
        }
        Insert: {
          ativo?: boolean | null
          cor?: string | null
          created_at?: string | null
          descricao?: string | null
          empresa_id?: number | null
          icone?: string | null
          id?: number
          nome: string
          ordem?: number | null
          updated_at?: string | null
        }
        Update: {
          ativo?: boolean | null
          cor?: string | null
          created_at?: string | null
          descricao?: string | null
          empresa_id?: number | null
          icone?: string | null
          id?: number
          nome?: string
          ordem?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_status_chat_empresa"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresa"
            referencedColumns: ["id"]
          },
        ]
      }
      status_lead: {
        Row: {
          ativo: boolean | null
          cor: string | null
          created_at: string | null
          descricao: string | null
          empresa_id: number | null
          icone: string | null
          id: number
          nome: string
          ordem: number | null
          updated_at: string | null
        }
        Insert: {
          ativo?: boolean | null
          cor?: string | null
          created_at?: string | null
          descricao?: string | null
          empresa_id?: number | null
          icone?: string | null
          id?: number
          nome: string
          ordem?: number | null
          updated_at?: string | null
        }
        Update: {
          ativo?: boolean | null
          cor?: string | null
          created_at?: string | null
          descricao?: string | null
          empresa_id?: number | null
          icone?: string | null
          id?: number
          nome?: string
          ordem?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_status_lead_empresa"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresa"
            referencedColumns: ["id"]
          },
        ]
      }
      status_mensagem: {
        Row: {
          ativo: boolean | null
          cor: string | null
          created_at: string | null
          descricao: string | null
          icone: string | null
          id: number
          nome: string
          ordem: number | null
          updated_at: string | null
        }
        Insert: {
          ativo?: boolean | null
          cor?: string | null
          created_at?: string | null
          descricao?: string | null
          icone?: string | null
          id?: number
          nome: string
          ordem?: number | null
          updated_at?: string | null
        }
        Update: {
          ativo?: boolean | null
          cor?: string | null
          created_at?: string | null
          descricao?: string | null
          icone?: string | null
          id?: number
          nome?: string
          ordem?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      status_pagamento: {
        Row: {
          ativo: boolean | null
          cor: string | null
          created_at: string | null
          descricao: string | null
          icone: string | null
          id: number
          nome: string
          ordem: number | null
          updated_at: string | null
        }
        Insert: {
          ativo?: boolean | null
          cor?: string | null
          created_at?: string | null
          descricao?: string | null
          icone?: string | null
          id?: number
          nome: string
          ordem?: number | null
          updated_at?: string | null
        }
        Update: {
          ativo?: boolean | null
          cor?: string | null
          created_at?: string | null
          descricao?: string | null
          icone?: string | null
          id?: number
          nome?: string
          ordem?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      status_tratamento: {
        Row: {
          ativo: boolean | null
          cor: string | null
          created_at: string | null
          descricao: string | null
          icone: string | null
          id: number
          nome: string
          ordem: number | null
          updated_at: string | null
        }
        Insert: {
          ativo?: boolean | null
          cor?: string | null
          created_at?: string | null
          descricao?: string | null
          icone?: string | null
          id?: number
          nome: string
          ordem?: number | null
          updated_at?: string | null
        }
        Update: {
          ativo?: boolean | null
          cor?: string | null
          created_at?: string | null
          descricao?: string | null
          icone?: string | null
          id?: number
          nome?: string
          ordem?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      tag: {
        Row: {
          ativo: boolean | null
          cor: string | null
          created_at: string | null
          descricao: string | null
          id: number
          nome: string
          updated_at: string | null
        }
        Insert: {
          ativo?: boolean | null
          cor?: string | null
          created_at?: string | null
          descricao?: string | null
          id?: number
          nome: string
          updated_at?: string | null
        }
        Update: {
          ativo?: boolean | null
          cor?: string | null
          created_at?: string | null
          descricao?: string | null
          id?: number
          nome?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      tipo_agente: {
        Row: {
          ativo: boolean | null
          cor: string | null
          created_at: string | null
          descricao: string | null
          icone: string | null
          id: number
          nome: string
          updated_at: string | null
        }
        Insert: {
          ativo?: boolean | null
          cor?: string | null
          created_at?: string | null
          descricao?: string | null
          icone?: string | null
          id?: number
          nome: string
          updated_at?: string | null
        }
        Update: {
          ativo?: boolean | null
          cor?: string | null
          created_at?: string | null
          descricao?: string | null
          icone?: string | null
          id?: number
          nome?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      tipo_mensagem: {
        Row: {
          ativo: boolean | null
          cor: string | null
          created_at: string | null
          descricao: string | null
          icone: string | null
          id: number
          nome: string
          ordem: number | null
          updated_at: string | null
        }
        Insert: {
          ativo?: boolean | null
          cor?: string | null
          created_at?: string | null
          descricao?: string | null
          icone?: string | null
          id?: number
          nome: string
          ordem?: number | null
          updated_at?: string | null
        }
        Update: {
          ativo?: boolean | null
          cor?: string | null
          created_at?: string | null
          descricao?: string | null
          icone?: string | null
          id?: number
          nome?: string
          ordem?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      tratamento: {
        Row: {
          ativo: boolean | null
          created_at: string | null
          data_fim: string | null
          data_inicio: string | null
          deleted: boolean | null
          descricao: string
          id: number
          lead_id: number
          observacoes: string | null
          status_tratamento_id: number
          titulo: string
          updated_at: string | null
          user_updated_at: number | null
          valor: number | null
        }
        Insert: {
          ativo?: boolean | null
          created_at?: string | null
          data_fim?: string | null
          data_inicio?: string | null
          deleted?: boolean | null
          descricao: string
          id?: number
          lead_id: number
          observacoes?: string | null
          status_tratamento_id: number
          titulo: string
          updated_at?: string | null
          user_updated_at?: number | null
          valor?: number | null
        }
        Update: {
          ativo?: boolean | null
          created_at?: string | null
          data_fim?: string | null
          data_inicio?: string | null
          deleted?: boolean | null
          descricao?: string
          id?: number
          lead_id?: number
          observacoes?: string | null
          status_tratamento_id?: number
          titulo?: string
          updated_at?: string | null
          user_updated_at?: number | null
          valor?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_tratamento_lead"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "lead"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_tratamento_status"
            columns: ["status_tratamento_id"]
            isOneToOne: false
            referencedRelation: "status_tratamento"
            referencedColumns: ["id"]
          },
        ]
      }
      usuario: {
        Row: {
          ativo: boolean | null
          created_at: string | null
          deleted: boolean | null
          email: string
          empresa_id: number
          id: number
          nivel_usuario_id: number
          nome: string
          senha: string
          telefone: string | null
          updated_at: string | null
          user_updated_at: number | null
        }
        Insert: {
          ativo?: boolean | null
          created_at?: string | null
          deleted?: boolean | null
          email: string
          empresa_id: number
          id?: number
          nivel_usuario_id: number
          nome: string
          senha: string
          telefone?: string | null
          updated_at?: string | null
          user_updated_at?: number | null
        }
        Update: {
          ativo?: boolean | null
          created_at?: string | null
          deleted?: boolean | null
          email?: string
          empresa_id?: number
          id?: number
          nivel_usuario_id?: number
          nome?: string
          senha?: string
          telefone?: string | null
          updated_at?: string | null
          user_updated_at?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_usuario_empresa"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresa"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_usuario_nivel"
            columns: ["nivel_usuario_id"]
            isOneToOne: false
            referencedRelation: "nivel_usuario"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
