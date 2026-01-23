import { Constants, Database } from "../services/database";

export const PAGES = {
  HOME: "/home",
  LOGIN: "/login",
};

export type TableTypes<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

export type EnumType<K extends keyof (typeof Constants)["public"]["Enums"]> =
  (typeof Constants)["public"]["Enums"][K][number];