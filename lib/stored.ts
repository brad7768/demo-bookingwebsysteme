"use client";

import { useMemo, useSyncExternalStore } from "react";
import { SERVICE_EVENT, SERVICE_KEY } from "./catalog";
import { services as seedServices } from "./data";
import { BOOKING_EVENT, BOOKING_KEY } from "./guest-bookings";
import type { GuestBooking, Service } from "./types";

const SETTINGS_KEY = "lumiere-demo-settings";
const SETTINGS_EVENT = "lumiere-settings";

export type StudioSettings = {
  name: string;
  email: string;
  phone: string;
  address: string;
  confirmations: boolean;
  reminders: boolean;
};

export const defaultSettings: StudioSettings = {
  name: "Lumière Studio",
  email: "hello@lumiere-studio.example",
  phone: "(212) 555-0148",
  address: "48 Atelier Lane, Suite 2, New York, NY 10013",
  confirmations: true,
  reminders: false,
};

function subscribe(eventName: string) {
  return (onChange: () => void) => {
    window.addEventListener(eventName, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(eventName, onChange);
      window.removeEventListener("storage", onChange);
    };
  };
}

function read(key: string) {
  return () => {
    try {
      return window.localStorage.getItem(key) ?? "";
    } catch {
      return "";
    }
  };
}

const subscribeServices = subscribe(SERVICE_EVENT);
const readServices = read(SERVICE_KEY);
const subscribeBookings = subscribe(BOOKING_EVENT);
const readBookings = read(BOOKING_KEY);
const subscribeSettings = subscribe(SETTINGS_EVENT);
const readSettings = read(SETTINGS_KEY);
const empty = () => "";

function isService(value: unknown): value is Service {
  if (!value || typeof value !== "object") return false;
  const service = value as Partial<Service>;
  return (
    typeof service.id === "string" &&
    typeof service.name === "string" &&
    typeof service.price === "number" &&
    typeof service.duration === "number" &&
    typeof service.description === "string" &&
    typeof service.active === "boolean"
  );
}

function parseServices(raw: string): Service[] {
  if (!raw) return seedServices;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return seedServices;
    const valid = parsed.filter(isService);
    return valid.length ? valid : seedServices;
  } catch {
    return seedServices;
  }
}

function isGuestBooking(value: unknown): value is GuestBooking {
  if (!value || typeof value !== "object") return false;
  const booking = value as Partial<GuestBooking>;
  return typeof booking.id === "string" && typeof booking.date === "string" && typeof booking.email === "string" && typeof booking.serviceName === "string";
}

function parseBookings(raw: string): GuestBooking[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isGuestBooking);
  } catch {
    return [];
  }
}

function parseSettings(raw: string): StudioSettings {
  if (!raw) return defaultSettings;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return defaultSettings;
    return { ...defaultSettings, ...(parsed as Partial<StudioSettings>) };
  } catch {
    return defaultSettings;
  }
}

export function useServiceCatalog() {
  const raw = useSyncExternalStore(subscribeServices, readServices, empty);
  return useMemo(() => parseServices(raw), [raw]);
}

export function useGuestBookings() {
  const raw = useSyncExternalStore(subscribeBookings, readBookings, empty);
  return useMemo(() => parseBookings(raw), [raw]);
}

export function useStudioSettings() {
  const raw = useSyncExternalStore(subscribeSettings, readSettings, empty);
  return useMemo(() => parseSettings(raw), [raw]);
}

export function saveStudioSettings(settings: StudioSettings) {
  window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  window.dispatchEvent(new Event(SETTINGS_EVENT));
}
