import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Security headers applied to all responses
const securityHeaders: Record<string, string> = {
  "X-DNS-Prefetch-Control": "on",
  "X-XSS-Protection": "1; mode=block",
  "X-Frame-Options": "SAMEORIGIN",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
};

// Known attack tools and vulnerability scanners (never legitimate web browsers)
const MALICIOUS_BOT_PATTERN =
  /(sqlmap|nikto|masscan|wprecon|acunetix|havij|zgrab|gobuster|dirbuster|nmap|morfeus|fuzzbench|whatweb|webshag|commix)/i;

// Probes for vulnerable CMS/PHP/Config/Env files that don't exist in Next.js
const MALICIOUS_PATH_PATTERN =
  /(\/\.env|\/\.git|\/\.aws|\/\.svn|wp-admin|wp-login|xmlrpc|phpmyadmin|cgi-bin|\.php$|\.asp$|\.jsp$|\/etc\/passwd|\.\.\/|\%2e\%2e)/i;

// In-memory sliding window rate limiter
// Window: 10 seconds, Max requests: 120 per window per IP
const RATE_LIMIT_WINDOW_MS = 10_000;
const MAX_REQUESTS_PER_WINDOW = 120;
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

// Periodic cleanup to avoid memory growth in long-running processes
let lastCleanup = Date.now();
function cleanupRateLimitMap() {
  const now = Date.now();
  if (now - lastCleanup > 30_000) {
    lastCleanup = now;
    for (const [ip, record] of rateLimitMap.entries()) {
      if (record.expiresAt < now) {
        rateLimitMap.delete(ip);
      }
    }
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Instantly bypass static assets and sitemap/robots for zero-latency loading
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/fonts") ||
    pathname === "/favicon.ico" ||
    pathname === "/logo.png" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname.endsWith(".png") ||
    pathname.endsWith(".jpg") ||
    pathname.endsWith(".jpeg") ||
    pathname.endsWith(".svg") ||
    pathname.endsWith(".webp") ||
    pathname.endsWith(".avif") ||
    pathname.endsWith(".ico")
  ) {
    const response = NextResponse.next();
    // Cache static assets aggressively
    response.headers.set("Cache-Control", "public, max-age=31536000, immutable");
    return response;
  }

  // 2. Immediate Block for Exploit Scanners & Probes (Zero CPU wasted on 404 rendering)
  if (MALICIOUS_PATH_PATTERN.test(pathname)) {
    return new NextResponse("Access Denied", {
      status: 403,
      headers: { "Content-Type": "text/plain" },
    });
  }

  // 3. User-Agent Scanner / Exploit Bot Check
  const userAgent = request.headers.get("user-agent") ?? "";
  if (userAgent && MALICIOUS_BOT_PATTERN.test(userAgent)) {
    return new NextResponse("Access Denied", {
      status: 403,
      headers: { "Content-Type": "text/plain" },
    });
  }

  // 4. Rate Limiting for dynamic / page requests
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip =
    (forwardedFor ? forwardedFor.split(",")[0]?.trim() : null) ??
    request.headers.get("x-real-ip") ??
    "anonymous";

  cleanupRateLimitMap();

  const now = Date.now();
  const clientRecord = rateLimitMap.get(ip);

  if (!clientRecord || clientRecord.expiresAt < now) {
    rateLimitMap.set(ip, {
      count: 1,
      expiresAt: now + RATE_LIMIT_WINDOW_MS,
    });
  } else {
    clientRecord.count += 1;
    if (clientRecord.count > MAX_REQUESTS_PER_WINDOW) {
      return new NextResponse(
        JSON.stringify({
          error: "Too Many Requests",
          message: "Please slow down. Safe browsing protections are active.",
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": "10",
          },
        }
      );
    }
  }

  // 5. Proceed and append security headers to every response
  const response = NextResponse.next();
  for (const [key, value] of Object.entries(securityHeaders)) {
    response.headers.set(key, value);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
