import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { EventDefinition, ResolvedEvent } from "@/types/event";

const EVENTS_DIR = path.join(process.cwd(), "content", "events");

const DAY_KEYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

function toLocaleDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function parseDateString(s: string): Date {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function loadDefinitions(): EventDefinition[] {
  if (!fs.existsSync(EVENTS_DIR)) return [];
  return fs
    .readdirSync(EVENTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(EVENTS_DIR, file), "utf-8");
      return matter(raw).data as EventDefinition;
    });
}

export function getUpcomingEvents(from: Date, days: number): ResolvedEvent[] {
  const defs = loadDefinitions();
  const themed = defs.filter((e) => e.type === "themed");
  const regular = defs.filter((e) => e.type === "regular");

  const startOfDay = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const result: ResolvedEvent[] = [];
  const themedDates = new Set<string>();

  // Collect themed events in range
  for (const event of themed) {
    if (!event.dates) continue;
    for (const dateStr of event.dates) {
      const date = parseDateString(dateStr);
      const limit = new Date(startOfDay);
      limit.setDate(limit.getDate() + days);
      if (date >= startOfDay && date < limit) {
        themedDates.add(dateStr);
        result.push({ ...event, date: dateStr });
      }
    }
  }

  // Generate regular events for unblocked dates
  for (let i = 0; i < days; i++) {
    const cur = new Date(startOfDay);
    cur.setDate(startOfDay.getDate() + i);
    const dateStr = toLocaleDateString(cur);
    if (themedDates.has(dateStr)) continue;

    const dayKey = DAY_KEYS[cur.getDay()];
    const match = regular.find((e) => e.recurrence?.days.includes(dayKey));
    if (match) result.push({ ...match, date: dateStr });
  }

  return result.sort((a, b) => a.date.localeCompare(b.date));
}

export function getTodayEvent(now: Date): ResolvedEvent | null {
  return getUpcomingEvents(now, 1)[0] ?? null;
}

export function getEventDefinitionBySlug(slug: string): EventDefinition | null {
  return loadDefinitions().find((e) => e.slug === slug) ?? null;
}

export function getNextDatesForSlug(slug: string, from: Date, count: number): string[] {
  const events = getUpcomingEvents(from, 120);
  return events
    .filter((e) => e.slug === slug)
    .slice(0, count)
    .map((e) => e.date);
}

export function getAllEventsByMonth(from: Date, days: number): Record<string, ResolvedEvent[]> {
  const events = getUpcomingEvents(from, days);
  const grouped: Record<string, ResolvedEvent[]> = {};
  for (const event of events) {
    const month = event.date.slice(0, 7); // YYYY-MM
    if (!grouped[month]) grouped[month] = [];
    grouped[month].push(event);
  }
  return grouped;
}
