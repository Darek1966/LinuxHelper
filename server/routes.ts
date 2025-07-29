import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

const searchQuerySchema = z.object({
  query: z.string().optional(),
  category: z.string().optional(),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Search commands
  app.get("/api/commands/search", async (req, res) => {
    try {
      const { query, category } = searchQuerySchema.parse(req.query);
      const commands = await storage.searchCommands(query, category);
      res.json(commands);
    } catch (error) {
      res.status(400).json({ message: "Invalid search parameters" });
    }
  });

  // Get all commands
  app.get("/api/commands", async (req, res) => {
    try {
      const commands = await storage.getAllCommands();
      res.json(commands);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch commands" });
    }
  });

  // Get commands by category
  app.get("/api/commands/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const commands = await storage.getCommandsByCategory(category);
      res.json(commands);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch commands by category" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
