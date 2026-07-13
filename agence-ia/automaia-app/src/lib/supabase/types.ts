// Types générés à la main à partir de supabase/migrations/0001_schema.sql.
// À remplacer par `supabase gen types typescript` une fois le projet Supabase connecté.

export type StudioPlan = "trial" | "studio_automatizzato" | "studio_360";
export type StudioPlanStatus = "trial" | "active" | "past_due" | "canceled";
export type UserRole = "owner" | "member";
export type ContactStage = "contatto" | "contattato" | "proposta" | "cliente";
export type TaskStatus = "da_fare" | "in_corso" | "completata";
export type ContentPlatform = "linkedin" | "instagram" | "facebook" | "tiktok";
export type ContentStatus = "draft" | "approved" | "published";
export type EmailDraftStatus = "pending" | "validated" | "sent";
export type AutomationType =
  | "appuntamenti"
  | "solleciti"
  | "faq"
  | "pubblicazione_social"
  | "modulo_contatto";

export interface Database {
  public: {
    Tables: {
      studios: {
        Row: {
          id: string;
          name: string;
          plan: StudioPlan;
          plan_status: StudioPlanStatus;
          stripe_customer_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          plan?: StudioPlan;
          plan_status?: StudioPlanStatus;
          stripe_customer_id?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["studios"]["Insert"]>;
        Relationships: [];
      };
      users: {
        Row: {
          id: string;
          studio_id: string;
          full_name: string | null;
          role: UserRole;
          created_at: string;
        };
        Insert: {
          id: string;
          studio_id: string;
          full_name?: string | null;
          role?: UserRole;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["users"]["Insert"]>;
        Relationships: [];
      };
      contacts: {
        Row: {
          id: string;
          studio_id: string;
          full_name: string;
          email: string | null;
          phone: string | null;
          stage: ContactStage;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          studio_id: string;
          full_name: string;
          email?: string | null;
          phone?: string | null;
          stage?: ContactStage;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["contacts"]["Insert"]>;
        Relationships: [];
      };
      tasks: {
        Row: {
          id: string;
          studio_id: string;
          title: string;
          description: string | null;
          status: TaskStatus;
          assigned_to: string | null;
          due_date: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          studio_id: string;
          title: string;
          description?: string | null;
          status?: TaskStatus;
          assigned_to?: string | null;
          due_date?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["tasks"]["Insert"]>;
        Relationships: [];
      };
      task_templates: {
        Row: {
          id: string;
          studio_id: string;
          title: string;
          description: string | null;
          default_status: TaskStatus;
        };
        Insert: {
          id?: string;
          studio_id: string;
          title: string;
          description?: string | null;
          default_status?: TaskStatus;
        };
        Update: Partial<Database["public"]["Tables"]["task_templates"]["Insert"]>;
        Relationships: [];
      };
      content_items: {
        Row: {
          id: string;
          studio_id: string;
          topic: string;
          platform: ContentPlatform;
          body: string | null;
          status: ContentStatus;
          created_at: string;
        };
        Insert: {
          id?: string;
          studio_id: string;
          topic: string;
          platform: ContentPlatform;
          body?: string | null;
          status?: ContentStatus;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["content_items"]["Insert"]>;
        Relationships: [];
      };
      email_drafts: {
        Row: {
          id: string;
          studio_id: string;
          sender_email: string | null;
          subject: string | null;
          received_email: string | null;
          generated_draft: string | null;
          status: EmailDraftStatus;
          created_at: string;
        };
        Insert: {
          id?: string;
          studio_id: string;
          sender_email?: string | null;
          subject?: string | null;
          received_email?: string | null;
          generated_draft?: string | null;
          status?: EmailDraftStatus;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["email_drafts"]["Insert"]>;
        Relationships: [];
      };
      automations: {
        Row: {
          id: string;
          studio_id: string;
          type: AutomationType;
          n8n_webhook_url: string | null;
          is_active: boolean;
          last_run_at: string | null;
          last_run_status: string | null;
        };
        Insert: {
          id?: string;
          studio_id: string;
          type: AutomationType;
          n8n_webhook_url?: string | null;
          is_active?: boolean;
          last_run_at?: string | null;
          last_run_status?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["automations"]["Insert"]>;
        Relationships: [];
      };
      webhook_tokens: {
        Row: {
          id: string;
          studio_id: string;
          token: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          studio_id: string;
          token: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["webhook_tokens"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
