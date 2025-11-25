"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export function MorphingTextWithSkeleton({
  children,
  delay = 300,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const [showChildren, setShowChildren] = React.useState(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setShowChildren(true);
    }, delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  return (
    <span className="relative">
      <AnimatePresence mode="wait">
        {!showChildren ? (
          <motion.h1
            key="initial-text"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="font-breakfast text-[44px] font-black max-w-3xl sm:text-6xl md:text-8xl text-background dark:text-foreground"
          >
            BEST
          </motion.h1>
        ) : (
          <motion.span
            key="children-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, ease: "easeIn" }}
          >
            {children}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
