"use client";
import { useRouter } from "next/navigation";
import { Button } from "../../../@/shad/ui/button";
import { Input } from "../../../@/shad/ui/input";
import { Label } from "../../../@/shad/ui/label";
import { useState } from "react";
import { SendMail } from "../../lib/actions/verifyUser";
import { useToast } from "../../../@/shad/ui/use-toast";
import { Loader2 } from "lucide-react";

export default function Gmail() {
  const [gmail, setGmail] = useState("");
  const router = useRouter();
  const { toast } = useToast();
  const [loading, isLoading] = useState<boolean>(false);

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="flex flex-col space-y-4">
          <Label>
            Enter Your `<strong>Gmail</strong>` to Verify Your Account
          </Label>
          <Input
            type="email"
            placeholder="mhmdash@gmail.com"
            onChange={(e) => setGmail(e.target.value)}
          ></Input>
          <Button
            disabled={loading}
            onClick={async () => {
              isLoading(true);
              const res = await SendMail(gmail);

              if (!res.msg) {
                isLoading(false);
                toast({
                  variant: "destructive",
                  title: "Email Doesn't exist",
                  description:
                    "Please Enter valid Email or its already Verified or please enter Google mail id",
                });
              } else {
                toast({
                  title: "Email Successfully Send ✅",
                  description: "Check you Gmail and Please Enter the otp ",
                });
                router.push("/verify/otp");
              }
            }}
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ""}
            {loading ? "Sending Otp ... " : "Send Otp"}
          </Button>
        </div>
      </div>
    </>
  );
}
