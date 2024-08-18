// api/server/route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma"; // Adjust the import path if needed
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (session) {
    return NextResponse.json({ msg: "hi authenticated borskie" });
  } else {
    return NextResponse.json({ msg: "you aren't authenticated" });
  }
}

export async function POST(req: NextRequest) {
  const { token, userId, amount } = await req.json(); // Use req.json() to parse JSON body
  const session = await getServerSession(authOptions);
  try {
    const result = await prisma.onRampTransaction.findMany({
      where: {
        token,
        status: "Processing",
        userId: Number(userId),
        amount: Number(amount),
      },
    });
    if (result && session) {
      await prisma.$transaction([
        prisma.balance.updateMany({
          where: {
            userId: Number(userId),
          },
          data: {
            amount: {
              increment: Number(amount),
            },
          },
        }),
        prisma.onRampTransaction.updateMany({
          where: {
            token,
          },
          data: {
            status: "Success",
          },
        }),
      ]);

      return NextResponse.json({
        message: null,
      });
    } else {
      return NextResponse.json(
        { message: "Transaction already done" },
        { status: 400 }
      );
    }
  } catch (e) {
    await prisma.onRampTransaction.updateMany({
      where: {
        token, // Handle token in catch block
      },
      data: {
        status: "Failure",
      },
    });
    console.log("error :" + e);
    return NextResponse.json(
      { message: "Error while processing webhook" },
      { status: 500 }
    );
  }
}
