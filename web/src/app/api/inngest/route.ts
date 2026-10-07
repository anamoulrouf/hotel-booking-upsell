import { serve } from "inngest/next";
import { functions } from "@/server/inngest/functions";
import { inngest } from "@/server/inngest/client";

const handler = serve({ client: inngest, functions });

export { handler as POST, handler as GET, handler as PUT };
