// Vercel Blob storage for report PDFs (brief §11). Gated on
// BLOB_READ_WRITE_TOKEN — unset ⇒ null and the email links the live report
// instead (graceful, honest).
import { put } from "@vercel/blob";

export function blobConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export async function putReportPdf(pdf: Uint8Array, token: string): Promise<string | null> {
  if (!blobConfigured()) return null;
  try {
    const blob = await put(`reports/${token}.pdf`, new Blob([pdf as BlobPart], { type: "application/pdf" }), {
      access: "public",
      contentType: "application/pdf",
    });
    return blob.url;
  } catch {
    return null;
  }
}
