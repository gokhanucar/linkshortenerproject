import { db } from "@/db";
import { links } from "@/db/schema";
import { desc, eq, and } from "drizzle-orm";

export async function getLinksByUserId(userId: string) {
  return db
    .select()
    .from(links)
    .where(eq(links.userId, userId))
    .orderBy(desc(links.updatedAt));
}

export type CreateLinkInput = {
  userId: string;
  url: string;
  shortCode: string;
};

export async function createLink(input: CreateLinkInput) {
  const [link] = await db.insert(links).values(input).returning();
  return link;
}

export type UpdateLinkInput = {
  id: number;
  userId: string;
  url: string;
  shortCode: string;
};

export async function updateLink(input: UpdateLinkInput) {
  const [link] = await db
    .update(links)
    .set({ url: input.url, shortCode: input.shortCode, updatedAt: new Date() })
    .where(and(eq(links.id, input.id), eq(links.userId, input.userId)))
    .returning();
  return link;
}

export async function deleteLinkById(id: number, userId: string) {
  await db.delete(links).where(and(eq(links.id, id), eq(links.userId, userId)));
}

export async function getLinkByShortCode(shortCode: string) {
  const [link] = await db
    .select()
    .from(links)
    .where(eq(links.shortCode, shortCode))
    .limit(1);
  return link ?? null;
}
