import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");

    if (!name) {
        return NextResponse.json({ error: "Scale name required" }, { status: 400 });
    }

    const scale = await prisma.scalePattern.findUnique({
        where: { name },
    });

    if (!scale) {
        return NextResponse.json({ error: "Scale not found" }, { status: 404 });
    }

    return NextResponse.json(scale);
}