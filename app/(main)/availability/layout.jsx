import { Suspense } from "react";

export default async function AvailabilityLayout({ children }) {
  return (
    <div className="mx-auto">
      <Suspense fallback={<div>Loading availability...</div>}>
        {children}
      </Suspense>
    </div>
  );
}
