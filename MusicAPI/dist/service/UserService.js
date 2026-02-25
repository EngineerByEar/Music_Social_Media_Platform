import { DB } from "../db.js";
export class UserService {
    static async getUserId(username) {
        const query = await DB.query('Select `user_id` from `users`where `username` = ?', [username]);
        const rows = query[0];
        const result = rows[0];
        if (rows.length === 0) {
            return undefined;
        }
        else {
            return result.user_id;
        }
    }
    static async update_content_preferences(data) {
        const user_id = await UserService.getUserId(data.username);
        if (!user_id) {
            return "Token Invalid";
        }
        if (data.preferred_genres) {
            for (const genre of data.preferred_genres) {
                await DB.execute(`
                    INSERT IGNORE INTO preferredgenres (user_id, preferred_genre)
                    Values (?, ?)`, [user_id, genre]);
            }
        }
        const result = await DB.execute(`
            UPDATE contentpreferences 
            SET content_language = ?,
                recommendation_algorithm = ?,
                autoplay = ?
            WHERE user_id = ?`, [data.content_language, data.recommendation_algorithm, data.autoplay, user_id]);
        const resset = result[0];
        if (resset.affectedRows < 1) {
            return "database error | no settings changed";
        }
        else {
            return "updated";
        }
    }
    static async init_content_preferences(data) {
        const user_id = await UserService.getUserId(data.username);
        const result = await DB.execute(`
        INSERT INTO contentpreferences
        (content_language, recommendation_algorithm, autoplay, user_id)
        VALUES (?, ?, ?, ?)`, [data.content_language, data.recommendation_algorithm, data.autoplay, user_id]);
        const resset = result[0];
        if (resset.affectedRows < 1) {
            return "database error | no settings changed";
        }
        else {
            return "updated";
        }
    }
    static async get_content_preferences(user_id) {
        const content_query = await DB.query(`Select content_language, autoplay, recommendation_algorithm from contentpreferences where user_id = ?`, [user_id]);
        const content_rows = content_query[0];
        const content_preferences = content_rows[0];
        const genre_query = await DB.query(`Select preferred_genre from preferredgenres where user_id = ?`, [user_id]);
        const genre_rows = genre_query[0];
        const preferred_genres = genre_rows.map(g => g.preferred_genre);
        if (!preferred_genres || !content_preferences) {
            return "Error loading preferences";
        }
        return {
            content_language: content_preferences.content_language,
            autoplay: content_preferences.autoplay,
            recommendation_algorithm: content_preferences.recommendation_algorithm,
            preferred_genres: preferred_genres
        };
    }
    static async update_ui_settings(data) {
        const user_id = await UserService.getUserId(data.username);
        if (!user_id) {
            return "Token Invalid";
        }
        const result = await DB.execute(`
            UPDATE uisettings 
            SET ui_language = ?,
                theme = ?
            WHERE user_id = ?`, [data.ui_language, data.theme, user_id]);
        const resset = result[0];
        if (resset.affectedRows < 1) {
            return "database error | no settings changed";
        }
        else {
            return "updated";
        }
    }
    static async init_ui_settings(data) {
        const user_id = await UserService.getUserId(data.username);
        await DB.execute(`
            INSERT INTO uisettings
            (ui_language, theme, user_id)  
            VALUES(?, ?, ?)`, [data.ui_language, data.theme, user_id]);
    }
    static async get_ui_settings(user_id) {
        const query = await DB.query(`SELECT ui_language, theme FROM uisettings where user_id = ?`, [user_id]);
        const rows = query[0];
        if (!rows[0]) {
            return "Error loading preferences";
        }
        return rows[0];
    }
    static async update_profile(data) {
        const result = await DB.execute(`
        UPDATE profile
        SET profile_picture_url = ?,
            preview_profile_picture_url = ?,
            profile_description = ?
        WHERE user_id = ?`, [data.profile_image_url, data.profile_image_preview_url, data.profile_description, data.user_id]);
        return "updated";
    }
    static async init_profile(image_url, prev_url, default_description, user_id) {
        const result = await DB.execute(`
        INSERT INTO profile
        (user_id, profile_picture_url, profile_description, preview_profile_picture_url)
        VALUES(?, ?, ?, ?)`, [user_id, image_url, default_description, prev_url]);
        if (!result) {
            return "Error initialising profile";
        }
        return "Profile Initialised";
    }
}
//# sourceMappingURL=UserService.js.map