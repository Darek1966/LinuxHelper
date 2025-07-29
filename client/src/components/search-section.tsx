import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchSectionProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export function SearchSection({ onSearch, isLoading }: SearchSectionProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleInputChange = (value: string) => {
    setQuery(value);
    // Search on every keystroke with debouncing handled by the parent
    onSearch(value);
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
            value={query}
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
