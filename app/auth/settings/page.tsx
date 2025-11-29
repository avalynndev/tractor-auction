"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "@/lib/auth-client";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Laptop, EyeOff, Eye, Upload, Trash2, Loader2 } from "lucide-react";

export default function SettingsPage() {
  const { data: session, isPending } = useSession();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);

  const [nameLoading, setNameLoading] = useState(false);
  const [usernameLoading, setUsernameLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setUsername(session.user.username || "");
      setEmail(session.user.email || "");
      setAvatar(session.user.image || null);
    }
  }, [session]);

  const handleNameUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || name.length > 32) {
      toast.error("Name must be between 1 and 32 characters");
      return;
    }

    setNameLoading(true);
    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
      });

      if (error) {
        throw new Error(error.message);
      }

      toast.success("Name updated successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to update name");
      console.error(error);
    } finally {
      setNameLoading(false);
    }
  };

  const handleUsernameUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || username.length > 32) {
      toast.error("Username must be between 1 and 32 characters");
      return;
    }

    setUsernameLoading(true);
    try {
      const { error } = await authClient.updateUser({
        username: username.trim(),
      });

      if (error) {
        throw new Error(error.message);
      }

      toast.success("Username updated successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to update username");
      console.error(error);
    } finally {
      setUsernameLoading(false);
    }
  };

  const handleEmailUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setEmailLoading(true);
    try {
      const { data, error } = await authClient.changeEmail({
        newEmail: email.trim(),
      });

      if (error) {
        throw new Error(error.message);
      }

      toast.success("Email updated successfully");
      if (data?.status) {
        toast.success("Email change initiated.");
      } else {
        toast.error("Failed to initiate email change");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update email");
      console.error(error);
    } finally {
      setEmailLoading(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      toast.error("Both current and new passwords are required");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters");
      return;
    }

    setPasswordLoading(true);
    try {
      const { error } = await authClient.changePassword({
        currentPassword,
        newPassword,
        revokeOtherSessions: false,
      });

      if (error) {
        throw new Error(error.message);
      }

      toast.success("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
    } catch (error: any) {
      toast.error(error.message || "Failed to update password");
      console.error(error);
    } finally {
      setPasswordLoading(false);
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("Failed to convert file to base64"));
        }
      };
      reader.onerror = reject;
    });
  };

  const handleAvatarUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setAvatarLoading(true);
    try {
      const base64Image = await convertFileToBase64(file);

      const { error } = await authClient.updateUser({
        image: base64Image,
      });

      if (error) {
        throw new Error(error.message);
      }

      setAvatar(base64Image);
      toast.success("Avatar updated successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to upload avatar");
      console.error(error);
    } finally {
      setAvatarLoading(false);
    }
  };

  const handleAvatarRemove = async () => {
    setAvatarLoading(true);
    try {
      const { error } = await authClient.updateUser({
        image: null,
      });

      if (error) {
        throw new Error(error.message);
      }

      setAvatar(null);
      toast.success("Avatar removed successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to remove avatar");
      console.error(error);
    } finally {
      setAvatarLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleAvatarUpload(file);
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            window.location.href = "/auth/sign-in";
          },
        },
      });

      if (error) {
        throw new Error(error.message);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to sign out");
      console.error(error);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone.",
    );

    if (!confirmDelete) return;

    const secondConfirm = window.confirm(
      "This will permanently delete your account and all associated data",
    );

    if (!secondConfirm) return;

    setDeleteLoading(true);
    try {
      const { error } = await authClient.deleteUser({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Account deleted successfully");
            window.location.href = "/";
          },
        },
      });

      if (error) {
        throw new Error(error.message);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to delete account");
      console.error(error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const getAvatarFallback = () => {
    if (name) return name.charAt(0).toUpperCase();
    if (username) return username.charAt(0).toUpperCase();
    if (email) return email.charAt(0).toUpperCase();
    return "U";
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in</h1>
          <Button onClick={() => (window.location.href = "/sign-in")}>
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-xl mx-auto py-12 px-4">
      <Card className="pb-0">
        <CardHeader className="flex flex-row items-start justify-between">
          <div className="flex-1">
            <CardTitle>Avatar</CardTitle>
            <CardDescription className="pt-1">
              Click on the avatar to upload a custom one from your files.
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-20 w-20 rounded-full p-0"
                disabled={avatarLoading}
              >
                <Avatar className="h-20 w-20 text-2xl">
                  {avatar ? (
                    <AvatarImage src={avatar || undefined} />
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
                    />
                  ) : null}
                  <AvatarFallback>{getAvatarFallback()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer"
              >
                <Upload className="mr-2 h-4 w-4" />
                {avatar ? "Replace Avatar" : "Upload Avatar"}
              </DropdownMenuItem>
              {avatar && (
                <DropdownMenuItem
                  onClick={handleAvatarRemove}
                  className="cursor-pointer text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Remove Avatar
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardFooter className="border-t bg-sidebar rounded-b-xl p-5 ">
          <CardDescription>
            An avatar is optional but strongly recommended.
          </CardDescription>
        </CardFooter>
      </Card>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      <form onSubmit={handleNameUpdate}>
        <Card className="pb-0">
          <CardHeader>
            <CardTitle>Name</CardTitle>
            <CardDescription>
              Please enter your full name, or a display name.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={32}
              required
            />
          </CardContent>
          <CardFooter className="border-t bg-sidebar rounded-b-xl p-4">
            <CardDescription>
              Please use 32 characters at maximum.
            </CardDescription>
            <Button
              type="submit"
              className="ml-auto"
              disabled={nameLoading || !name.trim()}
            >
              {nameLoading && <Loader2 className="mr-1 h-4 w-4 animate-spin" />}
              {nameLoading ? "Saving..." : "Save"}
            </Button>
          </CardFooter>
        </Card>
      </form>

      <form onSubmit={handleUsernameUpdate}>
        <Card className="pb-0">
          <CardHeader>
            <CardTitle>Username</CardTitle>
            <CardDescription>
              Enter the username you want to use to log in.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              maxLength={32}
              required
            />
          </CardContent>
          <CardFooter className="border-t bg-sidebar rounded-b-xl p-4">
            <CardDescription>
              Please use 32 characters at maximum.
            </CardDescription>
            <Button
              type="submit"
              className="ml-auto"
              disabled={usernameLoading || !username.trim()}
            >
              {usernameLoading && (
                <Loader2 className="mr-1 h-4 w-4 animate-spin" />
              )}
              {usernameLoading ? "Saving..." : "Save"}
            </Button>
          </CardFooter>
        </Card>
      </form>

      <form onSubmit={handleEmailUpdate}>
        <Card className="pb-0">
          <CardHeader>
            <CardTitle>Email</CardTitle>
            <CardDescription>
              Enter the new email address you want to use.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </CardContent>
          <CardFooter className="border-t bg-sidebar rounded-b-xl p-4">
            <CardDescription>
              Please enter a valid email address.
            </CardDescription>
            <Button
              type="submit"
              className="ml-auto"
              disabled={emailLoading || !email.trim()}
            >
              {emailLoading && (
                <Loader2 className="mr-1 h-4 w-4 animate-spin" />
              )}
              {emailLoading ? "Saving..." : "Save"}
            </Button>
          </CardFooter>
        </Card>
      </form>

      <form onSubmit={handlePasswordUpdate}>
        <Card className="pb-0">
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>
              Enter your current password and a new password.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  autoComplete="new-password"
                  className="pr-10"
                  minLength={8}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t bg-sidebar rounded-b-xl p-4">
            <CardDescription>
              Please use 8 characters at minimum.
            </CardDescription>
            <Button
              type="submit"
              className="ml-auto"
              disabled={passwordLoading || !currentPassword || !newPassword}
            >
              {passwordLoading && (
                <Loader2 className="mr-1 h-4 w-4 animate-spin" />
              )}
              {passwordLoading ? "Saving..." : "Save"}
            </Button>
          </CardFooter>
        </Card>
      </form>

      <Card className="pb-0">
        <CardHeader>
          <CardTitle>Sessions</CardTitle>
          <CardDescription>
            Manage your active sessions and revoke access.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center gap-3 rounded-xl border p-3">
            <Laptop className="h-4 w-4" />
            <div className="flex flex-col">
              <span className="font-semibold text-sm">Current Session</span>
              <span className="text-muted-foreground text-xs">
                {typeof navigator !== "undefined"
                  ? `${navigator.platform}, ${navigator.userAgent.includes("Chrome") ? "Chrome" : "Browser"}`
                  : "Browser"}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </div>
        </CardContent>
        <CardFooter className="bg-sidebar" />
      </Card>

      <Card className="border-destructive/40 pb-0">
        <CardHeader>
          <CardTitle>Delete Account</CardTitle>
          <CardDescription>
            Permanently remove your account and all of its contents. This action
            is not reversible, so please continue with caution.
          </CardDescription>
        </CardHeader>

        <CardFooter className="border-t border-destructive/30 bg-destructive/15 rounded-b-xl p-4">
          <Button
            variant="destructive"
            className="ml-auto"
            onClick={handleDeleteAccount}
            disabled={deleteLoading}
          >
            {deleteLoading && <Loader2 className="mr-1 h-4 w-4 animate-spin" />}
            {deleteLoading ? "Deleting..." : "Delete Account"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
