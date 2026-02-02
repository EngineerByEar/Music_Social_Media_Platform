import { IContentPreferences, IContentPreferencesResponse, IProfile, IUiSettings, IUiSettingsQuery } from "../model/UserModel.js";
export interface IUserIdRow {
    user_id: number;
}
export declare class UserService {
    static getUserId(username: string): Promise<number | undefined>;
    static update_content_preferences(data: IContentPreferences): Promise<"Token Invalid" | "database error | no settings changed" | "updated">;
    static init_content_preferences(data: IContentPreferences): Promise<"database error | no settings changed" | "updated">;
    static get_content_preferences(user_id: number): Promise<IContentPreferencesResponse | "Error loading preferences">;
    static update_ui_settings(data: IUiSettings): Promise<"Token Invalid" | "database error | no settings changed" | "updated">;
    static init_ui_settings(data: IUiSettings): Promise<void>;
    static get_ui_settings(user_id: number): Promise<IUiSettingsQuery | "Error loading preferences">;
    static update_profile(data: IProfile): Promise<string>;
    static init_profile(image_url: string, prev_url: string, default_description: string, user_id: number): Promise<"Error initialising profile" | "Profile Initialised">;
}
//# sourceMappingURL=UserService.d.ts.map