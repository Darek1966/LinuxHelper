import { Folder, Cpu, Network, Settings, Grid3X3 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CategoryFiltersProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: "all", label: "Wszystkie", icon: Grid3X3 },
  { id: "files", label: "Pliki", icon: Folder },
  { id: "processes", label: "Procesy", icon: Cpu },
  { id: "network", label: "Sieć", icon: Network },
  { id: "system", label: "System", icon: Settings },
];

export function CategoryFilters({ activeCategory, onCategoryChange }: CategoryFiltersProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-10">
      {categories.map((category) => {
        const Icon = category.icon;
        const isActive = activeCategory === category.id;
        
        return (
          <Button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            variant={isActive ? "default" : "outline"}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all shadow-sm ${
              isActive 
                ? "bg-blue-600 text-white hover:bg-blue-700" 
                : "bg-white text-slate-600 hover:bg-slate-50 border-slate-200"
            }`}
          >
            <Icon className="w-4 h-4 mr-2" />
            {category.label}
          </Button>
        );
      })}
    </div>
  );
}
