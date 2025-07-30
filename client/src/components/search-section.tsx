import { useState, useEffect, useCallback } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchSectionProps {
  onSearch: (query: string) => void;
  value?: string;
  isLoading?: boolean;
}

export function SearchSection({ onSearch, value = "", isLoading }: SearchSectionProps) {
  const [localValue, setLocalValue] = useState(value);

  // Sync with external value changes only when not actively typing
  useEffect(() => {
    if (value !== localValue) {
      setLocalValue(value);
    }
  }, [value]);

  // Debounced search function
  const debouncedSearch = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      return (searchValue: string) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          onSearch(searchValue);
        }, 300);
      };
    })(),
    [onSearch]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localValue);
  };

  const handleInputChange = (newValue: string) => {
    setLocalValue(newValue);
    // Use debounced search to avoid frequent re-renders
    debouncedSearch(newValue);
  };

  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-foreground mb-4">Opisz co chcesz zrobić</h2>
      <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
        Wpisz zadanie w języku naturalnym, a otrzymasz odpowiednie polecenie Linux z wyjaśnieniem
      </p>

      <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
        <div className="relative">
          <Input
            type="text"
            placeholder="np. znajdź pliki większe niż 100MB w katalogu domowym"
            value={localValue}
            onChange={(e) => handleInputChange(e.target.value)}
            className="w-full px-6 py-4 text-lg border border-input rounded-2xl focus:ring-2 focus:ring-ring focus:border-transparent shadow-sm pl-14 bg-background text-foreground"
            disabled={isLoading}
          />
          <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        </div>
      </form>
    </div>
  );
}