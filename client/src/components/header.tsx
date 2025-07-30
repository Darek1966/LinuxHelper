import { Bookmark, History, Terminal } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button"; // Assuming you are using shadcn/ui
import { useBookmarks } from "@/hooks/use-bookmarks"; // Assuming you created this hook

export function Header() {
  const { bookmarks, showingBookmarks, onToggleBookmarks } = useBookmarks();

  return (
    <header className="bg-background shadow-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
              <Terminal className="text-white w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">LinuxHelper</h1>
              <p className="text-sm text-muted-foreground">Twój asystent poleceń Linux</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleBookmarks}
              className={`flex items-center gap-2 ${showingBookmarks ? 'bg-secondary' : ''}`}
            >
              <Bookmark className={`w-4 h-4 ${bookmarks.length > 0 ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">Zakładki</span>
              {bookmarks.length > 0 && (
                <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                  {bookmarks.length}
                </span>
              )}
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}