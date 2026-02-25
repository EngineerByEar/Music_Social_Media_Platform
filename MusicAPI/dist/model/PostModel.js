import { z } from "zod";
export const CreatePostRequestSchema = z.object({
    post_title: z.string(),
    post_description: z.string(),
    post_tags: z.array(z.string()).optional(),
    post_audio_genres: z.array(z.string()),
    username: z.string(),
});
export const PostPatchRequestSchema = z.object({
    post_title: z.string().optional(),
    post_description: z.string().optional(),
    post_tags: z.array(z.string()).optional(),
    post_audio_genres: z.array(z.string()).optional(),
    username: z.string(),
    post_id: z.number(),
});
//# sourceMappingURL=PostModel.js.map