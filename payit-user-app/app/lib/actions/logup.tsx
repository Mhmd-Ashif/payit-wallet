"use server";
import prisma from "@/prisma";
import bcrypt from "bcrypt";

interface signupConstrains {
  name: string;
  password: string;
  phone: number;
  email: string;
}

export async function loggups({
  name,
  password,
  phone,
  email,
}: signupConstrains) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const ifExist = await prisma.user.findUnique({
    where: {
      number: phone.toString(),
      email,
    },
  });
  // if exist skip
  if (!ifExist) {
    try {
      const res = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          number: phone.toString(),
        },
      });
      const bal = await prisma.balance.create({
        data: {
          userId: res.id,
          amount: 0,
          locked: 0,
        },
      });
      return { msg: "user and balances created for user" };
    } catch (error) {
      return {
        msg: "error doing in prisma",
      };
    }
  } else {
    return null;
  }
}
