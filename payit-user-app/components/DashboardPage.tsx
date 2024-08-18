"use client";
import { BarComponent } from "./BarChart";
import { Avatar, AvatarFallback, AvatarImage } from "../@/shad/ui/avatar";
import { Button } from "../@/shad/ui/button";
import { useRouter } from "next/navigation";

export function DashboardPage({
  name,
  amount,
  recent,
}: {
  name: string;
  amount: number;
  recent: any;
}) {
  let filteredTransactions = recent.slice(0, 2);
  const router = useRouter();

  return (
    <>
      {/* get user name and welcome on board */}
      <div className="text-4xl antialiased text-black text-center pt-8 mb-8 mt-4 md:mt-8 font-bold ml-2 mr-2">
        {`Hi ${name.split(" ")[0]} , Welcome on Board`}
      </div>
      <div className="pl-4 pr-4 pb-8 md:pb-0 md:pr-0 md:pl-0 md:flex md:space-x-4">
        <div className="mt-4 mb-7 md:mt-0 md:mb-0 md:pr-4">
          {/* balance */}
          <div>
            <div className=" hover:shadow-slate-200 hover:shadow-xl  delay-75  bg-gradient-to-r from-slate-100 via-white to-slate-100 border rounded-xl p-8">
              <div className="min-w-72 pt-2 space-y-2 ">
                <div>
                  <div className="text-2xl font-extrabold subpixel-antialiased mb-2">
                    Current Balance
                  </div>
                  <div className="text-4xl md:text-5xl subpixel-antialiased font-bold ">
                    {`₹ ${new Intl.NumberFormat("en-IN").format(amount / 100)}`}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* demo credit card */}
          <div className="mt-4 md:mt-8">
            <div className="font-semibold text-xl mt-2 mb-2">
              Recent Transfers
            </div>
            <div>
              <div className="hover:shadow-slate-200 hover:shadow-xl delay-75 bg-gradient-to-r from-gray-100 via-white to-slate-100 border rounded-xl p-6">
                <div className="min-w-auto min-h-auto pt-2 space-y-4">
                  {filteredTransactions.map((r: any) => (
                    <div className="flex items-center justify-between ">
                      <div className="flex items-center space-x-2 w-24">
                        <Avatar>
                          <AvatarFallback className="bg-black text-white">
                            {r.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>{r.name}</div>
                      </div>
                      <div>
                        {
                          r.time
                            .toLocaleString("en-IN", { timeZone: "IST" })
                            .split(",")[0]
                        }
                      </div>
                      {r.type == "send" ? (
                        <div className="text-red-500">{`- ₹${new Intl.NumberFormat(
                          "en-IN"
                        ).format(r.amount / 100)}`}</div>
                      ) : (
                        <div className="text-green-500">{`+ ₹${new Intl.NumberFormat(
                          "en-IN"
                        ).format(r.amount / 100)}`}</div>
                      )}
                    </div>
                  ))}

                  <div className="text-center">
                    {filteredTransactions.length ? (
                      <Button
                        onClick={() => router.push("/transactions")}
                        className="text-slate-800 bg-white hover:bg-white hover:text-slate-500 "
                      >
                        See More
                      </Button>
                    ) : (
                      <span className="font-bold antialiased text-lg align-top">
                        No Recent Transactions
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* endl */}
        </div>
        <div className="md:w-8/12 md:pr-4 mb-4 hover:shadow-slate-200 hover:shadow-xl delay-75">
          <BarComponent transactions={recent}></BarComponent>
        </div>
      </div>
    </>
  );
}
