import { NextResponse } from "next/server";
import { createCheckoutToken } from "@/lib/payment";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body?.email || !body?.birthDate || !body?.birthTime || !body?.birthPlace) {
    return NextResponse.json({ error: "Missing checkout data." }, { status: 400 });
  }

  return NextResponse.json(
    createCheckoutToken({
      email: String(body.email),
      birthDate: String(body.birthDate),
      birthTime: String(body.birthTime),
      birthPlace: String(body.birthPlace),
      gender: String(body.gender ?? ""),
    }),
  );
}
