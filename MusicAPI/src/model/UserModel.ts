import { z } from "zod";

export interface IContentPreferences{
    content_language: string;
    recommendation_algorithm: string;
    preferred_genres: string[];
    autoplay: boolean;
    username: string
}
/*
export const ContentPreferencesSchema = z.object({
    content_language: z.string(),
    recommendation_algorithm: z.string(),
    preferred_genres: z.array(z.string()),
    autoplay: z.boolean(),
    username: z.string(),
});

export type IContentPreferences = z.infer<typeof ContentPreferencesSchema>;
*/

export interface IContentQuery{
    content_language: string;
    recommendation_algorithm: string;
    autoplay: boolean;
}

export interface IGenreQuery{
    preferred_genre: string;
}

export interface IContentPreferencesResponse{
    content_language: string;
    recommendation_algorithm: string;
    preferred_genres: string[];
    autoplay: boolean;
}


export interface IUiSettings{
    username: string;
    ui_language: string;
    theme: string;
}

export interface IUiSettingsQuery{
    ui_language: string;
    theme: string;
}

export interface IProfile{
    user_id: number;
    profile_description: string;
    profile_image_url: string;
    profile_image_preview_url: string;
}