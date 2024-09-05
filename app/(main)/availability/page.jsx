// app/(main)/availability/page.jsx
import React from "react";
import { auth } from "@clerk/nextjs/server";
import AvailabilityForm from "./_components/availability-form";
import { getUserAvailability } from "@/app/actions/availability";

export default async function AvailabilityPage() {
  const { userId } = auth();
  const availability = await getUserAvailability(userId);

  return (
    <div className="mx-auto px-4 py-8">
      <AvailabilityForm initialData={availability} userId={userId} />
    </div>
  );
}
