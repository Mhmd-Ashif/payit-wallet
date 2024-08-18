import prisma from "@/prisma";
import { AddMoney } from "../../../components/AddMoneyCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

async function getBalance() {
  const session = await getServerSession(authOptions);
  const balance = await prisma.balance.findFirst({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}

async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  let allTransactions: any;
  // getting the onRamp
  const txns = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  allTransactions = txns.map((t: any) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
  }));
  // getting the p2p
  return allTransactions;
}

export default async function () {
  const transactions = await getOnRampTransactions();
  const filteredTransactions = transactions
    .reverse()
    .filter((transaction: any) => transaction.status == "Success")
    .slice(0, 3);
  return (
    <>
      <div className="text-4xl antialiased text-black text-center pt-8 mb-8 mt-4 md:mt-8 font-bold ml-2 mr-2">
        Transfer Money To Wallet
      </div>
      <section className=" antialiased dark:bg-gray-900 ">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Add Money
            </h2>

            <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
              <AddMoney />
              <OnRampTransactions
                transactions={filteredTransactions}
              ></OnRampTransactions>
            </div>

            <p className="mt-6 text-center text-gray-500 dark:text-gray-400 sm:mt-8 lg:text-left">
              Payment processed by{" "}
              <a
                href="/transfer"
                title=""
                className="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
              >
                PayIt
              </a>{" "}
              - India
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
