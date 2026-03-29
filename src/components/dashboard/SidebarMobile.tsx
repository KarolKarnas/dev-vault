"use client";

import Link from "next/link";
import { Star, Plus, Settings, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { iconMap, defaultIcon } from "@/lib/icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import ProBadge from "@/components/dashboard/ProBadge";
import type { SidebarData } from "@/components/dashboard/Sidebar";

interface SidebarMobileProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: SidebarData;
}

export default function SidebarMobile({
  open,
  onOpenChange,
  data,
}: SidebarMobileProps) {
  const { itemTypes, collections, user } = data;
  const favoriteCollections = collections.filter((c) => c.isFavorite);
  const allCollections = collections.filter((c) => !c.isFavorite);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="w-64 p-0 bg-sidebar text-sidebar-foreground"
      >
        <SheetTitle className="sr-only">Navigation</SheetTitle>

        <div className="flex items-center px-4 py-3">
          <span className="text-sm font-semibold text-muted-foreground">
            Types
          </span>
        </div>

        <ScrollArea className="flex-1 h-[calc(100vh-8rem)]">
          <nav className="px-2">
            {itemTypes.map((type) => {
              const Icon = iconMap[type.icon] ?? defaultIcon;
              const isProType = type.name === "file" || type.name === "image";

              return (
                <Link
                  key={type.id}
                  href={`/items/${type.name}`}
                  onClick={() => onOpenChange(false)}
                  className="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-sidebar-accent"
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-4 w-4" style={{ color: type.color }} />
                    <span className="capitalize">{type.name}s</span>
                  </span>
                  <span className="flex items-center gap-2">
                    {isProType && (
                      <ProBadge />
                    )}
                    <span className="text-xs text-muted-foreground">
                      {type.count}
                    </span>
                  </span>
                </Link>
              );
            })}
          </nav>

          <Separator className="my-3" />

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
                    onClick={() => onOpenChange(false)}
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
                    onClick={() => onOpenChange(false)}
                    className="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-sidebar-accent"
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className="h-3 w-3 shrink-0 rounded-full"
                        style={{ backgroundColor: collection.dominantColor }}
                      />
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

          <div className="px-2 pb-2">
            <Link
              href="/collections"
              onClick={() => onOpenChange(false)}
              className="block rounded-md px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-sidebar-accent"
            >
              View all collections
            </Link>
          </div>
        </ScrollArea>

        <Separator />

        <div className="flex items-center gap-3 px-4 py-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-sidebar-accent text-xs">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium">{user.name}</p>
            <p className="truncate text-xs text-muted-foreground">
              {user.email}
            </p>
          </div>
          <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
