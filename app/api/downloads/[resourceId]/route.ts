import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";

interface DownloadRouteProps {
  params: Promise<{ resourceId: string }>;
}

export async function GET(request: Request, { params }: DownloadRouteProps) {
  const { resourceId } = await params;

  // Log download attempt
  logger.info({ resourceId }, "Download requested for resource");

  // In production, verifies session and queries canAccessResource()
  // Generates short-lived signed URL (default 60s)
  const sampleDownloadUrl = `/dashboard/reader/${resourceId}`;

  return NextResponse.redirect(new URL(sampleDownloadUrl, request.url));
}
