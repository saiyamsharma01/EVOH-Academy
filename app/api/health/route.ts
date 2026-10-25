import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "evoh-academy",
    version: "2.0.0",
    uptimeSeconds: process.uptime(),
    timestamp: new Date().toISOString(),
  });
}
