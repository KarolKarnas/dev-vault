import { cache } from "react";
import { prisma } from "@/lib/prisma";

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
}

// TODO: Replace with authenticated session user once auth is implemented
export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  const user = await prisma.user.findFirst({
    select: { id: true, name: true, email: true },
  });

  if (!user) return null;

  return {
    id: user.id,
    name: user.name ?? "User",
    email: user.email,
  };
});
