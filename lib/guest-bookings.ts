import type { GuestBooking } from "./types";

export const BOOKING_KEY = "lumiere-demo-bookings";
export const BOOKING_EVENT = "lumiere-bookings";

function isGuestBooking(value: unknown): value is GuestBooking {
  if (!value || typeof value !== "object") return false;
  const booking = value as Partial<GuestBooking>;
  return (
    typeof booking.id === "string" &&
    typeof booking.serviceName === "string" &&
    typeof booking.date === "string" &&
    typeof booking.time === "string" &&
    typeof booking.email === "string"
  );
}

export function loadGuestBookings(): GuestBooking[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(BOOKING_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isGuestBooking);
  } catch {
    return [];
  }
}

export function saveGuestBooking(booking: GuestBooking) {
  const next = [booking, ...loadGuestBookings().filter((item) => item.id !== booking.id)].slice(0, 24);
  window.localStorage.setItem(BOOKING_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(BOOKING_EVENT));
}
