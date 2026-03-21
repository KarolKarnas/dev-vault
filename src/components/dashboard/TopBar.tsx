import { Search, Plus, Vault, PanelLeft, FolderPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TopBarProps {
  onMenuClick: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  return (
    <header className="flex items-center justify-between border-b border-border px-6 py-3">
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden h-8 w-8"
          onClick={onMenuClick}
        >
          <PanelLeft className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-2">
          <Vault className="h-5 w-5 text-primary" />
          <span className="text-lg font-bold">DevVault</span>
        </div>
        <div className="relative w-64 hidden sm:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search items..."
            className="pl-9"
            readOnly
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline">
          <FolderPlus className="mr-2 h-4 w-4" />
          New Collection
        </Button>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Item
        </Button>
      </div>
    </header>
  );
}
