import { Search, Plus, Vault } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function TopBar() {
  return (
    <header className="flex items-center justify-between border-b border-border px-6 py-3">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Vault className="h-5 w-5 text-primary" />
          <span className="text-lg font-bold">DevVault</span>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search items..."
            className="pl-9"
            readOnly
          />
        </div>
      </div>
      <Button>
        <Plus className="mr-2 h-4 w-4" />
        New Item
      </Button>
    </header>
  );
}
