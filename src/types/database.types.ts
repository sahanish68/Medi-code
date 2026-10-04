export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          email: string | null;
          avatar_url: string | null;
          preferred_language: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          email?: string | null;
          avatar_url?: string | null;
          preferred_language?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          email?: string | null;
          avatar_url?: string | null;
          preferred_language?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      prescriptions: {
        Row: {
          id: string;
          user_id: string;
          file_path: string;
          file_type: string | null;
          original_file_name: string | null;
          status: "uploaded" | "processing" | "completed" | "failed" | "needs_verification";
          doctor_name: string | null;
          prescription_date: string | null;
          diagnosis: string | null;
          summary: string | null;
          raw_ocr_text: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          file_path: string;
          file_type?: string | null;
          original_file_name?: string | null;
          status?: "uploaded" | "processing" | "completed" | "failed" | "needs_verification";
          doctor_name?: string | null;
          prescription_date?: string | null;
          diagnosis?: string | null;
          summary?: string | null;
          raw_ocr_text?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          file_path?: string;
          file_type?: string | null;
          original_file_name?: string | null;
          status?: "uploaded" | "processing" | "completed" | "failed" | "needs_verification";
          doctor_name?: string | null;
          prescription_date?: string | null;
          diagnosis?: string | null;
          summary?: string | null;
          raw_ocr_text?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "prescriptions_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      medicines: {
        Row: {
          id: string;
          prescription_id: string;
          user_id: string;
          name: string;
          normalized_name: string | null;
          strength: string | null;
          dosage: string | null;
          frequency: string | null;
          duration: string | null;
          timing: string | null;
          route: string | null;
          instructions: string | null;
          ingredients: Json;
          uses: string | null;
          side_effects: Json;
          warnings: Json;
          confidence_score: number | null;
          needs_verification: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          prescription_id: string;
          user_id: string;
          name: string;
          normalized_name?: string | null;
          strength?: string | null;
          dosage?: string | null;
          frequency?: string | null;
          duration?: string | null;
          timing?: string | null;
          route?: string | null;
          instructions?: string | null;
          ingredients?: Json;
          uses?: string | null;
          side_effects?: Json;
          warnings?: Json;
          confidence_score?: number | null;
          needs_verification?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          prescription_id?: string;
          user_id?: string;
          name?: string;
          normalized_name?: string | null;
          strength?: string | null;
          dosage?: string | null;
          frequency?: string | null;
          duration?: string | null;
          timing?: string | null;
          route?: string | null;
          instructions?: string | null;
          ingredients?: Json;
          uses?: string | null;
          side_effects?: Json;
          warnings?: Json;
          confidence_score?: number | null;
          needs_verification?: boolean;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "medicines_prescription_id_fkey";
            columns: ["prescription_id"];
            isOneToOne: false;
            referencedRelation: "prescriptions";
            referencedColumns: ["id"];
          }
        ];
      };
      medication_schedules: {
        Row: {
          id: string;
          medicine_id: string;
          user_id: string;
          start_date: string;
          end_date: string | null;
          schedule_type: string;
          times: Json;
          food_instruction: string | null;
          enabled: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          medicine_id: string;
          user_id: string;
          start_date: string;
          end_date?: string | null;
          schedule_type: string;
          times?: Json;
          food_instruction?: string | null;
          enabled?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          medicine_id?: string;
          user_id?: string;
          start_date?: string;
          end_date?: string | null;
          schedule_type?: string;
          times?: Json;
          food_instruction?: string | null;
          enabled?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "medication_schedules_medicine_id_fkey";
            columns: ["medicine_id"];
            isOneToOne: false;
            referencedRelation: "medicines";
            referencedColumns: ["id"];
          }
        ];
      };
      reminders: {
        Row: {
          id: string;
          user_id: string;
          medicine_id: string;
          schedule_id: string | null;
          title: string;
          reminder_time: string;
          days: Json;
          start_date: string | null;
          end_date: string | null;
          enabled: boolean;
          notification_type: "browser" | "push" | "email" | "whatsapp";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          medicine_id: string;
          schedule_id?: string | null;
          title: string;
          reminder_time: string;
          days?: Json;
          start_date?: string | null;
          end_date?: string | null;
          enabled?: boolean;
          notification_type?: "browser" | "push" | "email" | "whatsapp";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          medicine_id?: string;
          schedule_id?: string | null;
          title?: string;
          reminder_time?: string;
          days?: Json;
          start_date?: string | null;
          end_date?: string | null;
          enabled?: boolean;
          notification_type?: "browser" | "push" | "email" | "whatsapp";
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "reminders_medicine_id_fkey";
            columns: ["medicine_id"];
            isOneToOne: false;
            referencedRelation: "medicines";
            referencedColumns: ["id"];
          }
        ];
      };
      medicine_alternatives: {
        Row: {
          id: string;
          medicine_id: string;
          alternative_name: string;
          active_ingredient: string | null;
          strength: string | null;
          dosage_form: string | null;
          manufacturer: string | null;
          source: string | null;
          confidence_score: number | null;
          verification_required: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          medicine_id: string;
          alternative_name: string;
          active_ingredient?: string | null;
          strength?: string | null;
          dosage_form?: string | null;
          manufacturer?: string | null;
          source?: string | null;
          confidence_score?: number | null;
          verification_required?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          medicine_id?: string;
          alternative_name?: string;
          active_ingredient?: string | null;
          strength?: string | null;
          dosage_form?: string | null;
          manufacturer?: string | null;
          source?: string | null;
          confidence_score?: number | null;
          verification_required?: boolean;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "medicine_alternatives_medicine_id_fkey";
            columns: ["medicine_id"];
            isOneToOne: false;
            referencedRelation: "medicines";
            referencedColumns: ["id"];
          }
        ];
      };
      healthcare_facilities: {
        Row: {
          id: string;
          name: string;
          facility_type: "pharmacy" | "hospital" | "clinic" | "medical_centre";
          ownership_type: "government" | "private" | "unknown";
          address: string | null;
          latitude: number | null;
          longitude: number | null;
          phone: string | null;
          source: string | null;
          external_place_id: string | null;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          facility_type: "pharmacy" | "hospital" | "clinic" | "medical_centre";
          ownership_type?: "government" | "private" | "unknown";
          address?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          phone?: string | null;
          source?: string | null;
          external_place_id?: string | null;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          facility_type?: "pharmacy" | "hospital" | "clinic" | "medical_centre";
          ownership_type?: "government" | "private" | "unknown";
          address?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          phone?: string | null;
          source?: string | null;
          external_place_id?: string | null;
          created_at?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
    };
  };
}
