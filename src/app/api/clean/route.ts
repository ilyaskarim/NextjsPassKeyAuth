// app/api/hello/route.ts
import prisma from "@/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  await prisma.passkey.deleteMany();
  await prisma.user.deleteMany();
  return NextResponse.json({ message: "Hello, world!" });
}
