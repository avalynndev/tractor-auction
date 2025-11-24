"use client";

import React from "react";
import { Skeleton } from "./ui/skeleton";

export function MorphingTextWithSkeleton({
  children,
  delay = 300,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const [showChildren, setShowChildren] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setShowChildren(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <span>
      {showChildren ? (
        <span className="fade-in">{children}</span>
      ) : (
        <Skeleton className="h-20 m-2"/>
      )}
    </span>
  );
}
