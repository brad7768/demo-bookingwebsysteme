import { services as seedServices } from "./data";
import type { Service } from "./types";

export const SERVICE_KEY = "lumiere-demo-services";
export const SERVICE_EVENT = "lumiere-services";

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

export function loadServices(): Service[] {
  if (typeof window === "undefined") return seedServices;
  try {
    const raw = window.localStorage.getItem(SERVICE_KEY);
    if (!raw) return seedServices;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return seedServices;
    const valid = parsed.filter(isService);
    return valid.length ? valid : seedServices;
  } catch {
    return seedServices;
  }
}

export function saveServices(next: Service[]) {
  window.localStorage.setItem(SERVICE_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(SERVICE_EVENT));
}
