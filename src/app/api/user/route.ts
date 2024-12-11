import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import * as z from "zod";

const userSchema = z.object({
  name: z.string().min(1, { message: "Username is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Invalid email address"),
  phone: z
    .string()
    .min(1, { message: "Nomor telepon tidak boleh kosong." })
    .regex(/^\+?\d{10,15}$/, {
      message:
        "Nomor telepon harus berupa angka dan dapat diawali dengan tanda '+' dengan panjang 10-15 karakter.",
    }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be 8 characters or more" }),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, name, password, phone } = userSchema.parse(body);
    console.log({ email, name, password, phone });
    // Check Email
    const existUserByEmail = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    console.log({exist :existUserByEmail});

    if (existUserByEmail) {
      return NextResponse.json(
        { user: null, message: "Email already exist" },
        { status: 409 }
      );
    }

    // Check Username
    const existUserByUsername = await prisma.users.findUnique({
      where: {
        name,
      },
    });

    if (existUserByUsername) {
      return NextResponse.json(
        { user: null, message: "Username already exist" },
        { status: 409 }
      );
    }
    const hashPassword = await hash(password, 10);

    const newUser = await prisma.users.create({
      data: {
        email,
        name,
        phone,
        password: hashPassword,
      },
    });

    // const { password: newPassword, ...rest } = newUser;
    // console.log(newPassword);
    return NextResponse.json(
      { user: newUser, message: "User created" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
