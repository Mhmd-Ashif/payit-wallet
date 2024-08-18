"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const SidebarItem = ({
  href,
  title,
  icon,
}: {
  href: string;
  title: string;
  icon: React.ReactNode;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const selected = pathname === href;

  return (
    <div
      className={`flex ${selected ? "text-[#000000]" : "text-neutral-500"} cursor-pointer `}
      onClick={() => {
        router.push(href);
      }}
    >
      <div className="pr-1 md:pr-2 ">{icon}</div>
      <div
        className={`text-sm hidden md:inline-block md:text-lg font-bold ${selected ? "text-[#000000]" : "text-neutral-500"}`}
      >
        {title}
      </div>
    </div>
  );
};
