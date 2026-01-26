-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 24, 2026 at 09:43 PM
-- Server version: 10.6.22-MariaDB-0ubuntu0.22.04.1
-- PHP Version: 8.1.2-1ubuntu2.22

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
-- Table structure for table `Comments`
--

CREATE TABLE `Comments` (
  `post_id` int(11) DEFAULT NULL,
  `author_id` int(11) DEFAULT NULL,
  `comment_id` int(11) NOT NULL,
  `comment` varchar(255) NOT NULL,
  `comment_time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ContentPreferences`
--

CREATE TABLE `ContentPreferences` (
  `user_id` int(11) DEFAULT NULL,
  `content_language` varchar(255) NOT NULL,
  `recommendation_algorithm` varchar(255) NOT NULL,
  `autoplay` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Follows`
--

CREATE TABLE `Follows` (
  `following_user` int(11) DEFAULT NULL,
  `followed_user` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Likes`
--

CREATE TABLE `Likes` (
  `user_id` int(11) DEFAULT NULL,
  `post_id` int(11) DEFAULT NULL,
  `like_time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `PostAudioGenres`
--

CREATE TABLE `PostAudioGenres` (
  `post_id` int(11) DEFAULT NULL,
  `audio_genre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Posts`
--

CREATE TABLE `Posts` (
  `author_id` int(11) DEFAULT NULL,
  `post_id` int(11) NOT NULL,
  `post_title` varchar(255) NOT NULL,
  `post_description` varchar(255) NOT NULL,
  `post_image_url` varchar(255) NOT NULL,
  `post_preview_image_url` varchar(255) NOT NULL,
  `post_audio_url` varchar(255) NOT NULL,
  `post_time` datetime NOT NULL DEFAULT current_timestamp(),
  `post_duration_seconds` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `PostTags`
--

CREATE TABLE `PostTags` (
  `post_id` int(11) DEFAULT NULL,
  `tag` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `PreferredGenres`
--

CREATE TABLE `PreferredGenres` (
  `user_id` int(11) DEFAULT NULL,
  `preferred_genre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Profile`
--

CREATE TABLE `Profile` (
  `user_id` int(11) DEFAULT NULL,
  `profile_picture_url` varchar(255) NOT NULL,
  `profile_description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `UISettings`
--

CREATE TABLE `UISettings` (
  `user_id` int(11) DEFAULT NULL,
  `ui_language` varchar(255) NOT NULL,
  `theme` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `creation_time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Watchtime`
--

CREATE TABLE `Watchtime` (
  `user_id` int(11) DEFAULT NULL,
  `post_id` int(11) DEFAULT NULL,
  `watch_time_seconds` int(11) NOT NULL,
  `viewed_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Comments`
--
ALTER TABLE `Comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `author_id` (`author_id`);

--
-- Indexes for table `ContentPreferences`
--
ALTER TABLE `ContentPreferences`
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `Follows`
--
ALTER TABLE `Follows`
  ADD KEY `following_user` (`following_user`),
  ADD KEY `followed_user` (`followed_user`);

--
-- Indexes for table `Likes`
--
ALTER TABLE `Likes`
  ADD KEY `user_id` (`user_id`),
  ADD KEY `post_id` (`post_id`);

--
-- Indexes for table `PostAudioGenres`
--
ALTER TABLE `PostAudioGenres`
  ADD KEY `post_id` (`post_id`);

--
-- Indexes for table `Posts`
--
ALTER TABLE `Posts`
  ADD PRIMARY KEY (`post_id`),
  ADD KEY `author_id` (`author_id`);

--
-- Indexes for table `PostTags`
--
ALTER TABLE `PostTags`
  ADD KEY `post_id` (`post_id`);

--
-- Indexes for table `PreferredGenres`
--
ALTER TABLE `PreferredGenres`
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `Profile`
--
ALTER TABLE `Profile`
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `UISettings`
--
ALTER TABLE `UISettings`
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `Watchtime`
--
ALTER TABLE `Watchtime`
  ADD KEY `user_id` (`user_id`),
  ADD KEY `post_id` (`post_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Comments`
--
ALTER TABLE `Comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Posts`
--
ALTER TABLE `Posts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Comments`
--
ALTER TABLE `Comments`
  ADD CONSTRAINT `Comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `Posts` (`post_id`),
  ADD CONSTRAINT `Comments_ibfk_2` FOREIGN KEY (`author_id`) REFERENCES `Users` (`user_id`);

--
-- Constraints for table `ContentPreferences`
--
ALTER TABLE `ContentPreferences`
  ADD CONSTRAINT `ContentPreferences_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`);

--
-- Constraints for table `Follows`
--
ALTER TABLE `Follows`
  ADD CONSTRAINT `Follows_ibfk_1` FOREIGN KEY (`following_user`) REFERENCES `Users` (`user_id`),
  ADD CONSTRAINT `Follows_ibfk_2` FOREIGN KEY (`followed_user`) REFERENCES `Users` (`user_id`);

--
-- Constraints for table `Likes`
--
ALTER TABLE `Likes`
  ADD CONSTRAINT `Likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`),
  ADD CONSTRAINT `Likes_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `Posts` (`post_id`);

--
-- Constraints for table `PostAudioGenres`
--
ALTER TABLE `PostAudioGenres`
  ADD CONSTRAINT `PostAudioGenres_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `Posts` (`post_id`);

--
-- Constraints for table `Posts`
--
ALTER TABLE `Posts`
  ADD CONSTRAINT `Posts_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `Users` (`user_id`);

--
-- Constraints for table `PostTags`
--
ALTER TABLE `PostTags`
  ADD CONSTRAINT `PostTags_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `Posts` (`post_id`);

--
-- Constraints for table `PreferredGenres`
--
ALTER TABLE `PreferredGenres`
  ADD CONSTRAINT `PreferredGenres_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `ContentPreferences` (`user_id`);

--
-- Constraints for table `Profile`
--
ALTER TABLE `Profile`
  ADD CONSTRAINT `Profile_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`);

--
-- Constraints for table `UISettings`
--
ALTER TABLE `UISettings`
  ADD CONSTRAINT `UISettings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`);

--
-- Constraints for table `Watchtime`
--
ALTER TABLE `Watchtime`
  ADD CONSTRAINT `Watchtime_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`),
  ADD CONSTRAINT `Watchtime_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `Posts` (`post_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
