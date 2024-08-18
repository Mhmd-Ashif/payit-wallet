"use server";

import prisma from "@/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { revalidatePath } from "next/cache";

export async function createOnRampTransaction(
  provider: string,
  amount: number
) {
  // Ideally the token should come from the banking provider (hdfc/axis)
  const session = await getServerSession(authOptions);
  try {
    if (!session?.user || !session.user?.id) {
      return {
        message: null,
      };
    }
    const token = (Math.random() * 1000).toString();
    const data = await prisma.onRampTransaction.create({
      data: {
        provider,
        status: "Processing",
        startTime: new Date(),
        token: token,
        userId: Number(session?.user?.id),
        amount: amount * 100,
      },
      select: {
        id: true,
        token: true,
        userId: true,
        amount: true,
      },
    });

    revalidatePath("/transfer");
    scheduleFailureJob(data.id, 10 * 60 * 1000);
    return {
      message: data,
    };
  } catch (error) {
    return { message: null };
  }
}

async function scheduleFailureJob(transactionId: number, timeout: number) {
  setTimeout(async () => {
    const ts = await prisma.onRampTransaction.findMany({
      where: { id: transactionId },
    });
    const tran = ts[0];
    if (tran?.status == "Processing" && tran) {
      await prisma.onRampTransaction.update({
        where: { id: transactionId },
        data: { status: "Failure" },
      });
    } else {
      return;
    }
  }, timeout);
}
