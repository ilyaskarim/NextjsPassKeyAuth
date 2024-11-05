// app/api/hello/route.ts
import prisma from '@/prisma'
import { verifyAuthenticationResponse } from '@simplewebauthn/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'Hello, world!' })
}

export async function POST(req: NextRequest) {
  const {
    attResp,
    email,
  } = await req.json()

  const user = await prisma.user.findFirstOrThrow({
    where: {
      email: email,
    },
    include: {
      PassKeys: true,
    },
  })

  const credential = user.PassKeys.find((credential) => {
    return credential.cred_id == attResp.id;
  })

  if (!credential) {
    return NextResponse.json({ error: "Credential not found" }, { status: 404 });
  }

  const verification = await verifyAuthenticationResponse({
    response: attResp,
    expectedType: ["public-key", "webauthn.get"],
    expectedChallenge: user.currentChallenge || "",
    expectedOrigin: "http://localhost:3000",
    expectedRPID: "localhost",
    credential: {
      id: credential.cred_id,
      publicKey: credential.cred_public_key,
      counter: credential.counter,
      transports: JSON.parse(credential.transports),
    },
  });

  if (!verification.verified) {
    return NextResponse.json({ message: "Verification failed" }, { status: 401 });
  }

  return NextResponse.json({ message: "Verification successful" });
}