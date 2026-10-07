// Piecewise-linear within grade bands; anchors labeled "internal assumption"
// (brief §5: F hotels capture ~10% of potential, A hotels ~70%).
export const captureBands: {
  grade: "A" | "B" | "C" | "D" | "F";
  lo: number;
  hi: number;
  loCapture: number;
  hiCapture: number;
}[] = [
  { grade: "F", lo: 0, hi: 39, loCapture: 0.1, hiCapture: 0.25 },
  { grade: "D", lo: 40, hi: 54, loCapture: 0.25, hiCapture: 0.4 },
  { grade: "C", lo: 55, hi: 69, loCapture: 0.4, hiCapture: 0.55 },
  { grade: "B", lo: 70, hi: 84, loCapture: 0.55, hiCapture: 0.7 },
  { grade: "A", lo: 85, hi: 100, loCapture: 0.7, hiCapture: 0.7 },
];
