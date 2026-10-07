export type Grade = "A" | "B" | "C" | "D" | "F";

export function grade(scorePct: number): Grade {
  if (scorePct >= 85) return "A";
  if (scorePct >= 70) return "B";
  if (scorePct >= 55) return "C";
  if (scorePct >= 40) return "D";
  return "F";
}
