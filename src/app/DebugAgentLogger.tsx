"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const DEBUG_ENDPOINT =
  "http://127.0.0.1:7242/ingest/0d18ea4d-2457-4664-b9ba-4027efd79013";

function shouldLogHref(href: string) {
  return /(^|\/)(login(\.html)?)(\?|#|$)/i.test(href) || /signup/i.test(href) || /early-bird/i.test(href);
}

export default function DebugAgentLogger() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams?.toString() || "";

  useEffect(() => {
    // #region agent log
    fetch(
      DEBUG_ENDPOINT,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: "debug-session",
          runId: "next-pre-fix",
          hypothesisId: "H5",
          location: "src/app/DebugAgentLogger.tsx:mount",
          message: "Next.js client logger mounted",
          data: {
            href: String(window.location?.href || ""),
            origin: String(window.location?.origin || ""),
            protocol: String(window.location?.protocol || ""),
            isSecureContext: Boolean(window.isSecureContext),
            userAgent: String(navigator.userAgent || "").slice(0, 120),
          },
          timestamp: Date.now(),
        }),
      }
    ).catch(() => {});
    // #endregion
  }, []);

  useEffect(() => {
    // #region agent log
    fetch(
      DEBUG_ENDPOINT,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: "debug-session",
          runId: "next-pre-fix",
          hypothesisId: "H5",
          location: "src/app/DebugAgentLogger.tsx:route",
          message: "Next.js route observed",
          data: { pathname, search },
          timestamp: Date.now(),
        }),
      }
    ).catch(() => {});
    // #endregion
  }, [pathname, search]);

  useEffect(() => {
    const onClickCapture = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = (target?.closest?.("a[href]") ||
        null) as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href") || "";
      if (!shouldLogHref(href)) return;

      // #region agent log
      fetch(
        DEBUG_ENDPOINT,
        {
          method: "POST",
          keepalive: true,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: "debug-session",
            runId: "next-pre-fix",
            hypothesisId: "H7",
            location: "src/app/DebugAgentLogger.tsx:clickCapture",
            message: "Captured click on auth-related link",
            data: {
              href,
              text: (anchor.textContent || "").trim().slice(0, 80),
              tag: anchor.tagName,
            },
            timestamp: Date.now(),
          }),
        }
      ).catch(() => {});
      // #endregion
    };

    document.addEventListener("click", onClickCapture, true);
    return () => document.removeEventListener("click", onClickCapture, true);
  }, []);

  return null;
}

