import { z } from "zod";
export declare const ContentPreferencesSchema: z.ZodObject<{
    content_language: z.ZodString;
    recommendation_algorithm: z.ZodString;
    preferred_genres: z.ZodArray<z.ZodString, "many">;
    autoplay: z.ZodBoolean;
    username: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    content_language: string;
    recommendation_algorithm: string;
    preferred_genres: string[];
    autoplay: boolean;
}, {
    username: string;
    content_language: string;
    recommendation_algorithm: string;
    preferred_genres: string[];
    autoplay: boolean;
}>;
export type IContentPreferences = z.infer<typeof ContentPreferencesSchema>;
export declare const ContentQuerySchema: z.ZodObject<{
    content_language: z.ZodString;
    recommendation_algorithm: z.ZodString;
    autoplay: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    content_language: string;
    recommendation_algorithm: string;
    autoplay: boolean;
}, {
    content_language: string;
    recommendation_algorithm: string;
    autoplay: boolean;
}>;
export type IContentQuery = z.infer<typeof ContentQuerySchema>;
export declare const GenreQuerySchema: z.ZodObject<{
    preferred_genre: z.ZodString;
}, "strip", z.ZodTypeAny, {
    preferred_genre: string;
}, {
    preferred_genre: string;
}>;
export type IGenreQuery = z.infer<typeof GenreQuerySchema>;
export declare const ContentPreferencesResponseSchema: z.ZodObject<{
    content_language: z.ZodString;
    recommendation_algorithm: z.ZodString;
    preferred_genres: z.ZodArray<z.ZodString, "many">;
    autoplay: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    content_language: string;
    recommendation_algorithm: string;
    preferred_genres: string[];
    autoplay: boolean;
}, {
    content_language: string;
    recommendation_algorithm: string;
    preferred_genres: string[];
    autoplay: boolean;
}>;
export type IContentPreferencesResponse = z.infer<typeof ContentPreferencesResponseSchema>;
export declare const UiSettingsSchema: z.ZodObject<{
    username: z.ZodString;
    ui_language: z.ZodString;
    theme: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    ui_language: string;
    theme: string;
}, {
    username: string;
    ui_language: string;
    theme: string;
}>;
export type IUiSettings = z.infer<typeof UiSettingsSchema>;
export declare const UiSettingsQuerySchema: z.ZodObject<{
    ui_language: z.ZodString;
    theme: z.ZodString;
}, "strip", z.ZodTypeAny, {
    ui_language: string;
    theme: string;
}, {
    ui_language: string;
    theme: string;
}>;
export type IUiSettingsQuery = z.infer<typeof UiSettingsQuerySchema>;
export declare const ProfileSchema: z.ZodObject<{
    user_id: z.ZodNumber;
    profile_description: z.ZodString;
    profile_image_url: z.ZodString;
    profile_image_preview_url: z.ZodString;
}, "strip", z.ZodTypeAny, {
    user_id: number;
    profile_description: string;
    profile_image_url: string;
    profile_image_preview_url: string;
}, {
    user_id: number;
    profile_description: string;
    profile_image_url: string;
    profile_image_preview_url: string;
}>;
export type IProfile = z.infer<typeof ProfileSchema>;
//# sourceMappingURL=UserModel.d.ts.map