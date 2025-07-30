import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, HelpCircle } from "lucide-react";
import { Header } from "@/components/header";
import { SearchSection } from "@/components/search-section";
import { SearchHistory } from "@/components/search-history";
import { CategoryFilters } from "@/components/category-filters";
import { CommandResultCard } from "@/components/command-result-card";
import { ExportDialog } from "@/components/export-dialog";
import { Bookmarks } from "@/components/bookmarks";
import { Button } from "@/components/ui/button";
import { useSearchHistory } from "@/hooks/use-search-history";
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
  const [showingBookmarks, setShowingBookmarks] = useState(false);
  const { addToHistory } = useSearchHistory();

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
      const results = await response.json();

      // Add to history if there's a search query and results
      if (debouncedSearchQuery && debouncedSearchQuery.trim()) {
        addToHistory(debouncedSearchQuery, results.length);
      }

      return results;
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

  const handleSelectFromHistory = (query: string) => {
    setSearchQuery(query);
    setShowingBookmarks(false);
  };

  const handleToggleBookmarks = () => {
    setShowingBookmarks(!showingBookmarks);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        onToggleBookmarks={handleToggleBookmarks}
        showingBookmarks={showingBookmarks}
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchSection onSearch={handleSearch} isLoading={isLoading} />

        <Bookmarks isVisible={showingBookmarks} />

        {!showingBookmarks && (
          <SearchHistory
            onSelectSearch={handleSelectFromHistory}
            currentQuery={searchQuery}
          />
        )}

        {!showingBookmarks && (
          <CategoryFilters
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        )}

        {/* Results Header with Export */}
        {filteredCommands.length > 0 && !isLoading && !showingBookmarks && (
          <div className="flex justify-between items-center py-4">
            <div className="text-sm text-muted-foreground">
              Znaleziono {filteredCommands.length} poleceń
              {searchQuery && (
                <span className="ml-2 text-muted-foreground/70">
                  dla zapytania: "{searchQuery}"
                </span>
              )}
            </div>
            <ExportDialog commands={filteredCommands} searchQuery={searchQuery} />
          </div>
        )}

        {/* Results Section */}
        {!showingBookmarks && (
          <div className="space-y-6">
            {isLoading ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Search className="text-muted-foreground w-6 h-6" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">Wyszukiwanie...</h3>
                <p className="text-muted-foreground">Proszę czekać, szukam odpowiednich poleceń</p>
              </div>
            ) : filteredCommands.length > 0 ? (
              filteredCommands.map((command) => (
                <CommandResultCard key={command.id} command={command} />
              ))
            ) : !isLoading ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="text-muted-foreground w-6 h-6" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">Brak wyników</h3>
                <p className="text-muted-foreground mb-6">
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
        )}

        {/* Bookmarks Section */}
        {showingBookmarks && (
          <Bookmarks isVisible={true} />
        )}
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