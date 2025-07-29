import { sql } from "drizzle-orm";
import { pgTable, text, varchar, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const commands = pgTable("commands", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  command: text("command").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  explanation: text("explanation").notNull(),
  parameters: json("parameters").$type<CommandParameter[]>().notNull(),
  keywords: json("keywords").$type<string[]>().notNull(),
});

export interface CommandParameter {
  flag: string;
  description: string;
}

export const insertCommandSchema = createInsertSchema(commands).omit({
  id: true,
});

export type InsertCommand = z.infer<typeof insertCommandSchema>;
export type Command = typeof commands.$inferSelect;

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
