"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../@/shad/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../@/shad/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../@/shad/ui/input-otp";
import { toast, useToast } from "../@/shad/ui/use-toast";
import { useRouter } from "next/navigation";
import { VerifyOtp } from "../app/lib/actions/verifyUser";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export function InputOTPForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, isLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    isLoading(true);
    const res = await VerifyOtp(data.pin);
    if (!res.msg) {
      isLoading(false);
      toast({
        variant: "destructive",
        title: "Oops! You Have Entered Invalid Otp",
        description:
          "Please Enter the Valid otp that had been send to your Gmail",
      });
    } else {
      toast({
        title: "Otp is Correct ✅",
        description: "Login Into Your Account to Access the Wallet",
      });
      router.push("/");
    }
  }

  return (
    <div className="flex justify-center text-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>One-Time Password</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  Please enter the one-time password sent to your phone.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={loading} type="submit">
            {" "}
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ""}
            {loading ? "Validating ... " : "Validate Otp"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
