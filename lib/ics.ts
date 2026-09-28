import { toMinutes } from "./utils";

type CalendarInput = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: number;
};

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function localStamp(date: string, time: string) {
  const [year, month, day] = date.split("-");
  const [hours, minutes] = time.split(":");
  return `${year}${month}${day}T${hours}${minutes}00`;
}

function endStamp(date: string, time: string, duration: number) {
  const total = toMinutes(time) + duration;
  const hours = Math.floor(total / 60);
  const minutes = total % 60;
  return localStamp(date, `${pad(hours)}:${pad(minutes)}`);
}

function escapeIcs(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

export function downloadAppointmentIcs(input: CalendarInput) {
  const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Lumiere Studio//Booking Demo//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${input.id}@lumiere-studio.example`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${localStamp(input.date, input.time)}`,
    `DTEND:${endStamp(input.date, input.time, input.duration)}`,
    `SUMMARY:${escapeIcs(input.title)}`,
    `DESCRIPTION:${escapeIcs(input.description)}`,
    `LOCATION:${escapeIcs("Lumière Studio, 48 Atelier Lane, Suite 2, New York")}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "lumiere-studio-appointment.ics";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
