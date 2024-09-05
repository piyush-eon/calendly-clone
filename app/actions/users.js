// app/actions/users.js
"use server";

import { db } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { z } from "zod";

const usernameSchema = z
  .string()
  .min(3)
  .max(20)
  .regex(/^[a-zA-Z0-9_]+$/);

export async function updateUsername(username) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const validatedUsername = usernameSchema.parse(username);

  // Check if username is already taken
  const existingUser = await db.user.findUnique({
    where: { username: validatedUsername },
  });

  if (existingUser && existingUser.id !== userId) {
    throw new Error("Username is already taken");
  }

  // Update username in database
  await db.user.update({
    where: { clerkUserId: userId },
    data: { username: validatedUsername },
  });

  // Update username in Clerk
  await clerkClient.users.updateUser(userId, {
    username: validatedUsername,
  });

  return { success: true };
}
