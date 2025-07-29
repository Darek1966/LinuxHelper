import { type User, type InsertUser, type Command, commands, users } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  searchCommands(query: string, category?: string): Promise<Command[]>;
  getCommandsByCategory(category: string): Promise<Command[]>;
  getCommandsByIds(ids: string[]): Promise<Command[]>;
  getAllCommands(): Promise<Command[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async searchCommands(query: string, category?: string): Promise<Command[]> {
    let dbQuery = db.select().from(commands);
    
    if (category && category !== 'all') {
      dbQuery = dbQuery.where(eq(commands.category, category));
    }
    
    const allCommands = await dbQuery;

    if (!query) {
      return allCommands;
    }

    // Filter by search query - all terms must match
    const searchTerms = query.toLowerCase().split(' ')
      .filter(term => term.length > 2)
      .filter(term => !['the', 'and', 'lub', 'oraz', 'albo', 'dla', 'przez', 'jak', 'czy', 'które', 'która', 'ktore', 'polecenie', 'polecenia', 'command', 'commands'].includes(term));
    
    if (searchTerms.length === 0) {
      return []; // If no meaningful search terms, return empty array
    }
    
    const filteredCommands = allCommands.filter(cmd => {
      const searchableText = [
        cmd.title,
        cmd.description,
        cmd.explanation,
        cmd.command,
        ...cmd.keywords
      ].join(' ').toLowerCase();

      // All search terms must be found in the searchable text
      return searchTerms.every(term => searchableText.includes(term));
    });

    return filteredCommands;
  }

  async getCommandsByCategory(category: string): Promise<Command[]> {
    if (category === 'all') {
      return await db.select().from(commands);
    }
    return await db.select().from(commands).where(eq(commands.category, category));
  }

  async getCommandsByIds(ids: string[]): Promise<Command[]> {
    if (ids.length === 0) {
      return [];
    }
    
    const allCommands = await db.select().from(commands);
    return allCommands.filter(cmd => ids.includes(cmd.id));
  }

  async getAllCommands(): Promise<Command[]> {
    return await db.select().from(commands);
  }
}

export const storage = new DatabaseStorage();