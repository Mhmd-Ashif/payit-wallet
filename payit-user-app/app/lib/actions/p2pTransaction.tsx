"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@/prisma";
import { revalidatePath } from "next/cache";

export async function p2pTransfer(to: string, amount: number) {
  const session = await getServerSession(authOptions);
  const from = session?.user?.id;
  if (!from) {
    return {
      message: null,
    };
  }
  const toUser = await prisma.user.findFirst({
    where: {
      number: to,
    },
  });

  if (!toUser) {
    return {
      message: null,
    };
  }
  try {
    await prisma.$transaction(async (tx: any) => {
      await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(
        from
      )} FOR UPDATE`;

      const fromBalance = await tx.balance.findUnique({
        where: { userId: Number(from) },
      });

      if (!fromBalance || fromBalance.amount < amount * 100) {
        throw new Error("Insufficient funds");
      }

      await tx.balance.update({
        where: { userId: Number(from) },
        data: { amount: { decrement: amount * 100 } },
      });

      await tx.balance.update({
        where: { userId: toUser.id },
        data: { amount: { increment: amount * 100 } },
      });

      await tx.p2P.create({
        data: {
          time: new Date(),
          amount: Number(amount) * 100,
          fromUser: Number(from),
          toUser: Number(toUser.id),
        },
      });
    });
    revalidatePath("/dashboard", "page");
    return { message: "Money Send Successfully" };
  } catch (error) {
    return {
      message: null,
    };
  }
}
