"use client";

import { Button } from "../@/shad/ui/button";
import { Input } from "../@/shad/ui/input";
import { Label } from "../@/shad/ui/label";
import { useToast } from "../@/shad/ui/use-toast";
import world from "../public/loginasid.png";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export function Dashboard() {
  const router = useRouter();
  const { toast } = useToast();
  const [phone, setPhone] = useState<number>();
  const [password, setPassword] = useState<string>();
  const [loading, isLoading] = useState<boolean>(false);

  return (
    <div className="flex flex-col lg:flex-row w-full h-screen justify-center items-center lg:gap-10">
      <div className="flex items-center py-12 w-full lg:w-1/2">
        <div className="mx-auto w-full max-w-md p-6 lg:p-0">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-muted-foreground mt-2">
              Enter your phone number below to login to your account
            </p>
          </div>
          <div className="mt-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="text"
                  maxLength={10}
                  placeholder="86105*****"
                  className="mt-2 p-4 border rounded-md w-full"
                  required
                  onChange={(e) => setPhone(Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  className="mt-2 p-4 border rounded-md w-full"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <hr className="my-6" />
            <Button
              disabled={loading}
              type="submit"
              className="w-full p-4 font-semibold text-md"
              onClick={async () => {
                isLoading(true);
                const res = await signIn("credentials", {
                  phone: phone,
                  password: password,
                  redirect: false,
                });
                if (res?.error == null) {
                  router.push("/dashboard");
                } else {
                  isLoading(false);
                  toast({
                    variant: "destructive",
                    title: "User Doesn't Exist With The Given Credentials",
                    description: "Please Enter Valid Phone Number and Password",
                  });
                }
              }}
            >
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ""}
              {loading ? "Logging In " : "Login"}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="underline">
              Sign up
            </a>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex lg:w-1/2 h-full bg-muted relative">
        <div className="absolute top-1/4 left-0 right-0 text-center text-white p-8">
          <h2 className="font-mono text-2xl lg:text-5xl font-bold">
            Payment Done Easier with payit
          </h2>
          <ul className="text-sm lg:text-lg mt-4 space-y-2">
            <li>- Transaction Done Via Phone Number</li>
            <li>- Quick and Reliable P2P transfers</li>
            <li>- Payments can be Visualized by using `PAYIT`</li>
          </ul>
        </div>
        <img src={world.src} className="w-full h-full object-fill" />
      </div>
    </div>
  );
}
