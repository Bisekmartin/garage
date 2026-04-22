import hoursData from "../../content/hours.json";

export interface DaySchedule {
  day: string;
  label_cs: string;
  label_en: string;
  open: string;
  close: string;
}

export function getSchedule(): DaySchedule[] {
  return hoursData.schedule;
}
