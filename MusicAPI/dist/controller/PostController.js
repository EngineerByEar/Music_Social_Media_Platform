import { validateAuth } from "../auth.js";
import { PostService } from "../service/PostService.js";
import multer from "multer";
import path from "path";
import { dirname } from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import sharp from "sharp";
const storage = multer.memoryStorage();
export const upload = multer({ storage });
export class PostController {
    static async init(app) {
        app.post("/posts", validateAuth, upload.fields([
            { name: "post_image", maxCount: 1 },
            { name: "post_audio", maxCount: 1 },
        ]), PostController.upload_post);
    }
    static async upload_post(req, res) {
        const files = req.files;
        const image = files.post_image[0];
        const audio = files.post_audio[0];
        const data = {
            ...req.body,
            username: req.params._username
        };
        if (!data || !data.username || !data.post_title || !data.post_description || !data.post_audio_genre || !image || !audio) {
            return res.status(400).json({
                "message": "Missing required fields",
                "code": "MISSING_FIELDS"
            });
        }
        const post_id = await PostService.createPost(data);
        const post_dir = path.join(dirname(fileURLToPath(import.meta.url)), `../uploads/posts/${post_id}`);
        fs.mkdirSync(post_dir, { recursive: true });
        const audio_ext = path.extname(audio.originalname);
        const audio_path = path.join(post_dir, "audio" + audio_ext);
        fs.writeFileSync(audio_path, audio.buffer);
        const image_ext = path.extname(image.originalname);
        const image_path = path.join(post_dir, "image" + image_ext);
        fs.writeFileSync(image_path, image.buffer);
        const prev_path = path.join(post_dir, "preview.jpg");
        await sharp(image.buffer)
            .resize(300, 300, { fit: "inside" })
            .jpeg({ quality: 70 })
            .toFile(prev_path);
        await PostService.add_post_files(post_id, audio_path, image_path, prev_path);
        const response = await PostService.get_post(post_id);
        if (response == "post_not_found") {
            res.status(404).json({
                "message": "Post not found. Check Post ID",
                "code": "POST_NOT_FOUND"
            });
            return;
        }
        res.status(200).json(response);
    }
}
//# sourceMappingURL=PostController.js.map