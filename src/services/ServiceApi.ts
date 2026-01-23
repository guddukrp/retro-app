// d:\retro-app\src\services\ServiceApi.ts
import { TableTypes } from "../common/constant";


export interface ServiceApi {
  /**
   * Fetch all retro items.
   */
  getAll(): Promise<TableTypes<'retro'>[]>;

  /**
   * Add a new retro item.
   */
  add(content: string, category: string): Promise<boolean>;

  /**
   * Update an existing item.
   */
  update(id: string, updates: Partial<TableTypes<'retro'>>): Promise<boolean>;

  /**
   * Delete an item by ID.
   */
  delete(id: string): Promise<boolean>;

  /**
   * Get user by ID.
   */
  getUser(id: string): Promise<TableTypes<'user'> | null>;

  /**
   * Create a new user.
   */
  createUser(user: Partial<TableTypes<'user'>>): Promise<TableTypes<'user'> | null>;

  /**
   * Update a user.
   */
  updateUser(id: string, user: Partial<TableTypes<'user'>>): Promise<TableTypes<'user'> | null>;

  /**
   * Delete a user.
   */
  deleteUser(id: string): Promise<boolean>;
}
