import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, HelpCircle } from "lucide-react";
import { Header } from "@/components/header";
import { SearchSection } from "@/components/search-section";
import { CategoryFilters } from "@/components/category-filters";
import { CommandResultCard } from "@/components/command-result-card";
import { Button } from "@/components/ui/button";
import type { Command } from "@shared/schema";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Fetch commands based on search query and category
  const { data: commands = [], isLoading } = useQuery<Command[]>({
    queryKey: ["/api/commands/search", debouncedSearchQuery, activeCategory],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (debouncedSearchQuery) params.append("query", debouncedSearchQuery);
      if (activeCategory !== "all") params.append("category", activeCategory);
      
      const response = await fetch(`/api/commands/search?${params}`);
      if (!response.ok) throw new Error("Failed to search commands");
      return response.json();
    },
  });

  const filteredCommands = useMemo(() => {
    return commands || [];
  }, [commands]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchSection onSearch={handleSearch} isLoading={isLoading} />
        
        <CategoryFilters 
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Results Section */}
        <div className="space-y-6">
          {isLoading ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Search className="text-slate-400 w-6 h-6" />
              </div>
              <h3 className="text-lg font-medium text-slate-800 mb-2">Wyszukiwanie...</h3>
              <p className="text-slate-600">Proszę czekać, szukam odpowiednich poleceń</p>
            </div>
          ) : filteredCommands.length > 0 ? (
            filteredCommands.map((command) => (
              <CommandResultCard key={command.id} command={command} />
            ))
          ) : !isLoading ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="text-slate-400 w-6 h-6" />
              </div>
              <h3 className="text-lg font-medium text-slate-800 mb-2">Brak wyników</h3>
              <p className="text-slate-600 mb-6">
                Spróbuj użyć innych słów kluczowych lub wybierz inną kategorię
              </p>
              <Button
                variant="link"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Wyczyść wyszukiwanie
                <span className="ml-2">→</span>
              </Button>
            </div>
          ) : null}
        </div>
      </main>

      {/* Floating Help Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105"
        >
          <HelpCircle className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
