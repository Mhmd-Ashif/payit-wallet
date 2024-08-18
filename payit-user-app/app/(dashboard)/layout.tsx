"use client";
import { AppbarClient } from "../../components/AppbarClient";
import { DotBackground } from "../../components/GridBackground";
import { SidebarItem } from "../../components/SidebarItem";
import { Providers } from "@/provider";
export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <>
      <div className="w-full">
        <AppbarClient />
        <div className="block md:flex">
          <div className=" md:w-72 border-b md:border-b-0 md:border-r border-slate-300 md:min-h-screen mr-4 md:inline-block  ">
            <div className="pl-2 flex h-16 place-items-center justify-around md:flex-col md:space-y-14 md:mt-28 md:place-content-around md:place-items-start md:pl-6">
              <SidebarItem
                href={"/dashboard"}
                icon={<HomeIcon />}
                title="Home"
              />
              <SidebarItem
                href={"/transfer"}
                icon={<TransferIcon />}
                title="Transfer"
              />
              <SidebarItem
                href={"/transactions"}
                icon={<TransactionsIcon />}
                title="Transactions"
              />
              <SidebarItem
                href={"/p2p"}
                icon={<P2PTransferIcon />}
                title="P2P Transaction"
              />
            </div>
          </div>
          <Providers>
            <DotBackground children={children}></DotBackground>
          </Providers>
        </div>
      </div>
    </>
  );
}

// Icons Fetched from https://heroicons.com/
function HomeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="w-7 h-7 md:w-6 md:h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
      />
    </svg>
  );
}
function TransferIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="w-7 h-7 md:w-6 md:h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
      />
    </svg>
  );
}

function TransactionsIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="w-7 h-7 md:w-6 md:h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
}

function P2PTransferIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="w-7 h-7 md:w-6 md:h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
      />
    </svg>
  );
}
