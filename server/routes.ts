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
      const { commandIds, scriptName = "exported_commands", exportType = "bash" } = req.body;
      
      if (!commandIds || !Array.isArray(commandIds) || commandIds.length === 0) {
        return res.status(400).json({ error: "Command IDs are required" });
      }

      const commands = await storage.getCommandsByIds(commandIds);
      
      if (commands.length === 0) {
        return res.status(404).json({ error: "No commands found" });
      }

      let content = "";
      let filename = "";
      let contentType = "text/plain";

      if (exportType === "aliases") {
        // Generate bash aliases
        content = `# Bash aliases generated from LinuxHelper\n`;
        content += `# Created on: ${new Date().toISOString()}\n`;
        content += `# Użycie: source ${scriptName}.alias\n\n`;
        
        commands.forEach((cmd, index) => {
          // Create safe alias name from command title
          const aliasName = cmd.title
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .replace(/\s+/g, '_')
            .substring(0, 30);
          
          content += `# ${cmd.title}\n`;
          content += `# ${cmd.description}\n`;
          content += `alias ${aliasName}='${cmd.command}'\n\n`;
        });
        
        content += `# Aby użyć aliasów, uruchom: source ${scriptName}.alias\n`;
        filename = `${scriptName}.alias`;
        
      } else if (exportType === "text") {
        // Generate plain text with commands only
        content = `Polecenia Linux - ${scriptName}\n`;
        content += `Wygenerowane: ${new Date().toISOString()}\n`;
        content += `Źródło: LinuxHelper\n\n`;
        
        commands.forEach((cmd, index) => {
          content += `${index + 1}. ${cmd.title}\n`;
          content += `   ${cmd.command}\n`;
          content += `   ${cmd.description}\n\n`;
        });
        
        filename = `${scriptName}.txt`;
        
      } else {
        // Generate bash script (default)
        content = `#!/bin/bash\n`;
        content += `# Generated bash script: ${scriptName}\n`;
        content += `# Created on: ${new Date().toISOString()}\n`;
        content += `# LinuxHelper - Eksporter poleceń Linux\n\n`;
        
        content += `echo "=== ${scriptName.toUpperCase()} ==="\n`;
        content += `echo "Eksportowane polecenia Linux z LinuxHelper"\n`;
        content += `echo "Data: $(date)"\n`;
        content += `echo ""\n\n`;

        commands.forEach((cmd, index) => {
          content += `# ${index + 1}. ${cmd.title}\n`;
          content += `# ${cmd.description}\n`;
          content += `# Kategoria: ${cmd.category}\n`;
          content += `echo "Polecenie ${index + 1}: ${cmd.title}"\n`;
          content += `echo "Opis: ${cmd.description}"\n`;
          content += `echo "Polecenie: ${cmd.command}"\n`;
          
          // Add command as comment for safety - user can uncomment to execute
          content += `# ${cmd.command}\n`;
          content += `echo ""\n\n`;
        });

        content += `echo "=== KONIEC SKRYPTU ==="\n`;
        content += `echo "Uwaga: Polecenia są zakomentowane dla bezpieczeństwa."\n`;
        content += `echo "Usuń # przed poleceniem aby je wykonać."\n`;
        
        filename = `${scriptName}.sh`;
      }

      res.setHeader('Content-Type', contentType);
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      res.send(content);
    } catch (error) {
      console.error("Error exporting commands:", error);
      res.status(500).json({ error: "Failed to export commands" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
