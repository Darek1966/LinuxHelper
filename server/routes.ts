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
      const commands = await storage.searchCommands(query || "", category);
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

  // Export commands to bash script
  app.post("/api/commands/export", async (req, res) => {
    try {
      const { commandIds, scriptName = "exported_commands" } = req.body;
      
      if (!commandIds || !Array.isArray(commandIds) || commandIds.length === 0) {
        return res.status(400).json({ error: "Command IDs are required" });
      }

      const commands = await storage.getCommandsByIds(commandIds);
      
      if (commands.length === 0) {
        return res.status(404).json({ error: "No commands found" });
      }

      // Generate bash script content
      let bashScript = `#!/bin/bash\n`;
      bashScript += `# Generated bash script: ${scriptName}\n`;
      bashScript += `# Created on: ${new Date().toISOString()}\n`;
      bashScript += `# LinuxHelper - Eksporter poleceń Linux\n\n`;
      
      bashScript += `echo "=== ${scriptName.toUpperCase()} ==="\n`;
      bashScript += `echo "Eksportowane polecenia Linux z LinuxHelper"\n`;
      bashScript += `echo "Data: $(date)"\n`;
      bashScript += `echo ""\n\n`;

      commands.forEach((cmd, index) => {
        bashScript += `# ${index + 1}. ${cmd.title}\n`;
        bashScript += `# ${cmd.description}\n`;
        bashScript += `# Kategoria: ${cmd.category}\n`;
        bashScript += `echo "Polecenie ${index + 1}: ${cmd.title}"\n`;
        bashScript += `echo "Opis: ${cmd.description}"\n`;
        bashScript += `echo "Polecenie: ${cmd.command}"\n`;
        
        // Add command as comment for safety - user can uncomment to execute
        bashScript += `# ${cmd.command}\n`;
        bashScript += `echo ""\n\n`;
      });

      bashScript += `echo "=== KONIEC SKRYPTU ==="\n`;
      bashScript += `echo "Uwaga: Polecenia są zakomentowane dla bezpieczeństwa."\n`;
      bashScript += `echo "Usuń # przed poleceniem aby je wykonać."\n`;

      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Disposition', `attachment; filename="${scriptName}.sh"`);
      res.send(bashScript);
    } catch (error) {
      console.error("Error exporting commands:", error);
      res.status(500).json({ error: "Failed to export commands" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
