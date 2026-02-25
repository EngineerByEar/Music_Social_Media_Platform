CREATE TABLE `users` (
  `user_id` int UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `username` varchar(255) UNIQUE NOT NULL,
  `email` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255) NOT NULL,
  `creation_time` datetime NOT NULL
);

CREATE TABLE `contentpreferences` (
  `user_id` integer UNIQUE NOT NULL,
  `content_language` varchar(255) NOT NULL,
  `recommendation_algorithm` varchar(255) NOT NULL,
  `autoplay` boolean NOT NULL
);

CREATE TABLE `uisettings` (
  `user_id` integer UNIQUE NOT NULL,
  `ui_language` varchar(255) NOT NULL,
  `theme` varchar(255) NOT NULL
);

CREATE TABLE `profile` (
  `user_id` integer UNIQUE NOT NULL,
  `profile_picture_url` varchar(255) NOT NULL,
  `preview_profile_picture_url` varchar(255) NOT NULL,
  `profile_description` varchar(255) NOT NULL
);

CREATE TABLE `posts` (
  `author_id` int NOT NULL,
  `post_id` int UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `post_title` varchar(255) NOT NULL,
  `post_description` varchar(255) NOT NULL,
  `post_upload_time` datetime NOT NULL
);

CREATE TABLE `comments` (
  `post_id` int NOT NULL,
  `author_id` int NOT NULL,
  `comment_id` int UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `comment` varchar(255) NOT NULL,
  `comment_time` datetime NOT NULL
);

CREATE TABLE `likes` (
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  `like_time` datetime NOT NULL
);

CREATE TABLE `watchtime` (
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  `total_watch_time_seconds` int NOT NULL DEFAULT 0,
  `completed` bool NOT NULL DEFAULT false,
  `last_viewed_at` datetime NOT NULL,
  `times_watched` int NOT NULL DEFAULT 0
);

CREATE TABLE `follows` (
  `following_user` int NOT NULL,
  `followed_user` int NOT NULL
);

CREATE TABLE `preferredgenres` (
  `user_id` int NOT NULL,
  `preferred_genre` varchar(255) NOT NULL
);

CREATE TABLE `posttags` (
  `post_id` int NOT NULL,
  `tag` varchar(255) NOT NULL
);

CREATE TABLE `postaudiogenres` (
  `post_id` int NOT NULL,
  `audio_genre` varchar(255) NOT NULL
);

CREATE TABLE `postfiles` (
  `post_id` int UNIQUE NOT NULL,
  `post_image_url` varchar(255) NOT NULL,
  `post_preview_image_url` varchar(255) NOT NULL,
  `post_audio_url` varchar(255) NOT NULL
);

CREATE TABLE `postfeatures` (
  `post_id` int UNIQUE NOT NULL,
  `post_duration_seconds` int NOT NULL
);

CREATE TABLE `waveforms` (
  `post_id` int UNIQUE NOT NULL,
  `waveform` varbinary(1000) NOT NULL
);

CREATE UNIQUE INDEX `likes_index_0` ON `likes` (`user_id`, `post_id`);

CREATE UNIQUE INDEX `watchtime_index_1` ON `watchtime` (`user_id`, `post_id`);

CREATE UNIQUE INDEX `follows_index_2` ON `follows` (`following_user`, `followed_user`);

CREATE UNIQUE INDEX `preferredgenres_index_3` ON `preferredgenres` (`user_id`, `preferred_genre`);

CREATE UNIQUE INDEX `posttags_index_4` ON `posttags` (`post_id`, `tag`);

CREATE UNIQUE INDEX `postaudiogenres_index_5` ON `postaudiogenres` (`post_id`, `audio_genre`);

ALTER TABLE `waveforms` ADD FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE;

ALTER TABLE `comments` ADD FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE;

ALTER TABLE `likes` ADD FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE;

ALTER TABLE `watchtime` ADD FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE;

ALTER TABLE `posttags` ADD FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE;

ALTER TABLE `postaudiogenres` ADD FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE;

ALTER TABLE `postfiles` ADD FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE;

ALTER TABLE `postfeatures` ADD FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE;

ALTER TABLE `contentpreferences` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

ALTER TABLE `uisettings` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

ALTER TABLE `profile` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

ALTER TABLE `posts` ADD FOREIGN KEY (`author_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

ALTER TABLE `comments` ADD FOREIGN KEY (`author_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

ALTER TABLE `likes` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

ALTER TABLE `watchtime` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

ALTER TABLE `follows` ADD FOREIGN KEY (`following_user`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

ALTER TABLE `follows` ADD FOREIGN KEY (`followed_user`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

ALTER TABLE `preferredgenres` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;
