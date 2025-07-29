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
      <h2 className="text-3xl font-bold text-slate-800 mb-4">Opisz co chcesz zrobić</h2>
      <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
        Wpisz zadanie w języku naturalnym, a otrzymasz odpowiednie polecenie Linux z wyjaśnieniem
      </p>
      
      <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
        <div className="relative">
          <Input
            type="text"
            placeholder="np. znajdź pliki większe niż 100MB w katalogu domowym"
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            className="w-full px-6 py-4 text-lg border border-slate-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm pl-14"
            disabled={isLoading}
          />
          <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
        </div>
      </form>
    </div>
  );
}
