import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-api";
import { isDemoMode } from "@/lib/demo";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  if (isDemoMode()) {
    return NextResponse.json({
      orders: 0,
      revenue: 0,
      pendingOrders: 0,
      products: 0,
      lowStock: 0,
      unreadMessages: 0,
      pendingRefunds: 0,
    });
  }

  const [orders, revenue, pendingOrders, products, lowStock, unreadMessages, pendingRefunds] =
    await Promise.all([
      prisma.order.count(),
      prisma.order.aggregate({ _sum: { total: true } }),
      prisma.order.count({ where: { status: "PENDING" } }),
      prisma.product.count(),
      prisma.productVariant.count({ where: { stock: { lte: 3 } } }),
      prisma.contactMessage.count({ where: { read: false } }),
      prisma.refundRequest.count({ where: { status: "PENDING" } }),
    ]);

  return NextResponse.json({
    orders,
    revenue: revenue._sum.total ?? 0,
    pendingOrders,
    products,
    lowStock,
    unreadMessages,
    pendingRefunds,
  });
}
