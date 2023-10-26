import { z } from "zod";

export const schemap = z.object({
    id: z.string(),
    name: z.string().min(3),
    url_img: z.string(),
    price_in_cent: z.number(),
    desc: z.string().optional(),
    category: z.string(),
  });