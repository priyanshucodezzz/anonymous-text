import { z } from "zod";

export const messagesSchema = z.object({
    content: z.string().min(1, "Message cannot be empty").max(300 , "Content must be no longer than 300 characters"),

})