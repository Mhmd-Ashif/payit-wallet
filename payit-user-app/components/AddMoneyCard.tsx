"use client";

import { Select } from "./Select";
import { useState } from "react";
import { createOnRampTransaction } from "../app/lib/createOnrampTransaction";
import { Button } from "../@/shad/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "../@/shad/ui/use-toast";
import { Loader2 } from "lucide-react";

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
];

interface Data {
  token: string | "";
  userId: number | 0 | "";
  amount: number | 0 | "";
}

export const AddMoney = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, isLoading] = useState<boolean>(false);
  const [redirectUrl, setRedirectUrl] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl
  );
  const [provider, setProvider] = useState<string>(
    SUPPORTED_BANKS[0]?.name || ""
  );
  const [money, setMoney] = useState();
  return (
    <>
      <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:max-w-xl lg:p-8">
        <div className="mb-6 grid grid-cols gap-4">
          <div className="col-span-2 sm:col-span-1">
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              {" "}
              Amount*
            </label>
            <input
              type="number"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
              placeholder="100"
              onChange={(e: any) => {
                setMoney(e.target.value);
              }}
            />
          </div>

          <div>
            <label className="mb-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white">
              Select Your Bank*
            </label>
            <Select
              onSelect={(value) => {
                setRedirectUrl(
                  SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl ||
                    ""
                );
                setProvider(
                  SUPPORTED_BANKS.find((x) => x.name === value)?.name || ""
                );
              }}
              options={SUPPORTED_BANKS.map((x: any) => ({
                key: x.name,
                value: x.name,
              }))}
            />
          </div>
        </div>

        <Button
          disabled={loading}
          className="w-full p-4  font-semibold text-md bg-black text-white hover:bg-gray-600"
          onClick={async () => {
            isLoading(true);
            if (Number(money) > 0) {
              const result = await createOnRampTransaction(
                String(provider),
                Number(money)
              );
              if (result.message) {
                const data: any = result.message;
                localStorage.setItem("token", data.token);
                localStorage.setItem("userId", data.userId);
                localStorage.setItem("amountVal", data.amount);
                isLoading(false);
                window.open("/net-banking", "_blank");
              } else {
                isLoading(false);
                toast({
                  variant: "destructive",
                  title: "Error Occured",
                  description: "Error in DB or You Can be unAuth User",
                });
              }
            } else {
              isLoading(false);
              toast({
                variant: "destructive",
                title: "Failed ❌ : Enter Amount You Wanted to Transfer  ",
              });
            }
          }}
        >
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ""}
          {loading ? "Processing ... " : "Add Money"}
        </Button>
      </div>
    </>
  );
};
