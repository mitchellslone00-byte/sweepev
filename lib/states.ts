import statesData from "@/data/states.json";

export type StateStatus = "available" | "iffy" | "banned";

export type StateInfo = {
  code: string;
  name: string;
  status: StateStatus;
  note: string | null;
  /** URL slug derived from the name, e.g. "new-york". */
  slug: string;
};

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const states: StateInfo[] = (statesData as Omit<StateInfo, "slug">[]).map((s) => ({
  ...s,
  slug: slugify(s.name),
}));

export const stateByCode: Record<string, StateInfo> = Object.fromEntries(
  states.map((s) => [s.code, s])
);

export const stateBySlug: Record<string, StateInfo> = Object.fromEntries(
  states.map((s) => [s.slug, s])
);

export const STATUS_LABEL: Record<StateStatus, string> = {
  available: "Available",
  iffy: "Gray area",
  banned: "Banned",
};

export function statusCounts(): Record<StateStatus, number> {
  return states.reduce(
    (acc, s) => {
      // DC isn't a state; keep it out of the headline counts.
      if (s.code !== "DC") acc[s.status] += 1;
      return acc;
    },
    { available: 0, iffy: 0, banned: 0 } as Record<StateStatus, number>
  );
}
