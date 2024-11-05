// app/api/hello/route.ts
import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";
import { generateAuthenticationOptions } from "@simplewebauthn/server";

export async function GET() {
  return NextResponse.json({ message: "Hello, world!" });
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    const user = await prisma.user.findFirstOrThrow({
      where: {
        email: email,
      },
      include: {
        PassKeys: true,
      },
    });

    const options = await generateAuthenticationOptions({
      allowCredentials: user.PassKeys.map((cred) => ({
        id: cred.cred_id,
        type: "public-key",
      })),
      rpID: "localhost",
      userVerification: "preferred",
    });

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        currentChallenge: options.challenge,
      },
    });

    return NextResponse.json(options);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
