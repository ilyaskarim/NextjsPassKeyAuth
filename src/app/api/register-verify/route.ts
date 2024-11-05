// app/api/hello/route.ts
import prisma from "@/prisma";
import { verifyRegistrationResponse } from "@simplewebauthn/server";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello, world!" });
}

export async function POST(req: NextRequest) {
  const { attResp, email } = await req.json();

  const user = await prisma.user.findFirstOrThrow({
    where: {
      email: email,
    },
  });

  const userIdArray = new Uint8Array(new ArrayBuffer(4));
  const view = new DataView(userIdArray.buffer);
  view.setInt32(0, user.id, false);

  const verification = await verifyRegistrationResponse({
    response: attResp,
    expectedChallenge: user.currentChallenge || "",
    expectedOrigin: "http://localhost:3000",
    expectedRPID: "localhost",
  });

  console.log(verification);

  if (verification.verified) {
    await prisma.passkey.create({
      data: {
        user_id: user.id,
        cred_id: verification.registrationInfo?.credential.id || "",
        cred_public_key: verification.registrationInfo?.credential
          .publicKey as Buffer,
        counter: verification.registrationInfo?.credential.counter || 0,
        transports: JSON.stringify(
          verification.registrationInfo?.credential.transports || []
        ),
        webauthn_user_id: user.id + "",
        backup_eligible: true,
        backup_status: true,
      },
    });
  }

  return NextResponse.json({
    verified: verification.verified,
  });
}
