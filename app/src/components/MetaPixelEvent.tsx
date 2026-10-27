"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Sends a standard Meta Pixel event. Without these the Pixel only saw
 * PageView, so ads could optimize for clicks but never for buyers.
 * `eventId` lets Meta drop a repeat of the same event, e.g. a reload of
 * /checkout/success.
 */
export function trackPixel(
  event: string,
  params: Record<string, unknown>,
  eventId?: string,
) {
  window.fbq?.("track", event, params, eventId ? { eventID: eventId } : undefined);
}

/** Fires one Pixel event when the page renders. */
export function MetaPixelEvent({
  event,
  params,
  eventId,
}: {
  event: string;
  params: Record<string, unknown>;
  eventId?: string;
}) {
  useEffect(() => {
    trackPixel(event, params, eventId);
    // Fire once per page view, not on every re-render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
