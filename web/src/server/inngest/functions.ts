import { inngest } from "@/server/inngest/client";
import { markPipelineFailed, stepCrawl, stepFacts, stepPackages, stepScore } from "@/server/pipeline";

// Prod execution path (docs/01-architecture.md §2): one Inngest function,
// one step per pipeline phase. Each step shares state through the DB and is
// idempotent on retry (crawl/package rows are replaced, facts/score upserted).
// A step that exhausts its retries marks the report failed before rethrowing,
// so the progress page never polls forever.
export const reportGenerate = inngest.createFunction(
  { id: "report-generate", retries: 2 },
  { event: "report/generate" },
  async ({ event, step }) => {
    const reportId = String(event.data.reportId);
    const crawled = await step.run("crawl", () => stepCrawl(reportId));
    if (!crawled) return { reportId, failed: true };
    try {
      await step.run("facts", () => stepFacts(reportId));
      await step.run("packages", () => stepPackages(reportId));
      await step.run("score", () => stepScore(reportId));
    } catch (err) {
      await step.run("mark-failed", () => markPipelineFailed(reportId, err));
      throw err;
    }
    return { reportId };
  },
);

export const functions = [reportGenerate];
