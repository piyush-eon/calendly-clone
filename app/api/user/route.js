import { createClerkClient } from "@clerk/backend";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  // const { userId } = auth();

  const clerkClient = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY,
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  });

  const { isSignedIn } = await clerkClient.authenticateRequest(req, {
    jwtKey: process.env.CLERK_JWT_KEY,
  });

  if (!isSignedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { sessionId } = await req.json();

  if (!sessionId) {
    return NextResponse.json(
      { error: "Session ID is required" },
      { status: 400 }
    );
  }

  const session = await clerkClient.sessions.getSession(sessionId);

  if (!session) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "This is a reply" }, { status: 201 });
}
