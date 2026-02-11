export interface IContentPreferences{
    content_language: string;
    recommendation_algorithm: string;
    preferred_genres: string[];
    autoplay: boolean;
    username: string
}

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