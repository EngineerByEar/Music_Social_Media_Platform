import {Express, Request, Response} from "express";
import {validateAuth} from "../auth.js";
import {PostService} from "../service/PostService.js";
import {ICreatePostRequest, IPostPatchRequest} from "../model/PostModel.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import sharp from "sharp";
import {AuthService} from "../service/AuthService.js";

const storage = multer.memoryStorage();
export const upload = multer({ storage });

export class PostController {

    static async init(app: Express) {
        app.post("/post", validateAuth, upload.fields([
            {name: "post_image", maxCount: 1},
            {name: "post_audio", maxCount: 1},
        ]), PostController.upload_post);
        app.patch("/post/:post_id", validateAuth, upload.fields([
            {name: "post_image", maxCount: 1}
        ]), PostController.update_post)

        app.get("/post/:post_id", AuthService.username_from_token, PostController.get_post);
        app.get("/post/:post_id/comments", PostController.get_comments);
        app.get("/genres", PostController.get_genres);
    }

    static get_genres(req: Request, res: Response){
        res.status(200).send(
            ["Rock", "Reggae", "HipHop", "Metal"]
        )
    }

    static async upload_post(req: Request, res: Response) {
        const files = req.files as {
            post_image: Express.Multer.File[];
            post_audio: Express.Multer.File[];
        }

        const image = files.post_image[0]!;
        const audio = files.post_audio[0]!;

        //Error handling for files
        if (audio.size > 25000000) {
            res.status(400).json({
                "message": "The audio file exceeds the maximum file size of 25MB",
                "code": "AUDIO_TOO_LARGE"
            })
            return;
        }

        if (image.size > 5000000) {
            res.status(400).json({
                "message": "The image size exceeds the maximum file size of 5MB",
                "code": "IMAGE_TOO_LARGE"
            })
            return;
        }

        const data: ICreatePostRequest = {
            ...req.body,
            username: req.params._username
        };
        if (!data || !data.username || !data.post_title || !data.post_description || !data.post_audio_genres || !image || !audio) {
            return res.status(400).json({
                "message": "Missing required fields",
                "code": "MISSING_FIELDS"
            })
        }

        if(data.post_tags && data.post_tags?.length > 3 || data.post_audio_genres.length > 3){
            return res.status(400).json({
                "message": "More than 3 post_tags or post_audio_genres",
                "code": "TOO_MANY_TAGS_OR_GENRES"
            })
        }

        //Create Post
        const post_id = await PostService.createPost(data);

        //Create URLs to save post
        const relative_public_url = path.posix.join('/uploads', 'posts', String(post_id));
        const post_dir = path.join(process.cwd(), relative_public_url);
        fs.mkdirSync(post_dir, {recursive: true});


        const audio_ext = path.extname(audio.originalname);
        const audio_path = path.join(post_dir, "audio" + audio_ext);
        fs.writeFileSync(audio_path, audio.buffer);
        const audio_public_url = path.posix.join(relative_public_url, 'audio' + audio_ext);

        const image_path = path.join(post_dir, "image.jpeg");
        await sharp(image.buffer)
            .jpeg()
            .toFile(image_path);
        const image_public_url = path.posix.join(relative_public_url, 'image.jpeg');


        const prev_path = path.join(post_dir, "preview.jpeg");
        await sharp(image.buffer)
            .resize(300, 300, {fit: "inside"})
            .jpeg({quality: 70})
            .toFile(prev_path)
        const prev_public_url = path.posix.join(relative_public_url, 'preview.jpeg');

        //Add File URLs to Database
        await PostService.add_post_files(post_id, audio_public_url, image_public_url, prev_public_url);

        //Add Audio Genres to Database
        await PostService.add_post_genres(post_id, data.post_audio_genres);

        //Add Post Tags to Database
        if (data.post_tags) {
            await PostService.add_post_tags(post_id, data.post_tags);
        }

        await PostService.generate_waveform(post_id, audio_path);


        //Get Post Information for Response
        const response = await PostService.get_post(data.username, post_id);

        if (response == "post_not_found") {
            res.status(404).json({
                "message": "Post not found. Check Post ID",
                "code": "POST_NOT_FOUND"
            })
            return;
        }

        //Send Response
        res.status(200).json(response);

    }

    static async update_post(req: Request, res: Response) {

        //Input Handling
        const files = req.files as {
            post_image?: Express.Multer.File[];
        }
        const image = files.post_image?.[0];

        if (image && image.size > 5000000) {
            res.status(400).json({
                "message": "The image size exceeds the maximum file size of 5MB",
                "code": "IMAGE_TOO_LARGE"
            })
            return;
        }
        const data = {
            ...req.body,
            username: req.params._username,
            post_id: req.params.post_id,
        } as IPostPatchRequest

        if(!await PostService.validate_author(data.post_id, data.username)){
            res.status(403).json({
                "message": "You are not the author of this post",
                "code": "NOT_POST_AUTHOR"
            })
            return;
        }

        if(data.post_tags && data.post_tags?.length > 3 || data.post_audio_genres && data.post_audio_genres.length > 3){
            return res.status(400).json({
                "message": "More than 3 post_tags or post_audio_genres",
                "code": "TOO_MANY_TAGS_OR_GENRES"
            })
        }


        if(image){
            //Create URLs to save post
            const relative_public_url = path.posix.join('/uploads', 'posts', String(req.params.post_id));
            const post_dir = path.join(process.cwd(), relative_public_url);
            fs.mkdirSync(post_dir, {recursive: true});

            const image_path = path.join(post_dir, "image.jpeg");
            await sharp(image.buffer)
                .jpeg()
                .toFile(image_path);

            const prev_path = path.join(post_dir, "preview.jpg");
            await sharp(image.buffer)
                .resize(300, 300, {fit: "inside"})
                .jpeg({quality: 70})
                .toFile(prev_path)
        }

        await PostService.update_post(data);

        if(data.post_audio_genres){
            await PostService.update_post_genres(data.post_id, data.post_audio_genres);
        }
        if(data.post_tags){
            await PostService.update_post_tags(data.post_id, data.post_tags);
        }

        res.status(200).json(await PostService.get_post(data.username, data.post_id));
    }

    static async get_post(req: Request, res: Response) {
        const post_id = Number(req.params.post_id);
        if (isNaN(post_id) || post_id == 0) {
            res.status(400).json({
                "message": "Invalid post ID (Not a Number or 0)",
                "code": "INVALID_POST_ID"
            })
            return;
        }
        const username = req.params._username as string| undefined;
        console.log(username)

        const response = await PostService.get_post(username, post_id);
        if (response == "post_not_found") {
            res.status(404).json({
                "message": "Post not found. Check Post ID",
                "code": "POST_NOT_FOUND"
            })
            return;
        }
        res.status(200).json(response);
    }

    static async get_comments(req: Request, res: Response) {

        const post_id = Number(req.params.post_id);
        if (isNaN(post_id) || post_id == 0) {
            res.status(400).json({
                "message": "Input is not a number or 0",
                "code": "INVALID_INPUT"
            })
        }
        const response = await PostService.get_all_comments(post_id);
        res.status(200).json(response);
    }


}