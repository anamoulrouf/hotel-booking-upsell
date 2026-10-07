import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "uplayer",
  // Present only when configured; local dev runs the pipeline inline via after().
  key: process.env.INNGEST_EVENT_KEY,
});
