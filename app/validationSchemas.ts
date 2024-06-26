import { z } from "zod";

// Only need the title and the description because the server is generating the id, created and updated fields
export const createIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required"),
});
