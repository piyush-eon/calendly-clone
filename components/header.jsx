import React from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { checkUser } from "@/lib/checkUser";
import UserMenu from "./user-menu";
import { Button } from "./ui/button";
import { PenBox } from "lucide-react";

async function Header() {
  const user = await checkUser();

  return (
    <nav className="mx-auto py-4 px-4 flex justify-between items-center">
      <Link href="/" className="flex items-center">
        <Image
          src="/logo.png"
          width="150"
          height="60"
          alt="Schedulrr Logo"
          className="h-14 w-auto"
        />
      </Link>

      <div className="flex items-center gap-4">
        <SignedOut>
          <SignInButton>
            <Button variant="outline">Login</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <Link href="/create-event">
            <Button variant="default" className="flex items-center gap-2">
              <PenBox size={18} />
              <span className="hidden sm:inline">Create Event</span>
            </Button>
          </Link>
          <UserMenu />
        </SignedIn>
      </div>
    </nav>
  );
}

export default Header;
