"use client";
import { useTheme } from "next-themes";
import { Toaster } from "sonner";
import { AuthUIProvider } from "@daveyplate/better-auth-ui";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import {Link} from "next-view-transitions";

import type { ReactNode } from "react";

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <AuthUIProvider
      authClient={authClient}
      navigate={router.push}
      replace={router.replace}
      onSessionChange={() => {
        router.refresh();
      }}
      credentials={{
        username: true,
      }}
      avatar
      signUp={{
        fields: [],
      }}
      nameRequired={false}
      Link={Link}
      deleteUser
    >
      {children}
    </AuthUIProvider>
  );
}

export function SonnerProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <>
      <Toaster
        theme={theme as "light" | "dark" | "system"}
        className="toaster group"
        toastOptions={{
          classNames: {
            toast:
              "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
            description: "group-[.toast]:text-muted-foreground",
            actionButton:
              "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
            cancelButton:
              "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          },
        }}
      />
      {children}
    </>
  );
}
