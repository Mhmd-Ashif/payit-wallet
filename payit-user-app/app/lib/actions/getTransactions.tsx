"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@/prisma";
import { revalidatePath } from "next/cache";

export async function getTransactions() {
  const session = await getServerSession(authOptions);
  let allTransactions = [];
  // getting the onRamp
  let txns = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session?.user?.id),
    },
  });

  txns = txns.filter((filtered: any) => filtered.status != "Processing");
  txns = txns.reverse();

  // getting the p2p
  let p2ptxnsSend = await prisma.p2P.findMany({
    where: {
      fromUser: Number(session?.user.id),
    },

    select: {
      amount: true,
      time: true,
      to: {
        select: {
          name: true,
          email: true,
          number: true,
        },
      },
    },
  });

  let p2ptxnsReceived = await prisma.p2P.findMany({
    where: {
      toUser: Number(session?.user.id),
    },

    select: {
      amount: true,
      time: true,
      from: {
        select: {
          name: true,
          email: true,
          number: true,
        },
      },
    },
  });

  const formattedSend = p2ptxnsSend.map((t: any) => {
    return {
      amount: t.amount,
      time: t.time,
      name: t.to.name,
      type: "send",
      number: t.to.number,
      email: t.to.email,
    };
  });

  const formattedReceived = p2ptxnsReceived.map((t: any) => {
    return {
      amount: t.amount,
      time: t.time,
      type: "received",
      name: t.from.name,
      number: t.from.number,
      email: t.from.email,
    };
  });

  allTransactions.push(...formattedSend);
  allTransactions.push(...formattedReceived);

  allTransactions.sort(
    (a: any, b: any) => new Date(a.time).getTime() - new Date(b.time).getTime()
  );

  allTransactions = allTransactions.reverse();
  revalidatePath("/");
  return { allTransactions, txns };
}
