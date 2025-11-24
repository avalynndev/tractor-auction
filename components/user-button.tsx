"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings, LogOut, User, LogIn, UserPlus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PersonIcon } from "@radix-ui/react-icons";

export function UserButton() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/");
      toast.success("Signed Out Succesfully");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  if (isPending) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="size-fit rounded-full"
        disabled
      >
        <Avatar className="size-8">
          <AvatarFallback>
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-fit rounded-full hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50"
        >
          <Avatar className="size-8" aria-label="Account">
            {session?.user?.image ? (
              <AvatarImage
                src={session.user.image}
                alt={session?.user?.name || session?.user?.username || "User"}
              />
            ) : session?.user?.name || session?.user?.username ? (
              <AvatarImage
                src={`data:image/svg+xml;base64,${btoa(`
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                      <rect width="32" height="32" fill="#6366f1"/>
                      <text x="16" y="20" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="12" font-weight="bold">
                        ${(session?.user?.name || session?.user?.username || "").substring(0, 2).toUpperCase()}
                      </text>
                    </svg>
                  `)}`}
                alt={session?.user?.name || session?.user?.username || "User"}
              />
            ) : null}
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-56 max-w-64"
        align="center"
        side="bottom"
      >
        {session?.user ? (
          <>
            <div className="p-2">
              <div className="flex items-center gap-2">
                <Avatar className="size-8 my-0.5">
                  <AvatarImage
                    src={session.user.image || ""}
                    alt={session.user.name || session.user.username || "User"}
                  />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left leading-tight">
                  <span className="truncate font-semibold text-sm">
                    {session.user.name || session.user.username || "User"}
                  </span>
                  <span className="truncate opacity-70 text-xs">
                    {session.user.email}
                  </span>
                </div>
              </div>
            </div>

            <DropdownMenuSeparator />

            <Link href="/auth/settings">
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
            </Link>

            <Link href={`/profile/${session?.user?.username}`}>
              <DropdownMenuItem className="cursor-pointer">
                <PersonIcon className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
            </Link>

            <DropdownMenuItem
              onClick={handleSignOut}
              className="cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </>
        ) : (
          // Unauthenticated user menu
          <>
            <Link href="/auth/sign-in">
              <DropdownMenuItem className="cursor-pointer">
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </DropdownMenuItem>
            </Link>

            <Link href="/auth/sign-up">
              <DropdownMenuItem className="cursor-pointer">
                <UserPlus className="mr-2 h-4 w-4" />
                Sign Up
              </DropdownMenuItem>
            </Link>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
