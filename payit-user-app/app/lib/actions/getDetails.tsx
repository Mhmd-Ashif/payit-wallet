import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@/prisma";

export async function getDetails() {
  const session = await getServerSession(authOptions);
  const res = await prisma.user.findUnique({
    where: {
      id: Number(session.user.id),
    },
    select: {
      name: true,
      Balance: {
        select: {
          amount: true,
        },
      },
    },
  });
  if (res) {
    return res;
  } else {
    return null;
  }
}
