export type LanguageCode =
  | "en"
  | "hi"
  | "ta"
  | "te"
  | "bn"
  | "mr"
  | "kn"
  | "gu"
  | "ml"
  | "pa"
  | "ur";

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
  statusCode?: number;
}

export type UserProfile = {
  id: string;
  fullName: string | null;
  email: string | null;
  avatarUrl: string | null;
  preferredLanguage: LanguageCode;
  createdAt?: string;
};

export type Confidence = "High" | "Medium" | "Needs verification";
