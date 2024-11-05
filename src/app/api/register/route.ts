// app/api/hello/route.ts
import prisma from '@/prisma';
import { generateRegistrationOptions } from '@simplewebauthn/server';
import { NextResponse, NextRequest } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'Hello, world!' })
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  const user = await prisma.user.create({
    data: {
      email: data.email,
      name: data.email,
    }
  })

  const userIdArray = new Uint8Array(new ArrayBuffer(4));
  const view = new DataView(userIdArray.buffer);
  view.setInt32(0, user.id, false);

  // Generate WebAuthn registration options
  const options = await generateRegistrationOptions({
    rpName: "PassKeyIlyas",
    rpID: "localhost",
    userID: userIdArray,
    userName: user.email,
    userDisplayName: user.email,
    attestationType: 'none',
    authenticatorSelection: {
      authenticatorAttachment: 'platform',
      residentKey: 'required',
    },
  });

  await prisma.user.update({
    where: {
      email: user.email,
    },
    data: {
      currentChallenge: options.challenge,
    }
  })

  return NextResponse.json(options);
}