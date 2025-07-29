import { useState } from "react";
import { Copy, Bookmark, Folder, Cpu, Network, Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { Command } from "@shared/schema";

interface CommandResultCardProps {
  command: Command;
}

const categoryIcons = {
  files: Folder,
  processes: Cpu,
  network: Network,
  system: Settings,
};

const categoryColors = {
  files: "bg-green-100 text-green-600",
  processes: "bg-blue-100 text-blue-600",
  network: "bg-purple-100 text-purple-600",
  system: "bg-orange-100 text-orange-600",
};

export function CommandResultCard({ command }: CommandResultCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { toast } = useToast();
  
  const Icon = categoryIcons[command.category as keyof typeof categoryIcons] || Settings;
  const colorClass = categoryColors[command.category as keyof typeof categoryColors] || "bg-gray-100 text-gray-600";

  const handleCopyCommand = async () => {
    try {
      await navigator.clipboard.writeText(command.command);
      toast({
        title: "Skopiowano!",
        description: "Polecenie zostało skopiowane do schowka.",
      });
    } catch (error) {
      toast({
        title: "Błąd",
        description: "Nie udało się skopiować polecenia.",
        variant: "destructive",
      });
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Usunięto z zakładek" : "Dodano do zakładek",
      description: isBookmarked ? "Polecenie zostało usunięte z zakładek." : "Polecenie zostało dodane do zakładek.",
    });
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      files: "Pliki",
      processes: "Procesy", 
      network: "Sieć",
      system: "System"
    };
    return labels[category as keyof typeof labels] || category;
  };

  return (
    <Card className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden hover:shadow-md transition-shadow animate-fade-in">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colorClass}`}>
              <Icon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{command.title}</h3>
              <span className="text-sm text-muted-foreground bg-secondary px-2 py-1 rounded">
                {getCategoryLabel(command.category)}
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBookmark}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </Button>
        </div>
        
        {/* Command Display */}
        <div className="bg-slate-900 rounded-xl p-4 mb-4 relative group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-green-400 text-sm font-mono">$</span>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopyCommand}
              className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-700 hover:bg-slate-600 text-white border-none"
            >
              <Copy className="w-3 h-3 mr-1" />
              Kopiuj
            </Button>
          </div>
          <code className="text-white font-mono text-lg block break-all">
            {command.command}
          </code>
        </div>

        {/* Explanation */}
        <div className="mb-4">
          <h4 className="font-medium text-foreground mb-2">Wyjaśnienie:</h4>
          <p className="text-muted-foreground leading-relaxed">
            {command.explanation}
          </p>
        </div>

        {/* Parameters breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {command.parameters.map((param, index) => (
            <div key={index} className="bg-secondary rounded-lg p-3">
              <code className="font-mono text-sm font-semibold text-green-600 block mb-1">
                {param.flag}
              </code>
              <p className="text-xs text-muted-foreground">
                {param.description}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
