export type Note = {
  id: string;
  user_id: string;
  title: string;
  content: string;
  created_at: string;
};

export type User = {
    id: string;
    email: string;
    // tambahkan properti lain jika ada
};

export type AuthState = {
    user: User | null;
    session: any | null; // Tipe session dari Supabase bisa lebih spesifik
    loading: boolean;
};