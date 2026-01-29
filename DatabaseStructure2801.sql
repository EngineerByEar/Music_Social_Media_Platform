-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 28, 2026 at 11:18 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `node_mt241063_10974`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `post_id` int(11) DEFAULT NULL,
  `author_id` int(11) DEFAULT NULL,
  `comment_id` int(11) NOT NULL,
  `comment` varchar(255) NOT NULL,
  `comment_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contentpreferences`
--

CREATE TABLE `contentpreferences` (
  `user_id` int(11) DEFAULT NULL,
  `content_language` varchar(255) NOT NULL,
  `recommendation_algorithm` varchar(255) NOT NULL,
  `autoplay` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `follows`
--

CREATE TABLE `follows` (
  `following_user` int(11) DEFAULT NULL,
  `followed_user` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `user_id` int(11) DEFAULT NULL,
  `post_id` int(11) DEFAULT NULL,
  `like_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `postaudiogenres`
--

CREATE TABLE `postaudiogenres` (
  `post_id` int(11) DEFAULT NULL,
  `audio_genre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `postfeatures`
--

CREATE TABLE `postfeatures` (
  `post_id` int(11) DEFAULT NULL,
  `post_duration_seconds` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `postfiles`
--

CREATE TABLE `postfiles` (
  `post_id` int(11) NOT NULL,
  `post_image_url` varchar(255) NOT NULL,
  `post_preview_image_url` varchar(255) NOT NULL,
  `post_audio_url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `postfiles`
--

INSERT INTO `postfiles` (`post_id`, `post_image_url`, `post_preview_image_url`, `post_audio_url`) VALUES
(4, 'C:\\Users\\Mike\\Desktop\\FH\\3. Semester\\Music_Project\\MusicAPI\\dist\\uploads\\posts\\4\\image.png', 'C:\\Users\\Mike\\Desktop\\FH\\3. Semester\\Music_Project\\MusicAPI\\dist\\uploads\\posts\\4\\preview.jpg', 'C:\\Users\\Mike\\Desktop\\FH\\3. Semester\\Music_Project\\MusicAPI\\dist\\uploads\\posts\\4\\audio.flac'),
(5, 'C:\\Users\\Mike\\Desktop\\FH\\3. Semester\\Music_Project\\MusicAPI\\dist\\uploads\\posts\\5\\image.png', 'C:\\Users\\Mike\\Desktop\\FH\\3. Semester\\Music_Project\\MusicAPI\\dist\\uploads\\posts\\5\\preview.jpg', 'C:\\Users\\Mike\\Desktop\\FH\\3. Semester\\Music_Project\\MusicAPI\\dist\\uploads\\posts\\5\\audio.flac');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `author_id` int(11) DEFAULT NULL,
  `post_id` int(11) NOT NULL,
  `post_title` varchar(255) NOT NULL,
  `post_description` varchar(255) NOT NULL,
  `post_upload_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`author_id`, `post_id`, `post_title`, `post_description`, `post_upload_time`) VALUES
(1, 1, 'asdgasdg', 'asdgasdg', '2026-01-28 11:05:06'),
(1, 2, 'asdgasdg', 'asdgasdg', '2026-01-28 11:05:12'),
(1, 3, 'asdgasdg', 'asdgasdg', '2026-01-28 11:05:27'),
(1, 4, 'asdf', 'asdf', '2026-01-28 11:13:51'),
(1, 5, 'asdf', 'asdf', '2026-01-28 11:14:20');

-- --------------------------------------------------------

--
-- Table structure for table `posttags`
--

CREATE TABLE `posttags` (
  `post_id` int(11) DEFAULT NULL,
  `tag` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `preferredgenres`
--

CREATE TABLE `preferredgenres` (
  `user_id` int(11) DEFAULT NULL,
  `preferred_genre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `profile`
--

CREATE TABLE `profile` (
  `user_id` int(11) DEFAULT NULL,
  `profile_picture_url` varchar(255) NOT NULL,
  `profile_description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `uisettings`
--

CREATE TABLE `uisettings` (
  `user_id` int(11) DEFAULT NULL,
  `ui_language` varchar(255) NOT NULL,
  `theme` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `creation_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `creation_time`) VALUES
(1, 'me', 'me@ui.at', '$2b$10$qXKe1mrXMEr6uGSKfnDScOP9EcKVIGdhHHrSwE7So4YnGhC3KstQ2', '2026-01-28 11:04:33');

-- --------------------------------------------------------

--
-- Table structure for table `watchtime`
--

CREATE TABLE `watchtime` (
  `user_id` int(11) DEFAULT NULL,
  `post_id` int(11) DEFAULT NULL,
  `watch_time_seconds` int(11) NOT NULL,
  `viewed_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `author_id` (`author_id`);

--
-- Indexes for table `contentpreferences`
--
ALTER TABLE `contentpreferences`
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `follows`
--
ALTER TABLE `follows`
  ADD KEY `following_user` (`following_user`),
  ADD KEY `followed_user` (`followed_user`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD KEY `user_id` (`user_id`),
  ADD KEY `post_id` (`post_id`);

--
-- Indexes for table `postaudiogenres`
--
ALTER TABLE `postaudiogenres`
  ADD KEY `post_id` (`post_id`);

--
-- Indexes for table `postfeatures`
--
ALTER TABLE `postfeatures`
  ADD KEY `post_id` (`post_id`);

--
-- Indexes for table `postfiles`
--
ALTER TABLE `postfiles`
  ADD KEY `post_id` (`post_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`post_id`),
  ADD KEY `author_id` (`author_id`);

--
-- Indexes for table `posttags`
--
ALTER TABLE `posttags`
  ADD KEY `post_id` (`post_id`);

--
-- Indexes for table `preferredgenres`
--
ALTER TABLE `preferredgenres`
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `profile`
--
ALTER TABLE `profile`
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `uisettings`
--
ALTER TABLE `uisettings`
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `watchtime`
--
ALTER TABLE `watchtime`
  ADD KEY `user_id` (`user_id`),
  ADD KEY `post_id` (`post_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`author_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `contentpreferences`
--
ALTER TABLE `contentpreferences`
  ADD CONSTRAINT `contentpreferences_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `follows`
--
ALTER TABLE `follows`
  ADD CONSTRAINT `follows_ibfk_1` FOREIGN KEY (`following_user`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `follows_ibfk_2` FOREIGN KEY (`followed_user`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`);

--
-- Constraints for table `postaudiogenres`
--
ALTER TABLE `postaudiogenres`
  ADD CONSTRAINT `postaudiogenres_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`);

--
-- Constraints for table `postfeatures`
--
ALTER TABLE `postfeatures`
  ADD CONSTRAINT `postfeatures_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`);

--
-- Constraints for table `postfiles`
--
ALTER TABLE `postfiles`
  ADD CONSTRAINT `postfiles_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`);

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `posttags`
--
ALTER TABLE `posttags`
  ADD CONSTRAINT `posttags_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`);

--
-- Constraints for table `preferredgenres`
--
ALTER TABLE `preferredgenres`
  ADD CONSTRAINT `preferredgenres_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `contentpreferences` (`user_id`);

--
-- Constraints for table `profile`
--
ALTER TABLE `profile`
  ADD CONSTRAINT `profile_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `uisettings`
--
ALTER TABLE `uisettings`
  ADD CONSTRAINT `uisettings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `watchtime`
--
ALTER TABLE `watchtime`
  ADD CONSTRAINT `watchtime_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `watchtime_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
