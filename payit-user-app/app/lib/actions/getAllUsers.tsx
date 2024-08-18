import { getServerSession } from "next-auth";
import prisma from "@/prisma";
import { authOptions } from "../auth";

export async function getAllUsers() {
  const { user } = await getServerSession(authOptions);
  try {
    const res = await prisma.user.findMany({
      where: {
        verified: true,
      },
      select: {
        name: true,
        number: true,
      },
    });
    const verifiedUsers = res.map((d: any) => {
      return {
        name: d.name,
        label: d.number,
        value: d.number,
      };
    });
    return { msg: verifiedUsers };
  } catch (error) {
    return null;
  }
}
