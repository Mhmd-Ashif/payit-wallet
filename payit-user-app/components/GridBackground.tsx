import React, { ReactNode } from "react";

export function DotBackground({ children }: { children: ReactNode }) {
  return (
    <div className=" w-full  dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative">
      {children}
    </div>
  );
}
