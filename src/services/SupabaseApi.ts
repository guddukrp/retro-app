import { TableTypes } from "../common/constant";
import { ServiceApi } from "./ServiceApi";
import { supabase } from "./supabaseClient";

export class SupabaseApi implements ServiceApi {
  // --- ONLINE IMPLEMENTATION ---

  async getAll(): Promise<TableTypes<'retro'>[]> {
    const { data, error } = await supabase
      .from("retro")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("SupabaseApi: Error fetching items:", error);
      return [];
    }
    return data || [];
  }

  async add(content: string, category: string): Promise<boolean> {
    const { error } = await supabase.from("retro").insert([{ content, category }]);
    if (error) {
      console.error("SupabaseApi: Error adding item:", error);
      return false;
    }
    return true;
  }

  async update(id: string, updates: Partial<TableTypes<'retro'>>): Promise<boolean> {
    const { error } = await supabase.from("retro").update(updates).eq("id", id);
    if (error) {
      console.error("SupabaseApi: Error updating item:", error);
      return false;
    }
    return true;
  }

  async delete(id: string): Promise<boolean> {
    const { error } = await supabase.from("retro").delete().eq("id", id);
    if (error) {
      console.error("SupabaseApi: Error deleting item:", error);
      return false;
    }
    return true;
  }

  async getUser(id: string): Promise<TableTypes<'user'> | null> {
    const { data, error } = await supabase
      .from("user")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("SupabaseApi: Error fetching user:", error);
      return null;
    }
    return data;
  }

  async createUser(user: Partial<TableTypes<'user'>>): Promise<TableTypes<'user'> | null> {
    const { data, error } = await supabase.from("user").insert(user as any).select().single();
    if (error) {
      console.error("SupabaseApi: Error creating user:", error);
      return null;
    }
    return data;
  }

  async updateUser(id: string, user: Partial<TableTypes<'user'>>): Promise<TableTypes<'user'> | null> {
    const { data, error } = await supabase.from("user").update(user as any).eq("id", id).select().single();
    if (error) {
      console.error("SupabaseApi: Error updating user:", error);
      return null;
    }
    return data;
  }

  async deleteUser(id: string): Promise<boolean> {
    const { error } = await supabase.from("user").delete().eq("id", id);
    if (error) {
      console.error("SupabaseApi: Error deleting user:", error);
      return false;
    }
    return true;
  }
}
