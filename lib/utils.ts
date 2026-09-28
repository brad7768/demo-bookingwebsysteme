export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function startOfDay(date: Date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

export function startOfWeek(date: Date) {
  const next = startOfDay(date);
  const day = next.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  next.setDate(next.getDate() + diff);
  return next;
}

export function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function addMonths(date: Date, months: number) {
  const next = new Date(date);
  next.setMonth(next.getMonth() + months);
  return next;
}

export function toISODate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseISODate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year ?? 1970, (month ?? 1) - 1, day ?? 1);
}

export function toMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return (hours ?? 0) * 60 + (minutes ?? 0);
}

export function formatMoney(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPrice(price: number) {
  return price === 0 ? "Free" : formatMoney(price);
}

export function formatDuration(minutes: number) {
  return `${minutes} min`;
}

export function formatLongDate(iso: string) {
  return parseISODate(iso).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function formatWeekdayShort(date: Date) {
  return date.toLocaleDateString("en-US", { weekday: "short" });
}

export function formatMonthDay(date: Date) {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function formatMonthYear(date: Date) {
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export function sameDay(a: Date, b: Date) {
  return toISODate(a) === toISODate(b);
}

export function greeting(date: Date) {
  const hour = date.getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function closingMinutes(iso: string) {
  const day = parseISODate(iso).getDay();
  if (day === 0) return null;
  if (day === 6) return 17 * 60;
  return 19 * 60;
}

export function nextOpenDate(from: Date) {
  const next = startOfDay(from);
  if (next.getDay() === 0) next.setDate(next.getDate() + 1);
  return next;
}

export function customerName(firstName: string, lastName: string) {
  return `${firstName} ${lastName}`.trim();
}
