import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCustomerEmail, normalizeEmail } from "@/lib/customer-auth";
import { isDemoMode } from "@/lib/demo";

export async function PATCH(request: NextRequest) {
  const email = await getCustomerEmail();
  if (!email) {
    return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  }

  if (isDemoMode()) {
    return NextResponse.json({ error: "Mode démo" }, { status: 400 });
  }

  const body = await request.json();
  const data = {
    firstName: body.firstName?.trim() || null,
    lastName: body.lastName?.trim() || null,
    phone: body.phone?.trim() || null,
    address: body.address?.trim() || null,
    city: body.city?.trim() || null,
    postalCode: body.postalCode?.trim() || null,
    country: body.country?.trim() || "France",
  };

  const profile = await prisma.customerProfile.upsert({
    where: { email: normalizeEmail(email) },
    create: { email: normalizeEmail(email), ...data },
    update: data,
  });

  return NextResponse.json(profile);
}
