import {Express, Request, Response} from "express";
import {validateAuth} from "../auth.js";
import {
    ContentPreferencesSchema,
    IContentPreferences,
    IProfile,
    IUiSettings, ProfileSchema,
    UiSettingsSchema
} from "../model/UserModel.js";
import {UserService} from "../service/UserService.js";
import multer from "multer";
import fs from "fs";
import path from "path";
import sharp from "sharp";

const storage = multer.memoryStorage();
export const upload = multer({ storage });

export class UserController {
    static async init(app: Express){
        app.patch("/users/self/content_preferences", validateAuth, UserController.update_content_preferences);
        app.patch("/users/self/ui_settings", validateAuth, UserController.update_ui_settings);
        app.patch("/users/self/profile", validateAuth, upload.single("profile_picture"), UserController.update_profile);
    }

    static async update_content_preferences(req: Request, res: Response){

        const data: IContentPreferences = ContentPreferencesSchema.parse({
          ...req.body,
          username: req.params._username
      });

      if(!data.username){
          res.status(401).json({
              message:"Missing or Expired Token",
              code: "INVALID_CREDENTIALS"
          })
          return;
      }

      if(!data.content_language || !data.recommendation_algorithm || !data.preferred_genres || !data.autoplay){
          res.status(404).json({
              "message": "Missing fields",
              "code": "MISSING_FIELDS",
          })
          return;
      }
      const result = await UserService.update_content_preferences(data);

      if(result == "updated"){
          res.status(200).send();
          return;
      }else if (result == "database error | no settings changed"){
          res.status(400).json({
              "message": "No changes made",
              "code": "NO_CHANGES"
          })
          return;
      }else if(result == "Token Invalid"){
          res.status(401).json({
              message:"Missing User. Probably expired token",
              code: "Expired Token"
          })
          return;
      }

    }

    static async init_content_preferences(username:string){

        const data: IContentPreferences = ContentPreferencesSchema.parse({
            username: username,
            content_language: "en",
            recommendation_algorithm: "content_based",
            autoplay: true,
            preferred_genres: []
        })
        await UserService.init_content_preferences(data);
    }

    static async update_ui_settings(req: Request, res: Response){
        const data: IUiSettings = UiSettingsSchema.parse({
            ...req.body,
            username: req.params._username
        })
        if(!data.username){
            res.status(401).json({
                message:"Missing or Expired Token",
                code: "INVALID_CREDENTIALS"
            })
            return;
        }

        if(!data.ui_language || !data.theme){
            res.status(404).json({
                "message": "Missing fields",
                "code": "MISSING_FIELDS",
            })
            return;
        }

        const result = await UserService.update_ui_settings(data);

        if(result == "updated"){
            res.status(200).send();
            return;
        }
        else if (result == "database error | no settings changed"){
            res.status(400).json({
                "message": "No changes made",
                "code": "NO_CHANGES"
            })
            return;
        }
        else if(result == "Token Invalid"){
            res.status(401).json({
                message:"Missing User. Probably expired token",
                code: "Expired Token"
            })
            return;
        }
    }

    static async init_ui_settings(username: string){
        const data: IUiSettings = UiSettingsSchema.parse({
            username: username,
            ui_language: "en",
            theme: "dark"
        });
        await UserService.init_ui_settings(data);

    }

    static async update_profile(req: Request, res: Response){

        const profile_picture = req.file as Express.Multer.File;
        //Checking for missing fields
            if(!req.params._username){
                res.status(401).json({
                    message:"Missing or Expired Token",
                    code: "INVALID_CREDENTIALS"
                })
                return;
            }

            if(!profile_picture || !req.body.profile_description){
                res.status(404).json({
                    "message": "Missing fields",
                    "code": "MISSING_FIELDS",
                })
                return;
            }

        //Checking if image too big
            if(profile_picture.size > 5000000){
                res.status(400).json({
                    "message": "The image size exceeds the maximum file size of 5MB",
                    "code": "IMAGE_TOO_LARGE"
                })
                return;
            }

            const user_id = await UserService.getUserId(req.params._username as string);

            if(user_id == undefined){
                res.status(401).json({
                    message:"Missing User. Probably expired token",
                    code: "Expired Token"
                })
                return;
            }

        //Create directory to save images to
            const relative_public_url = path.posix.join('/uploads', 'profiles', String(user_id));
            const profile_dir = path.join(process.cwd(), relative_public_url);
            fs.mkdirSync(profile_dir, { recursive: true });

            const image_ext = path.extname(profile_picture.originalname);
            const image_path = path.join(profile_dir, "profile_picture" + image_ext);
            const public_profile_image_url = path.posix.join(relative_public_url, "profile_picture" + image_ext);
            fs.writeFileSync(image_path, profile_picture.buffer);

            const prev_path = path.posix.join(profile_dir, "prev.jpg");
            await sharp(profile_picture.buffer)
                .resize(300, 300, {fit: "inside" })
                .jpeg({quality: 70})
                .toFile(prev_path)
            const prev_public_url = path.posix.join(relative_public_url, 'prev.jpg');

        const data: IProfile = ProfileSchema.parse({
            profile_description: req.body.profile_description,
            profile_image_url: public_profile_image_url,
            profile_image_preview_url: prev_public_url,
            user_id: user_id
        });

        const result = await UserService.update_profile(data);
        if (result == "updated"){
            res.status(200).send();
        }
    }

    static async init_profile(username: string){

        const user_id = await UserService.getUserId(username as string);
        const default_dir = path.posix.join('/uploads', 'default_profile');
        const default_profile_image_url = path.join(default_dir, 'profile_picture.jpg');
        const default_preview_image_url = path.join(default_dir, 'prev.jpg');

        const default_profile_description = "Hey, I´m new on Music Share!"

        await UserService.init_profile(default_profile_image_url, default_preview_image_url, default_profile_description, user_id as number);



    }

}