
import { Bookmark, X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useBookmarks } from "@/hooks/use-bookmarks";
import { CommandResultCard } from "@/components/command-result-card";

interface BookmarksProps {
  isVisible: boolean;
}

export function Bookmarks({ isVisible }: BookmarksProps) {
  const { bookmarks, clearBookmarks } = useBookmarks();

  if (!isVisible || bookmarks.length === 0) {
    return null;
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Bookmark className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-medium text-foreground">Zapisane zakładki</h3>
            <Badge variant="secondary" className="text-xs">
              {bookmarks.length}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearBookmarks}
            className="text-muted-foreground hover:text-foreground"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-4">
          {bookmarks.map((command) => (
            <CommandResultCard 
              key={command.id} 
              command={command} 
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
