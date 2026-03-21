"use client";

import Link from "next/link";
import {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File,
  Image,
  Link as LinkIcon,
  Star,
  FolderOpen,
  Plus,
  Settings,
  PanelLeft,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import {
  mockItemTypes,
  mockCollections,
  mockItemTypeCounts,
  mockUser,
} from "@/lib/mock-data";

const iconMap: Record<string, LucideIcon> = {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File,
  Image,
  Link: LinkIcon,
};

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const favoriteCollections = mockCollections.filter((c) => c.isFavorite);
  const allCollections = mockCollections.filter((c) => !c.isFavorite);

  return (
    <aside
      className={`flex flex-col border-r border-border bg-sidebar text-sidebar-foreground transition-all duration-300 ${
        collapsed ? "w-14" : "w-64"
      }`}
    >
      {/* Header */}
      <div
        className={`flex items-center py-3 ${
          collapsed ? "justify-center px-2" : "justify-between px-4"
        }`}
      >
        {!collapsed && (
          <span className="text-sm font-semibold text-muted-foreground">
            Types
          </span>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={onToggle}
        >
          <PanelLeft className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        {/* Item types */}
        <nav className="px-2">
          {mockItemTypes.map((type) => {
            const Icon = iconMap[type.icon] ?? Code;
            const count =
              mockItemTypeCounts[
                type.name as keyof typeof mockItemTypeCounts
              ] ?? 0;

            return (
              <Link
                key={type.id}
                href={`/items/${type.name}`}
                title={collapsed ? `${type.name}s (${count})` : undefined}
                className={`flex items-center rounded-md py-2 text-sm hover:bg-sidebar-accent ${
                  collapsed
                    ? "justify-center px-2"
                    : "justify-between px-3"
                }`}
              >
                <span
                  className={`flex items-center ${collapsed ? "" : "gap-3"}`}
                >
                  <Icon
                    className="h-4 w-4 shrink-0"
                    style={{ color: type.color }}
                  />
                  {!collapsed && (
                    <span className="capitalize">{type.name}s</span>
                  )}
                </span>
                {!collapsed && (
                  <span className="text-xs text-muted-foreground">
                    {count}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <Separator className="my-3" />

        {/* Collections */}
        {collapsed ? (
          <div className="flex flex-col items-center gap-1 px-2">
            {mockCollections.map((collection) => (
              <Link
                key={collection.id}
                href={`/collections/${collection.id}`}
                title={collection.name}
                className="flex items-center justify-center rounded-md p-2 hover:bg-sidebar-accent"
              >
                {collection.isFavorite ? (
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                ) : (
                  <FolderOpen className="h-4 w-4 text-muted-foreground" />
                )}
              </Link>
            ))}
          </div>
        ) : (
          <>
            <div className="px-4 pb-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-muted-foreground">
                  Collections
                </span>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Plus className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>

            {favoriteCollections.length > 0 && (
              <Collapsible defaultOpen className="px-2 pb-2">
                <CollapsibleTrigger className="flex w-full items-center justify-between px-3 py-1 text-xs font-medium uppercase text-muted-foreground/70 hover:text-muted-foreground">
                  Favorites
                  <ChevronDown className="h-3 w-3 transition-transform [[data-panel-open]_&]:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  {favoriteCollections.map((collection) => (
                    <Link
                      key={collection.id}
                      href={`/collections/${collection.id}`}
                      className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-sidebar-accent"
                    >
                      <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                      <span>{collection.name}</span>
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            )}

            {allCollections.length > 0 && (
              <Collapsible defaultOpen className="px-2 pb-2">
                <CollapsibleTrigger className="flex w-full items-center justify-between px-3 py-1 text-xs font-medium uppercase text-muted-foreground/70 hover:text-muted-foreground">
                  All Collections
                  <ChevronDown className="h-3 w-3 transition-transform [[data-panel-open]_&]:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  {allCollections.map((collection) => (
                    <Link
                      key={collection.id}
                      href={`/collections/${collection.id}`}
                      className="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-sidebar-accent"
                    >
                      <span className="flex items-center gap-3">
                        <FolderOpen className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{collection.name}</span>
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {collection.itemCount}
                      </span>
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            )}
          </>
        )}
      </ScrollArea>

      <Separator />

      {/* User area */}
      <div
        className={`flex items-center py-3 ${
          collapsed ? "justify-center px-2" : "gap-3 px-4"
        }`}
      >
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarFallback className="bg-sidebar-accent text-xs">
            {mockUser.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        {!collapsed && (
          <>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium">{mockUser.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {mockUser.email}
              </p>
            </div>
            <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0">
              <Settings className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
    </aside>
  );
}
