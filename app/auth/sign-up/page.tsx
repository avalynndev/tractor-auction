"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { EyeOff, Eye, Loader2 } from "lucide-react";
import { Link } from "next-view-transitions";
import { toast } from "sonner";

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { username, email, password } = formData;

      const result = await signUp.email({
        email,
        password,
        username,
        name: "",
      });

      if (result.error) {
        setError(result.error.message || "Sign up failed");
      } else {
        toast.success("Account created successfully! 🎉");
        router.push("/dashboard");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error("Sign up error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="w-full max-w-sm">
          <CardHeader className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5">
            <CardTitle className="text-lg md:text-xl">Sign Up</CardTitle>
            <CardDescription className="text-xs md:text-sm">
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-4">
              <form onSubmit={handleSubmit} className="grid w-full gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      className="pr-10 hide-password-toggle"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute top-0 right-0 h-9 w-9 !bg-transparent hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50"
                      onClick={togglePasswordVisibility}
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <Eye className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <EyeOff className="h-4 w-4" aria-hidden="true" />
                      )}
                    </Button>
                    <style jsx>{`
                      .hide-password-toggle::-ms-reveal,
                      .hide-password-toggle::-ms-clear {
                        visibility: hidden;
                        pointer-events: none;
                        display: none;
                      }
                    `}</style>
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Create an account"
                  )}
                </Button>
              </form>
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-center gap-1.5 text-muted-foreground text-sm">
            Already have an account?
            <Link href="/auth/sign-in" className="text-foreground underline">
              <Button
                variant="link"
                className="h-8 px-0 text-foreground underline"
              >
                Sign In
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
