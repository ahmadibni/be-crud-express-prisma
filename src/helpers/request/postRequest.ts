import { z } from "zod";

const postRequest = z.object({
  title: z.string(),
  author_name: z.string(),
  content: z.string(),
  published: z.boolean(),
});

export { postRequest };
