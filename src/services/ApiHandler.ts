import { TableTypes } from "../common/constant";
import { ServiceApi } from "./ServiceApi";
import { SqliteApi } from "./SqliteApi";
import { SupabaseApi } from "./SupabaseApi";

export class ApiHandler {
  private strategy: ServiceApi;
  private isOnline: boolean;

  constructor(initialOnlineState: boolean = true) {
    this.isOnline = initialOnlineState;
    // Initialize strategy based on default state
    this.strategy = this.isOnline ? new SupabaseApi() : new SqliteApi();
  }

  /**
   * Switches the underlying data source strategy based on connectivity.
   * @param isOnline boolean indicating network status
   */
  public setOnlineStatus(isOnline: boolean): void {
    if (this.isOnline === isOnline) return;

    this.isOnline = isOnline;
    this.strategy = isOnline ? new SupabaseApi() : new SqliteApi();
    console.log(`ApiHandler: Switched to ${isOnline ? 'ONLINE (Supabase)' : 'OFFLINE (SQLite)'} mode.`);
  }

  // --- Facade Methods delegating to the active strategy ---

  public async getAll(): Promise<TableTypes<'retro'>[]> {
    return this.strategy.getAll();
  }

  public async add(content: string, category: string): Promise<boolean> {
    return this.strategy.add(content, category);
  }

  public async update(id: string, updates: Partial<TableTypes<'retro'>>): Promise<boolean> {
    return this.strategy.update(id, updates);
  }

  public async delete(id: string): Promise<boolean> {
    return this.strategy.delete(id);
  }

  public async getUser(id: string): Promise<TableTypes<'user'> | null> {
    return this.strategy.getUser(id);
  }

  public async createUser(user: Partial<TableTypes<'user'>>): Promise<TableTypes<'user'> | null> {
    return this.strategy.createUser(user);
  }

  public async updateUser(id: string, user: Partial<TableTypes<'user'>>): Promise<TableTypes<'user'> | null> {
    return this.strategy.updateUser(id, user);
  }

  public async deleteUser(id: string): Promise<boolean> {
    return this.strategy.deleteUser(id);
  }
}

// Export a singleton instance for simplicity
export const apiHandler = new ApiHandler();
