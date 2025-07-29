import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Download, FileCode, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Command } from "@shared/schema";

interface ExportDialogProps {
  commands: Command[];
  searchQuery: string;
}

export function ExportDialog({ commands, searchQuery }: ExportDialogProps) {
  const [selectedCommands, setSelectedCommands] = useState<string[]>([]);
  const [scriptName, setScriptName] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCommands(commands.map(cmd => cmd.id));
    } else {
      setSelectedCommands([]);
    }
  };

  const handleSelectCommand = (commandId: string, checked: boolean) => {
    if (checked) {
      setSelectedCommands(prev => [...prev, commandId]);
    } else {
      setSelectedCommands(prev => prev.filter(id => id !== commandId));
    }
  };

  const handleExport = async () => {
    if (selectedCommands.length === 0) {
      toast({
        title: "Błąd",
        description: "Wybierz przynajmniej jedno polecenie do eksportu",
        variant: "destructive",
      });
      return;
    }

    const finalScriptName = scriptName.trim() || `linuxhelper_commands_${Date.now()}`;
    
    setIsExporting(true);
    try {
      const response = await fetch("/api/commands/export", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          commandIds: selectedCommands,
          scriptName: finalScriptName,
        }),
      });

      if (!response.ok) {
        throw new Error("Błąd eksportu");
      }

      // Create download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${finalScriptName}.sh`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({
        title: "Sukces!",
        description: `Eksportowano ${selectedCommands.length} poleceń do pliku ${finalScriptName}.sh`,
      });

      setIsOpen(false);
      setSelectedCommands([]);
      setScriptName("");
    } catch (error) {
      toast({
        title: "Błąd eksportu",
        description: "Nie udało się wyeksportować poleceń",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  // Set default script name when dialog opens
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open && !scriptName) {
      const defaultName = searchQuery ? 
        `polecenia_${searchQuery.replace(/\s+/g, "_").toLowerCase()}` : 
        "linuxhelper_commands";
      setScriptName(defaultName);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Eksportuj do skryptu
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileCode className="h-5 w-5" />
            Eksport poleceń do skryptu bash
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="scriptName">Nazwa skryptu</Label>
            <Input
              id="scriptName"
              value={scriptName}
              onChange={(e) => setScriptName(e.target.value)}
              placeholder="nazwa_skryptu"
            />
            <p className="text-sm text-muted-foreground">
              Plik zostanie zapisany jako {scriptName || "nazwa_skryptu"}.sh
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Wybierz polecenia ({selectedCommands.length}/{commands.length})</Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="selectAll"
                  checked={selectedCommands.length === commands.length}
                  onCheckedChange={handleSelectAll}
                />
                <Label htmlFor="selectAll" className="text-sm">
                  Zaznacz wszystkie
                </Label>
              </div>
            </div>
            
            <div className="border rounded-md p-3 max-h-60 overflow-y-auto space-y-2">
              {commands.map((command) => (
                <div key={command.id} className="flex items-start space-x-2">
                  <Checkbox
                    id={command.id}
                    checked={selectedCommands.includes(command.id)}
                    onCheckedChange={(checked) => handleSelectCommand(command.id, checked as boolean)}
                  />
                  <div className="flex-1 min-w-0">
                    <Label 
                      htmlFor={command.id} 
                      className="text-sm font-medium cursor-pointer block"
                    >
                      {command.title}
                    </Label>
                    <p className="text-xs text-muted-foreground truncate">
                      {command.command}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-muted p-3 rounded-md">
            <p className="text-sm text-muted-foreground">
              <strong>Uwaga:</strong> Eksportowane polecenia będą zakomentowane w skrypcie dla bezpieczeństwa. 
              Usuń znak # przed poleceniem aby je wykonać.
            </p>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Anuluj
            </Button>
            <Button onClick={handleExport} disabled={isExporting || selectedCommands.length === 0}>
              {isExporting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Eksportowanie...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Eksportuj ({selectedCommands.length})
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}