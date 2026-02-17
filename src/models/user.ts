export interface User {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  image: string | null;
  provider: string | null;
  created_at: string;
  updated_at: string;
}