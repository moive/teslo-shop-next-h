import { getProductBySlug } from "@/actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const product = await getProductBySlug(slug);
    const stock = product?.inStock ?? 0;

    return NextResponse.json({ stock });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch stock" },
      { status: 500 },
    );
  }
}
