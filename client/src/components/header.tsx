import { Terminal } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {

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
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}