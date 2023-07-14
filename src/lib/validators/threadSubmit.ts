import { z } from "zod";

export const ThreadValidator = z.object({
  content: z.any(),
});

export type ThreadCreationRequest = z.infer<typeof ThreadValidator>;
