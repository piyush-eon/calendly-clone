"use server";

import { db } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function updateUsername(username) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Check if username is already taken
  const existingUser = await db.user.findUnique({
    where: { username },
  });

  if (existingUser && existingUser.id !== userId) {
    throw new Error("Username is already taken");
  }

  // Update username in database
  await db.user.update({
    where: { clerkUserId: userId },
    data: { username },
  });

  // Update username in Clerk
  await clerkClient.users.updateUser(userId, {
    username,
  });

  return { success: true };
}
