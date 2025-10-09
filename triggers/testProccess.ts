import { task } from "@trigger.dev/sdk/v3";

export const processCv = task({
  id: "process-cv",
  run: async (payload: { cvUrl: string }) => {
    console.log("Processing CV:", payload.cvUrl);
    await new Promise((r) => setTimeout(r, 5000)); // simulate work
    console.log("Done!");
    return { success: true };
  },
});