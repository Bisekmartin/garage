export type Locale = "cs" | "en";

export type DresscodeMode = "none" | "suggested" | "strict";

export interface Dresscode {
  mode: DresscodeMode;
  items: string[];
  allowed: string[];
}

export interface Partner {
  name: string;
  url: string;
  presale_url: string | null;
}

export interface Price {
  amount: number;
  currency: string;
}

export interface EventDefinition {
  title: string;
  title_en: string;
  slug: string;
  type: "regular" | "themed";
  recurrence?: { days: string[] };
  dates?: string[];
  start_time: string;
  end_time: string;
  price: Price;
  dresscode: Dresscode;
  description_cs: string;
  description_en: string;
  partner?: Partner;
  poster: string | null;
}

export interface ResolvedEvent extends EventDefinition {
  /** YYYY-MM-DD — concrete occurrence date */
  date: string;
}
