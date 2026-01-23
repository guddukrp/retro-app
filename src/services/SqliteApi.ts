// d:\retro-app\src\services\SqliteApi.ts

import { TableTypes } from "../common/constant";
import { ServiceApi } from "./ServiceApi";

export class SqliteApi implements ServiceApi {
  // --- OFFLINE IMPLEMENTATION ---

  async getAll(): Promise<TableTypes<'retro'>[]> {
    console.log("SqliteApi: Fetching items from local SQLite database...");
    // Placeholder: const result = await db.query("SELECT * FROM retro ORDER BY created_at DESC");
    // return result.values as Tables<'retro'>[];
    return [];
  }

  async add(content: string, category: string): Promise<boolean> {
    console.log("SqliteApi: Adding item to local SQLite database...");
    // Placeholder: await db.run("INSERT INTO retro (content, category, created_at) VALUES (?, ?, ?)", [content, category, new Date().toISOString()]);
    return true;
  }

  async update(id: string, updates: Partial<TableTypes<'retro'>>): Promise<boolean> {
    console.log(`SqliteApi: Updating item ${id} in local SQLite database...`, updates);
    // Placeholder: Construct UPDATE query dynamically based on 'updates' keys
    return true;
  }

  async delete(id: string): Promise<boolean> {
    console.log(`SqliteApi: Deleting item ${id} from local SQLite database...`);
    // Placeholder: await db.run("DELETE FROM retro WHERE id = ?", [id]);
    return true;
  }

  async getUser(id: string): Promise<TableTypes<'user'> | null> {
    console.log(`SqliteApi: Fetching user ${id} from local SQLite database...`);
    return null;
  }

  async createUser(user: Partial<TableTypes<'user'>>): Promise<TableTypes<'user'> | null> {
    console.log("SqliteApi: Creating user in local SQLite database...", user);
    return null;
  }

  async updateUser(id: string, user: Partial<TableTypes<'user'>>): Promise<TableTypes<'user'> | null> {
    console.log(`SqliteApi: Updating user ${id} in local SQLite database...`, user);
    return null;
  }

  async deleteUser(id: string): Promise<boolean> {
    console.log(`SqliteApi: Deleting user ${id} from local SQLite database...`);
    return true;
  }
}
