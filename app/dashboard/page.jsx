"use client";

import { useAuth } from "@clerk/nextjs";

const Page = () => {
  const { sessionId } = useAuth();
  console.log(sessionId);

  return <div>Page</div>;
};

export default Page;
