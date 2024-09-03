import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { checkUser } from "@/lib/checkUser";
import UserMenu from "./user-menu";

async function Header() {
  const user = await checkUser();

  return (
    <>
      <nav className="py-4 px-4 flex justify-between items-center">
        <Link href="/">
          <Image
            src="/logo.png"
            width="200"
            height="150"
            alt="Schedulrr Logo"
          />
        </Link>

        <div className="flex gap-8">
          <SignedOut>
            {/* <Button variant="outline" onClick={() => setShowSignIn(true)}>
              Login
            </Button> */}
            <SignInButton />
          </SignedOut>
          <SignedIn>
            {/* {user?.unsafeMetadata?.role === "recruiter" && (
              <Link href="/post-job">
                <Button variant="destructive" className="rounded-full">
                  <PenBox size={20} className="mr-2" />
                  Post a Job
                </Button>
              </Link>
            )} */}
            <UserMenu />
          </SignedIn>
        </div>
      </nav>

      {/* {showSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOverlayClick}
        >
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )} */}
    </>
  );
}

export default Header;
