import { z } from "zod";
export const ContentPreferencesSchema = z.object({
    content_language: z.string(),
    recommendation_algorithm: z.string(),
    preferred_genres: z.array(z.string()),
    autoplay: z.boolean(),
    username: z.string(),
});
export const ContentQuerySchema = z.object({
    content_language: z.string(),
    recommendation_algorithm: z.string(),
    autoplay: z.boolean(),
});
export const GenreQuerySchema = z.object({
    preferred_genre: z.string(),
});
export const ContentPreferencesResponseSchema = z.object({
    content_language: z.string(),
    recommendation_algorithm: z.string(),
    preferred_genres: z.array(z.string()),
    autoplay: z.boolean(),
});
export const UiSettingsSchema = z.object({
    username: z.string(),
    ui_language: z.string(),
    theme: z.string(),
});
export const UiSettingsQuerySchema = z.object({
    ui_language: z.string(),
    theme: z.string(),
});
export const ProfileSchema = z.object({
    user_id: z.number(),
    profile_description: z.string(),
    profile_image_url: z.string(),
    profile_image_preview_url: z.string(),
});
//# sourceMappingURL=UserModel.js.map