import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import { testOnProd } from "@/inngest/functions/test";
import { evaluateCv } from "@/inngest/functions/v2/evaluate-cv";
import { processUploadedCv } from "@/inngest/functions/v2/process-uploaded-cv";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    evaluateCv,
    processUploadedCv,
    testOnProd
  ],
});