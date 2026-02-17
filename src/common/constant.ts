import { Retro } from "../models/retro";
import { User } from "../models/user";

export const PAGES = {
  HOME: "/home",
  LOGIN: "/login",
};

type TableMap = {
  retro: Retro;
  user: User;
};

export type TableTypes<T extends keyof TableMap> = TableMap[T];