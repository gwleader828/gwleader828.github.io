import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/tools";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host");
      const proto = request.headers.get("x-forwarded-proto");
      const host =
        forwardedHost ||
        request.headers.get("host") ||
        "http://localhost:3000";
      const redirectUrl = proto
        ? `${proto}://${host}${next}`
        : `http://${host}${next}`;

      return NextResponse.redirect(redirectUrl);
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(
    new URL("/auth/auth-code-error", request.url)
  );
}
