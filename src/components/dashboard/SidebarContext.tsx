"use client";

import { createContext, useContext } from "react";

interface SidebarContextValue {
  closeMobile: () => void;
}

const SidebarContext = createContext<SidebarContextValue>({
  closeMobile: () => {},
});

export const SidebarProvider = SidebarContext.Provider;
export const useSidebar = () => useContext(SidebarContext);
