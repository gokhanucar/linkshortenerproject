'use server';

import { auth } from '@clerk/nextjs/server';
import { z } from 'zod';
import { createLink, updateLink, deleteLinkById } from '@/data/links';
import { randomBytes } from 'crypto';

const createLinkSchema = z.object({
  url: z.string().url('Please enter a valid URL.'),
  shortCode: z
    .string()
    .min(3, 'Short code must be at least 3 characters.')
    .max(20, 'Short code must be at most 20 characters.')
    .regex(/^[a-zA-Z0-9-_]+$/, 'Short code can only contain letters, numbers, hyphens, and underscores.')
    .optional(),
});

export type CreateLinkInput = z.infer<typeof createLinkSchema>;

function generateShortCode(): string {
  return randomBytes(4).toString('hex');
}

export async function createLinkAction(input: CreateLinkInput) {
  const { userId } = await auth();
  if (!userId) {
    return { error: 'You must be signed in to create a link.' };
  }

  const parsed = createLinkSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { url, shortCode } = parsed.data;

  try {
    const link = await createLink({
      userId,
      url,
      shortCode: shortCode ?? generateShortCode(),
    });
    return { success: true, data: link };
  } catch {
    return { error: 'Failed to create link. The short code may already be taken.' };
  }
}

const updateLinkSchema = z.object({
  id: z.number().int().positive(),
  url: z.string().url('Please enter a valid URL.'),
  shortCode: z
    .string()
    .min(3, 'Short code must be at least 3 characters.')
    .max(20, 'Short code must be at most 20 characters.')
    .regex(/^[a-zA-Z0-9-_]+$/, 'Short code can only contain letters, numbers, hyphens, and underscores.'),
});

export type UpdateLinkInput = z.infer<typeof updateLinkSchema>;

export async function updateLinkAction(input: UpdateLinkInput) {
  const { userId } = await auth();
  if (!userId) {
    return { error: 'You must be signed in to update a link.' };
  }

  const parsed = updateLinkSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  try {
    const link = await updateLink({ ...parsed.data, userId });
    return { success: true, data: link };
  } catch {
    return { error: 'Failed to update link. The short code may already be taken.' };
  }
}

const deleteLinkSchema = z.object({
  id: z.number().int().positive(),
});

export type DeleteLinkInput = z.infer<typeof deleteLinkSchema>;

export async function deleteLinkAction(input: DeleteLinkInput) {
  const { userId } = await auth();
  if (!userId) {
    return { error: 'You must be signed in to delete a link.' };
  }

  const parsed = deleteLinkSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  try {
    await deleteLinkById(parsed.data.id, userId);
    return { success: true };
  } catch {
    return { error: 'Failed to delete link.' };
  }
}
