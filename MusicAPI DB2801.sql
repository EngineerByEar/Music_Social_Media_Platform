CREATE TABLE `Users` (
  `user_id` int UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `username` varchar(255) UNIQUE NOT NULL,
  `email` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255) NOT NULL,
  `creation_time` datetime NOT NULL
);

CREATE TABLE `ContentPreferences` (
  `user_id` integer UNIQUE NOT NULL,
  `content_language` varchar(255) NOT NULL,
  `recommendation_algorithm` varchar(255) NOT NULL,
  `autoplay` boolean NOT NULL
);

CREATE TABLE `UISettings` (
  `user_id` integer UNIQUE NOT NULL,
  `ui_language` varchar(255) NOT NULL,
  `theme` varchar(255) NOT NULL
);

CREATE TABLE `Profile` (
  `user_id` integer UNIQUE NOT NULL,
  `profile_picture_url` varchar(255) NOT NULL,
  `profile_description` varchar(255) NOT NULL
);

CREATE TABLE `Posts` (
  `author_id` int NOT NULL,
  `post_id` int UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `post_title` varchar(255) NOT NULL,
  `post_description` varchar(255) NOT NULL,
  `post_upload_time` datetime NOT NULL
);

CREATE TABLE `Comments` (
  `post_id` int NOT NULL,
  `author_id` int NOT NULL,
  `comment_id` int UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `comment` varchar(255) NOT NULL,
  `comment_time` datetime NOT NULL
);

CREATE TABLE `Likes` (
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  `like_time` datetime NOT NULL
);

CREATE TABLE `Watchtime` (
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  `watch_time_seconds` int NOT NULL,
  `viewed_at` datetime NOT NULL
);

CREATE TABLE `Follows` (
  `following_user` int NOT NULL,
  `followed_user` int NOT NULL
);

CREATE TABLE `PreferredGenres` (
  `user_id` int NOT NULL,
  `preferred_genre` varchar(255) NOT NULL
);

CREATE TABLE `PostTags` (
  `post_id` int NOT NULL,
  `tag` varchar(255) NOT NULL
);

CREATE TABLE `PostAudioGenres` (
  `post_id` int NOT NULL,
  `audio_genre` varchar(255) NOT NULL
);

CREATE TABLE `PostFiles` (
  `post_id` int UNIQUE NOT NULL,
  `post_image_url` varchar(255) NOT NULL,
  `post_preview_image_url` varchar(255) NOT NULL,
  `post_audio_url` varchar(255) NOT NULL
);

CREATE TABLE `PostFeatures` (
  `post_id` int UNIQUE NOT NULL,
  `post_duration_seconds` int NOT NULL
);

CREATE UNIQUE INDEX `Likes_index_0` ON `Likes` (`user_id`, `post_id`);

CREATE UNIQUE INDEX `Watchtime_index_1` ON `Watchtime` (`user_id`, `post_id`);

CREATE UNIQUE INDEX `Follows_index_2` ON `Follows` (`following_user`, `followed_user`);

CREATE UNIQUE INDEX `PostTags_index_3` ON `PostTags` (`post_id`, `tag`);

CREATE UNIQUE INDEX `PostAudioGenres_index_4` ON `PostAudioGenres` (`post_id`, `audio_genre`);

ALTER TABLE `Comments` ADD FOREIGN KEY (`post_id`) REFERENCES `Posts` (`post_id`) ON DELETE CASCADE;

ALTER TABLE `Likes` ADD FOREIGN KEY (`post_id`) REFERENCES `Posts` (`post_id`) ON DELETE CASCADE;

ALTER TABLE `Watchtime` ADD FOREIGN KEY (`post_id`) REFERENCES `Posts` (`post_id`) ON DELETE CASCADE;

ALTER TABLE `PostTags` ADD FOREIGN KEY (`post_id`) REFERENCES `Posts` (`post_id`) ON DELETE CASCADE;

ALTER TABLE `PostAudioGenres` ADD FOREIGN KEY (`post_id`) REFERENCES `Posts` (`post_id`) ON DELETE CASCADE;

ALTER TABLE `PostFiles` ADD FOREIGN KEY (`post_id`) REFERENCES `Posts` (`post_id`) ON DELETE CASCADE;

ALTER TABLE `PostFeatures` ADD FOREIGN KEY (`post_id`) REFERENCES `Posts` (`post_id`) ON DELETE CASCADE;

ALTER TABLE `ContentPreferences` ADD FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE;

ALTER TABLE `UISettings` ADD FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE;

ALTER TABLE `Profile` ADD FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE;

ALTER TABLE `Posts` ADD FOREIGN KEY (`author_id`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE;

ALTER TABLE `Comments` ADD FOREIGN KEY (`author_id`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE;

ALTER TABLE `Likes` ADD FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE;

ALTER TABLE `Watchtime` ADD FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE;

ALTER TABLE `Follows` ADD FOREIGN KEY (`following_user`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE;

ALTER TABLE `Follows` ADD FOREIGN KEY (`followed_user`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE;

ALTER TABLE `PreferredGenres` ADD FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE;
