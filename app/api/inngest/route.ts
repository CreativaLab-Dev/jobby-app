import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import { analyzeCv } from "@/inngest/functions/analyze-cv";
import { processCv } from "@/inngest/functions/process-cv";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    analyzeCv,
    processCv
  ],
});