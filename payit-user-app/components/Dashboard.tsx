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
    <>
      <div className="flex w-screen h-screen justify-center place-content-center gap-10 md:ml-8">
        <div className="flex items-center  py-12 w-7/12">
          <div className="mx-auto grid w-[350px] gap-6 ">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-balance text-muted-foreground">
                Enter your phone number below to login to your account
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="text"
                  maxLength={10}
                  placeholder="86105*****"
                  className="rounded-md p-4 border"
                  required
                  onChange={(e) => {
                    setPhone(Number(e.target.value));
                  }}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  className="rounded-md p-4 border"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <hr></hr>
              <Button
                disabled={loading}
                type="submit"
                className="w-full  p-4  font-semibold text-md"
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
                      description:
                        "Please Enter Valid Phone Number and Password",
                    });
                  }
                }}
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  ""
                )}
                {loading ? "Logging In " : "Login"}
              </Button>
            </div>
            <div className="mt-2 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/signup" className="underline">
                Sign up
              </a>
            </div>
          </div>
        </div>
        <div className="hidden bg-muted lg:block">
          <div className="font-mono text-5xl font-bold text-white absolute  text-center top-32">
            Payment Done Easier with payit
            <ul className=" text-lg mt-8">
              <li>- Transaction Done Via Phone Number</li>
              <li>- Quick and Reliable P2P transfers</li>
              <li>- Payments can be Visualtized by using `PAYIT`</li>
            </ul>
          </div>
          <img src={world.src} className="fit"></img>
        </div>
      </div>
    </>
  );
}
