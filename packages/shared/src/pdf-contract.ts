// Worker /pdf request contract (docs/09 M7).
import { z } from "zod";

export const pdfRequestSchema = z.object({
  url: z.string().url(), // the report's ?print=1 URL — worker renders it headless
});
export type PdfRequest = z.infer<typeof pdfRequestSchema>;
