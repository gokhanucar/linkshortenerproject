import { NextRequest, NextResponse } from "next/server";
import { getLinkByShortCode } from "@/data/links";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ shortCode: string }> },
) {
  const { shortCode } = await params;
  const link = await getLinkByShortCode(shortCode);

  if (!link) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Guard against non-http(s) URLs stored before scheme validation was added
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(link.url);
  } catch {
    return NextResponse.json({ error: "Invalid redirect target" }, { status: 400 });
  }

  if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
    return NextResponse.json({ error: "Invalid redirect target" }, { status: 400 });
  }

  return NextResponse.redirect(parsedUrl.href, { status: 301 });
}
