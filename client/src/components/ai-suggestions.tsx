
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, Lightbulb, Copy, Check } from "lucide-react";
import { useAISearch } from "@/hooks/use-ai-search";
import { useToast } from "@/hooks/use-toast";

interface AISuggestionsProps {
  query: string;
  onSuggestionClick: (suggestion: string) => void;
}

export function AISuggestions({ query, onSuggestionClick }: AISuggestionsProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [explanation, setExplanation] = useState<string>("");
  const [confidence, setConfidence] = useState<number>(0);
  const [copiedIndex, setCopiedIndex] = useState<number>(-1);
  const { searchWithAI, isAILoading } = useAISearch();
  const { toast } = useToast();

  useEffect(() => {
    if (query.length > 3) {
      const searchAI = async () => {
        const result = await searchWithAI(query);
        if (result) {
          setSuggestions(result.suggestedCommands);
          setExplanation(result.explanation);
          setConfidence(result.confidence);
        }
      };
      
      const debounceTimer = setTimeout(searchAI, 1000);
      return () => clearTimeout(debounceTimer);
    } else {
      setSuggestions([]);
      setExplanation("");
      setConfidence(0);
    }
  }, [query, searchWithAI]);

  const copyToClipboard = async (command: string, index: number) => {
    try {
      await navigator.clipboard.writeText(command);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(-1), 2000);
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

  if (!query || query.length <= 3) return null;

  return (
    <Card className="mb-6 border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-purple-700">
          <Sparkles className="h-5 w-5" />
          Sugestie AI
          {confidence > 0 && (
            <Badge variant="secondary" className="ml-2">
              {Math.round(confidence * 100)}% pewności
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isAILoading ? (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Sparkles className="h-4 w-4 animate-spin" />
            AI analizuje twoje zapytanie...
          </div>
        ) : (
          <>
            {explanation && (
              <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-blue-800">{explanation}</p>
              </div>
            )}
            
            {suggestions.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-purple-700">Sugerowane polecenia:</h4>
                {suggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-white rounded border">
                    <code 
                      className="flex-1 text-sm bg-gray-100 px-2 py-1 rounded cursor-pointer hover:bg-gray-200 transition-colors"
                      onClick={() => onSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(suggestion, index)}
                      className="h-8 w-8 p-0"
                    >
                      {copiedIndex === index ? (
                        <Check className="h-3 w-3 text-green-600" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
