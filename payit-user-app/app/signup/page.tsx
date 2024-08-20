"use client";
import { Button } from "../../@/shad/ui/button";
import { Input } from "../../@/shad/ui/input";
import { Label } from "../../@/shad/ui/label";
import world from "../../public/loginasid.png";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loggups } from "../lib/actions/logup";
import { useToast } from "../../@/shad/ui/use-toast";
import { Loader2 } from "lucide-react";

interface signupInterface {
  name: string;
  email: string;
  phone: number;
  password: string;
}

export default function Signup() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, isLoading] = useState<boolean>(false);
  const [signup, setSignup] = useState<signupInterface>({
    name: "",
    email: "",
    phone: 0,
    password: "",
  });

  return (
    <div className="flex flex-col lg:flex-row w-full h-screen justify-center items-center lg:gap-10">
      <div className="flex items-center py-12 w-full lg:w-1/2">
        <div className="mx-auto w-full max-w-md p-6 lg:p-0">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-muted-foreground mt-2">
              Enter Your Details to Proceed Further
            </p>
          </div>
          <div className="mt-6 space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Ashif"
                className="mt-2 p-4 border rounded-md w-full"
                required
                onChange={(e) =>
                  setSignup((current) => ({
                    ...current,
                    name: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="mhmdashif18@gmail.com"
                className="mt-2 p-4 border rounded-md w-full"
                required
                onChange={(e) =>
                  setSignup((current) => ({
                    ...current,
                    email: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="text"
                maxLength={10}
                placeholder="97102*****"
                className="mt-2 p-4 border rounded-md w-full"
                required
                onChange={(e) =>
                  setSignup((current) => ({
                    ...current,
                    phone: Number(e.target.value),
                  }))
                }
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                className="mt-2 p-4 border rounded-md w-full"
                onChange={(e) =>
                  setSignup((current) => ({
                    ...current,
                    password: e.target.value,
                  }))
                }
              />
            </div>
            <hr />
            <Button
              disabled={loading}
              className="w-full p-4 font-semibold text-md"
              onClick={async () => {
                isLoading(true);
                const res = await loggups({ ...signup });
                if (!res) {
                  isLoading(false);
                  toast({
                    variant: "destructive",
                    title: "User Doesn't Exist With The Given Credentials",
                    description: "Please Enter Valid Phone Number and Password",
                  });
                } else {
                  router.push("/verify/gmail");
                }
              }}
            >
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ""}
              {loading ? "Signing In ... " : "Sign Up"}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm flex justify-between">
            <div>
              Have an account?{" "}
              <a href="/" className="underline">
                Login
              </a>
            </div>
            <div>
              Verified?{" "}
              <a href="/verify/gmail" className="underline">
                Verify Now
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex lg:w-1/2 h-full bg-muted relative">
        <div className="absolute top-1/4 left-0 right-0 text-center text-white p-8">
          <h2 className="font-mono text-2xl lg:text-5xl font-bold">
            Payment Done Easier with PayIt
          </h2>
          <ul className="text-sm lg:text-lg mt-4 space-y-2">
            <li>- Transaction Done Via Phone Number</li>
            <li>- Quick and Reliable P2P Transfers</li>
            <li>- Payments can be Visualized by using `PAYIT`</li>
          </ul>
        </div>
        <img src={world.src} className="w-full h-full object-fill" />
      </div>
    </div>
  );
}
