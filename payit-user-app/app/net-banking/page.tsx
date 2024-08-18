"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../../@/shad/ui/button";
import { useToast } from "../../@/shad/ui/use-toast";
import { Loader2 } from "lucide-react";

export default function NetBankingPage() {
  const [data, setData] = useState<any>({ token: "", userId: "", amount: "" });
  const [loading, isLoading] = useState(false);
  const [btnLoad, isBtnLoad] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const getData = () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const amount = localStorage.getItem("amountVal");
      setData({ token, userId, amount });
      isLoading(true);
    };

    getData();
  }, []);

  return (
    <>
      {loading ? (
        <>
          <section className="bg-white dark:bg-gray-900">
            <div className="place-content-center px-4 mx-auto max-w-screen-xl md:mt-4 lg:px-6">
              <div className="mx-auto max-w-screen-md text-center ">
                <h2 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                  DEMO NETBANKING PAGE
                </h2>
                <div className="flex justify-center">
                  <div className="w-44">
                    <img src="https://logolook.net/wp-content/uploads/2021/11/HDFC-Bank-Logo.png"></img>
                  </div>
                </div>
              </div>
              <div className="space-y-8 lg:grid lg:grid-cols-1 sm:gap-6 xl:gap-10 lg:space-y-0">
                <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                  <h3 className="mb-4 text-2xl font-semibold">NET BANKING</h3>
                  <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                    <b className="font-semibold">
                      `this should come from the bank (axis,hdfc,cub) , then you
                      should enter your credentials NOTE : this is implemented
                      for testing purpose`
                    </b>
                  </p>

                  <div className="flex justify-center items-baseline my-8">
                    <span className="mr-2 text-5xl font-extrabold">
                      {`₹ ${Number(data.amount) / 100}`}
                    </span>
                  </div>
                  <ul className="mb-8 space-y-4 text-start  ">
                    <li className="flex items-center space-x-3 ">
                      <span>
                        User should enter userId and pass to login into the bank
                        provider
                      </span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span>
                        then the token will be generated and passed to the
                        backend server
                      </span>
                    </li>
                  </ul>
                  <Button
                    disabled={btnLoad}
                    onClick={async () => {
                      isBtnLoad(true);
                      try {
                        const res = await axios.post(
                          // change the ip of hosted machine
                          "https://payit-wallet.vercel.app/api/server",
                          data
                        );
                        const { message } = await res.data;
                        if (!message) {
                          // true
                          toast({
                            title:
                              "Money Transferred To Wallet Successfully ✅",
                          });
                          setTimeout(() => {
                            window.close();
                          }, 3000);
                        } else {
                          isBtnLoad(false);
                          toast({
                            variant: "destructive",
                            title: "Transaction Failed ",
                            description: message,
                          });
                        }
                      } catch (error) {
                        isBtnLoad(false);
                        toast({
                          variant: "destructive",
                          title: "Transaction Failed ❌",
                          description:
                            "This may Due because of UnAuth User or Network error ",
                        });
                      }
                    }}
                  >
                    {btnLoad ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      ""
                    )}
                    {btnLoad
                      ? "Transferring ... "
                      : "Tranfer Money to Wallet - Payit"}
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <div>Loading data...</div>
      )}
    </>
  );
}
