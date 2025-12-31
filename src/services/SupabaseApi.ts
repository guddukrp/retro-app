// src/SupabaseApi.ts
import { createClient } from "@supabase/supabase-js";
import { supabase } from "./supabaseClient";

export type RetroItem = {
  id: string;
  created_at: string;
  category: string;
  content: string;
  author?: string;
};

// Fetch all items
export async function fetchRetroItems(): Promise<RetroItem[]> {
  const { data, error } = await supabase
    .from("retro")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching items:", error);
    return [];
  }
  return data || [];
}

// Add new item
export async function addRetroItem(content: string, category: string): Promise<boolean> {
  const { error } = await supabase.from("retro").insert([{ content, category }]);
  if (error) {
    console.error("Error adding item:", error);
    return false;
  }
  return true;
}
