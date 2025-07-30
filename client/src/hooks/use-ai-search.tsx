
import { useState } from "react";
import { useToast } from "./use-toast";

interface AISearchResult {
  suggestedCommands: string[];
  explanation: string;
  confidence: number;
}

export function useAISearch() {
  const [isAILoading, setIsAILoading] = useState(false);
  const { toast } = useToast();

  const searchWithAI = async (query: string): Promise<AISearchResult | null> => {
    if (!query.trim()) return null;

    setIsAILoading(true);
    
    try {
      const response = await fetch('/api/ai/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error('AI search failed');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('AI search error:', error);
      toast({
        title: "Błąd AI",
        description: "Nie udało się uzyskać sugestii AI. Spróbuj ponownie.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsAILoading(false);
    }
  };

  const generateCommandExplanation = async (command: string): Promise<string | null> => {
    setIsAILoading(true);
    
    try {
      const response = await fetch('/api/ai/explain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ command }),
      });

      if (!response.ok) {
        throw new Error('AI explanation failed');
      }

      const result = await response.json();
      return result.explanation;
    } catch (error) {
      console.error('AI explanation error:', error);
      toast({
        title: "Błąd AI",
        description: "Nie udało się wygenerować wyjaśnienia AI.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsAILoading(false);
    }
  };

  return {
    searchWithAI,
    generateCommandExplanation,
    isAILoading,
  };
}
