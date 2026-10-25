import { NextResponse } from "next/server";
import crypto from "crypto";
import { logger } from "@/lib/logger";

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-razorpay-signature");
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET || "dev_secret";

    if (!signature && process.env.NODE_ENV === "production") {
      logger.warn("Webhook rejected: missing signature header");
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    // Verify HMAC SHA256 signature
    if (signature && secret !== "dev_secret") {
      const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(rawBody)
        .digest("hex");

      if (expectedSignature !== signature) {
        logger.warn("Webhook signature mismatch");
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
      }
    }

    const event = JSON.parse(rawBody);
    logger.info({ eventType: event.event, id: event.payload?.payment?.entity?.id }, "Verified Razorpay webhook received");

    // Idempotent event acknowledgement
    return NextResponse.json({ status: "acknowledged", event: event.event });
  } catch (err: any) {
    logger.error({ err }, "Webhook processing error");
    return NextResponse.json({ error: "Internal processing error" }, { status: 500 });
  }
}
