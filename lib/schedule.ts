import { closingMinutes, toMinutes } from "./utils";

export const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
];

const featuredOpen = new Set(["09:00", "09:30", "10:00", "11:00", "13:00", "14:30", "15:00", "16:30"]);
const usuallyBooked = new Set(["10:30", "12:00", "12:30", "13:30", "14:00", "16:00", "17:30"]);

export type SlotState = "open" | "booked" | "short";

export function slotsFor(professionalId: string, dateISO: string, duration: number) {
  const close = closingMinutes(dateISO);
  const vary = hash(`${professionalId}:${dateISO}`) % 2 === 0 ? "11:30" : "15:30";

  return timeSlots.map((time) => {
    const start = toMinutes(time);
    const fits = close !== null && start + duration <= close;
    if (!fits) return { time, state: "short" as SlotState };
    const booked = !featuredOpen.has(time) && (usuallyBooked.has(time) || time === vary);
    return { time, state: (booked ? "booked" : "open") as SlotState };
  });
}

function hash(value: string) {
  let total = 0;
  for (let index = 0; index < value.length; index += 1) {
    total = (total * 33 + value.charCodeAt(index)) >>> 0;
  }
  return total;
}

export type LaidOut<T extends { time: string; duration: number }> = T & {
  col: number;
  cols: number;
};

export function layoutDay<T extends { time: string; duration: number }>(items: T[]): LaidOut<T>[] {
  const sorted = [...items].sort((a, b) => a.time.localeCompare(b.time) || b.duration - a.duration);
  const positioned: LaidOut<T>[] = [];
  let cluster: T[] = [];
  let clusterEnd = -1;

  const flush = () => {
    if (!cluster.length) return;
    const columnEnds: number[] = [];
    const placed: { item: T; col: number }[] = [];
    cluster.forEach((item) => {
      const start = toMinutes(item.time);
      const end = start + item.duration;
      let column = columnEnds.findIndex((endAt) => endAt <= start);
      if (column === -1) {
        column = columnEnds.length;
        columnEnds.push(end);
      } else {
        columnEnds[column] = end;
      }
      placed.push({ item, col: column });
    });
    const columns = Math.max(columnEnds.length, 1);
    placed.forEach((entry) => positioned.push({ ...entry.item, col: entry.col, cols: columns }));
    cluster = [];
    clusterEnd = -1;
  };

  sorted.forEach((item) => {
    const start = toMinutes(item.time);
    const end = start + item.duration;
    if (cluster.length && start >= clusterEnd) flush();
    cluster.push(item);
    clusterEnd = Math.max(clusterEnd, end);
  });
  flush();
  return positioned;
}
