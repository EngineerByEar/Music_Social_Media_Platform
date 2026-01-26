CREATE TABLE `Users` (
  `user_id` int UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `username` varchar(255) UNIQUE NOT NULL,
  `email` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255) NOT NULL,
  `creation_time` datetime NOT NULL
);

CREATE TABLE `ContentPreferences` (
  `user_id` integer,
  `content_language` varchar(255) NOT NULL,
  `recommendation_algorithm` varchar(255) NOT NULL,
  `autoplay` boolean NOT NULL
);

CREATE TABLE `UISettings` (
  `user_id` integer,
  `ui_language` varchar(255) NOT NULL,
  `theme` varchar(255) NOT NULL
);

CREATE TABLE `Profile` (
  `user_id` integer,
  `profile_picture_url` varchar(255) NOT NULL,
  `profile_description` varchar(255) NOT NULL
);

CREATE TABLE `Posts` (
  `author_id` int,
  `post_id` int UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `post_title` varchar(255) NOT NULL,
  `post_description` varchar(255) NOT NULL,
  `post_image_url` varchar(255) NOT NULL,
  `post_preview_image_url` varchar(255) NOT NULL,
  `post_audio_url` varchar(255) NOT NULL,
  `post_time` datetime NOT NULL,
  `post_duration_seconds` int NOT NULL
);

CREATE TABLE `Comments` (
  `post_id` int,
  `author_id` int,
  `comment_id` int UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `comment` varchar(255) NOT NULL,
  `comment_time` datetime NOT NULL
);

CREATE TABLE `Likes` (
  `user_id` int,
  `post_id` int,
  `like_time` datetime NOT NULL
);

CREATE TABLE `Watchtime` (
  `user_id` int,
  `post_id` int,
  `watch_time_seconds` int NOT NULL,
  `viewed_at` datetime NOT NULL
);

CREATE TABLE `Follows` (
  `following_user` int,
  `followed_user` int
);

CREATE TABLE `PreferredGenres` (
  `user_id` int,
  `preferred_genre` varchar(255) NOT NULL
);

CREATE TABLE `PostTags` (
  `post_id` int,
  `tag` varchar(255) NOT NULL
);

CREATE TABLE `PostAudioGenres` (
  `post_id` int,
  `audio_genre` varchar(255) NOT NULL
);

ALTER TABLE `ContentPreferences` ADD FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`);

ALTER TABLE `UISettings` ADD FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`);

ALTER TABLE `Profile` ADD FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`);

ALTER TABLE `Posts` ADD FOREIGN KEY (`author_id`) REFERENCES `Users` (`user_id`);

ALTER TABLE `Comments` ADD FOREIGN KEY (`post_id`) REFERENCES `Posts` (`post_id`);

ALTER TABLE `Comments` ADD FOREIGN KEY (`author_id`) REFERENCES `Users` (`user_id`);

ALTER TABLE `Likes` ADD FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`);

ALTER TABLE `Likes` ADD FOREIGN KEY (`post_id`) REFERENCES `Posts` (`post_id`);

ALTER TABLE `Watchtime` ADD FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`);

ALTER TABLE `Watchtime` ADD FOREIGN KEY (`post_id`) REFERENCES `Posts` (`post_id`);

ALTER TABLE `Follows` ADD FOREIGN KEY (`following_user`) REFERENCES `Users` (`user_id`);

ALTER TABLE `Follows` ADD FOREIGN KEY (`followed_user`) REFERENCES `Users` (`user_id`);

ALTER TABLE `PreferredGenres` ADD FOREIGN KEY (`user_id`) REFERENCES `ContentPreferences` (`user_id`);

ALTER TABLE `PostTags` ADD FOREIGN KEY (`post_id`) REFERENCES `Posts` (`post_id`);

ALTER TABLE `PostAudioGenres` ADD FOREIGN KEY (`post_id`) REFERENCES `Posts` (`post_id`);
