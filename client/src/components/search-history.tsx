import { Clock, X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSearchHistory, type SearchHistoryItem } from "@/hooks/use-search-history";

interface SearchHistoryProps {
  onSelectSearch: (query: string) => void;
  currentQuery: string;
}

export function SearchHistory({ onSelectSearch, currentQuery }: SearchHistoryProps) {
  const { history, removeFromHistory, clearHistory } = useSearchHistory();

  if (history.length === 0) {
    return null;
  }

  const formatTimestamp = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return "przed chwilą";
    if (minutes < 60) return `${minutes} min temu`;
    if (hours < 24) return `${hours} godz. temu`;
    return `${days} dni temu`;
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-medium text-foreground">Historia wyszukiwania</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearHistory}
            className="text-muted-foreground hover:text-foreground"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-2">
          {history.slice(0, 5).map((item, index) => (
            <div
              key={`${item.query}-${item.timestamp}`}
              className={`group flex items-center justify-between p-2 rounded-lg border transition-colors hover:bg-secondary/50 cursor-pointer ${
                currentQuery === item.query ? 'bg-secondary border-primary' : 'border-border'
              }`}
              onClick={() => onSelectSearch(item.query)}
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {item.query}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">
                    {formatTimestamp(item.timestamp)}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {item.resultsCount} wyników
                  </Badge>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromHistory(item.query);
                }}
                className="ml-2 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
        
        {history.length > 5 && (
          <p className="text-xs text-muted-foreground mt-2 text-center">
            i jeszcze {history.length - 5} starszych wyszukiwań
          </p>
        )}
      </CardContent>
    </Card>
  );
}