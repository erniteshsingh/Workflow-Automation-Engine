import { z } from "zod";

export const createWorkflowSchema = z.object({
  body: z.object({
    name: z
      .string({
        error: "Workflow name is required",
      })
      .trim()
      .min(3, "Workflow name must be at least 3 characters")
      .max(100, "Workflow name cannot exceed 100 characters"),

    description: z
      .string()
      .trim()
      .max(500, "Description cannot exceed 500 characters")
      .optional(),

    status: z.enum(["active", "inactive"]).optional(),
  }),
});
export default createWorkflowSchema;
