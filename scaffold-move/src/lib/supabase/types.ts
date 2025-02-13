export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      audits: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string
          contract_address: string
          contract_name: string
          chain_id: number
          status: 'pending' | 'in_progress' | 'completed' | 'failed'
          security_score: number
          report_url: string | null
          findings: Json[]
          gas_optimizations: Json[]
          test_cases: Json[]
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id: string
          contract_address: string
          contract_name: string
          chain_id: number
          status?: 'pending' | 'in_progress' | 'completed' | 'failed'
          security_score?: number
          report_url?: string | null
          findings?: Json[]
          gas_optimizations?: Json[]
          test_cases?: Json[]
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string
          contract_address?: string
          contract_name?: string
          chain_id?: number
          status?: 'pending' | 'in_progress' | 'completed' | 'failed'
          security_score?: number
          report_url?: string | null
          findings?: Json[]
          gas_optimizations?: Json[]
          test_cases?: Json[]
        }
      }
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          wallet_address: string
          username: string
          avatar_url: string | null
          total_audits: number
          reputation_score: number
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          wallet_address: string
          username: string
          avatar_url?: string | null
          total_audits?: number
          reputation_score?: number
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          wallet_address?: string
          username?: string
          avatar_url?: string | null
          total_audits?: number
          reputation_score?: number
        }
      }
      audit_comments: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          audit_id: string
          user_id: string
          content: string
          line_number: number | null
          severity: 'low' | 'medium' | 'high' | 'critical' | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          audit_id: string
          user_id: string
          content: string
          line_number?: number | null
          severity?: 'low' | 'medium' | 'high' | 'critical' | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          audit_id?: string
          user_id?: string
          content?: string
          line_number?: number | null
          severity?: 'low' | 'medium' | 'high' | 'critical' | null
        }
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
  }
}
