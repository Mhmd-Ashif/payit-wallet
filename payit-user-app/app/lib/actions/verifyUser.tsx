"use server";
import prisma from "@/prisma";
const nodemailer = require("nodemailer");

export async function SendMail(mail: string) {
  try {
    const findUser = await prisma.user.findUnique({
      where: {
        email: mail,
        verified: false,
      },
    });

    if (findUser) {
      // Generate a random OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      // Store the OTP in the database
      await prisma.user.update({
        where: {
          email: mail,
        },
        data: {
          otp: Number(otp),
        },
      });

      // Set up the mail options
      const mailOptions = {
        to: mail,
        subject: "Your OTP for PAYIT",
        text: `Here is your OTP for PAYIT: ${otp}`,
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
              <div style="background-color: #333333; padding: 20px; text-align: center;">
                <h1 style="color: #ffffff; font-size: 24px; margin: 0;">Welcome to PAYIT</h1>
              </div>
              <div style="padding: 30px; text-align: center;">
                <p style="font-size: 20px; color: #333333; margin-bottom: 20px;">Your One-Time Password (OTP)</p>
                <p style="font-size: 36px; font-weight: bold; color: #000000; margin: 0;">${otp}</p>
                <p style="font-size: 16px; color: #555555; margin-top: 20px;">Please use this OTP to complete your login.</p>
                <p style="font-size: 14px; color: #777777; margin-top: 10px;">If you did not request this, please ignore this email.</p>
              </div>
              <div style="background-color: #f1f1f1; padding: 10px 20px; text-align: center;">
                <p style="font-size: 14px; color: #999999;">© 2024 PAYIT. All rights reserved.</p>
              </div>
            </div>
          </div>
        `,
      };

      // Create the transporter
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GOOGLE_MAIL_ID,
          pass: process.env.GOOGLE_MAIL_PASS, // Note: always keep passwords in the .env file to keep them hidden
        },
      });

      // Send the mail
      const info = await transporter.sendMail(mailOptions);

      return { msg: "OTP sent successfully" };
    } else {
      return { msg: null };
    }
  } catch (error) {
    return { msg: null };
  }
}

export async function VerifyOtp(otp: string) {
  try {
    const otpNumber = Number(otp);
    const res = await prisma.user.findFirst({
      where: {
        otp: otpNumber,
        verified: false,
      },
      select: {
        id: true,
      },
    });
    if (!res) {
      return { msg: null };
    } else {
      // update use to true to true
      const updateTrue = await prisma.user.update({
        where: res,
        data: {
          verified: true,
        },
      });
      return { msg: "otp is correct" };
    }
  } catch (err) {
    return { msg: null };
  }
}
