"use client";
import { Button } from "@/@/shad/ui/button";
import { signOut, useSession } from "next-auth/react";

export function AppbarClient() {
  const session = useSession();

  return (
    <div className="">
      <div className="h-20 ">
        <div className="h-full flex justify-between border-b px-8 border-slate-300 bg-black ">
          <div className="text-xl font-mono font-bold text-white place-content-center grow">
            PayIt
          </div>
          <div className="place-content-center ">
            <Button
              className="hover:text-gray-300"
              onClick={() => signOut({ callbackUrl: "/", redirect: true })}
            >
              {session ? "Logout" : "Login"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
