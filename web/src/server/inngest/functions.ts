import { inngest } from "@/server/inngest/client";
import { stepCrawl, stepFacts, stepPackages, stepScore } from "@/server/pipeline";

// Prod execution path (docs/01-architecture.md §2): one Inngest function,
// one step per pipeline phase. Each step shares state through the DB and is
// idempotent on retry (crawl/package rows are replaced, facts/score upserted).
export const reportGenerate = inngest.createFunction(
  { id: "report-generate", retries: 2 },
  { event: "report/generate" },
  async ({ event, step }) => {
    const reportId = String(event.data.reportId);
    const crawled = await step.run("crawl", () => stepCrawl(reportId));
    if (!crawled) return { reportId, failed: true };
    await step.run("facts", () => stepFacts(reportId));
    await step.run("packages", () => stepPackages(reportId));
    await step.run("score", () => stepScore(reportId));
    return { reportId };
  },
);

export const functions = [reportGenerate];
