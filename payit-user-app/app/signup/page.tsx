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
    <div className="flex w-screen h-screen justify-center place-content-center gap-10 md:ml-8">
      <div className="flex items-center  py-12 w-7/12">
        <div className="mx-auto grid w-[350px] gap-6 ">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-balance text-muted-foreground">
              Enter Your Details to Proceed Further
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Ashif"
                className="rounded-md p-4 border"
                required
                onChange={(e) =>
                  setSignup((current) => ({
                    ...current,
                    name: e.target.value,
                  }))
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="mhmdashif18@gmail.com"
                className="rounded-md p-4 border"
                required
                onChange={(e) =>
                  setSignup((current) => ({
                    ...current,
                    email: e.target.value,
                  }))
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="text"
                maxLength={10}
                placeholder="97102*****"
                className="rounded-md p-4 border"
                required
                onChange={(e) =>
                  setSignup((current) => ({
                    ...current,
                    phone: Number(e.target.value),
                  }))
                }
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
                onChange={(e) =>
                  setSignup((current) => ({
                    ...current,
                    password: e.target.value,
                  }))
                }
              />
            </div>
            <hr></hr>
            <Button
              disabled={loading}
              className="w-full p-4  font-semibold text-md"
              onClick={async () => {
                isLoading(true);
                router.push("/verify/gmail");
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
          <div className="mt-2 text-center text-sm flex justify-between ">
            <div>
              have an account?{" "}
              <a href="/" className="underline">
                Login
              </a>{" "}
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
  );
}
