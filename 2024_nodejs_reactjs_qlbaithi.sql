-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: May 11, 2024 at 03:26 PM
-- Server version: 5.7.34
-- PHP Version: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `2024_nodejs_reactjs_qlbaithi`
--

-- --------------------------------------------------------

--
-- Table structure for table `class`
--

CREATE TABLE `class` (
  `id` int(11) NOT NULL,
  `school_id` int(11) DEFAULT NULL,
  `unit` varchar(255) DEFAULT NULL,
  `name` varchar(191) NOT NULL,
  `status` smallint(6) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `class`
--

INSERT INTO `class` (`id`, `school_id`, `unit`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 2, 'b', 'Lớp B', 1, '2024-04-18 01:56:20', '2024-04-18 02:52:35'),
(2, 1, 'a', 'Lớp A', 1, '2024-04-18 02:45:22', '2024-04-18 02:45:22'),
(3, 1, 'b', 'Lớp 12A', 1, '2024-04-18 02:57:51', '2024-04-18 02:57:51');

-- --------------------------------------------------------

--
-- Table structure for table `competitions`
--

CREATE TABLE `competitions` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `contents` text,
  `author_id` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `competitions`
--

INSERT INTO `competitions` (`id`, `name`, `contents`, `author_id`, `status`, `image`, `created_at`, `updated_at`) VALUES
(1, 'Cuộc thi 1', 'Nội dung 2', 1, 1, NULL, '2024-04-18 04:23:39', '2024-04-29 03:14:28'),
(2, 'Sáng tạo nhân văn', 'Sáng tạo nhân văn', 8, 1, NULL, '2024-04-30 02:49:34', '2024-04-30 02:49:34'),
(3, 'Cuộc thi 2', 'Nội dung', 8, 1, NULL, '2024-05-11 08:06:18', '2024-05-11 08:06:18'),
(4, '2121', '12121', 8, 1, NULL, '2024-05-11 08:06:41', '2024-05-11 08:06:41');

-- --------------------------------------------------------

--
-- Table structure for table `competitions_criterias`
--

CREATE TABLE `competitions_criterias` (
  `id` int(11) NOT NULL,
  `competition_id` int(11) DEFAULT NULL,
  `criterias_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `competitions_criterias`
--

INSERT INTO `competitions_criterias` (`id`, `competition_id`, `criterias_id`, `created_at`, `updated_at`) VALUES
(1, 1, 2, '2024-04-29 03:14:28', '2024-04-29 03:14:28'),
(2, 1, 1, '2024-04-29 03:14:28', '2024-04-29 03:14:28'),
(3, 3, 2, '2024-05-11 08:06:18', '2024-05-11 08:06:18'),
(4, 3, 1, '2024-05-11 08:06:18', '2024-05-11 08:06:18'),
(5, 4, 2, '2024-05-11 08:06:41', '2024-05-11 08:06:41');

-- --------------------------------------------------------

--
-- Table structure for table `criterias`
--

CREATE TABLE `criterias` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `contents` text,
  `author_id` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `criterias`
--

INSERT INTO `criterias` (`id`, `name`, `contents`, `author_id`, `image`, `created_at`, `updated_at`) VALUES
(1, 'Tiêu chí 1', 'Cập nhật', NULL, NULL, '2024-04-18 03:36:08', '2024-04-18 03:48:14'),
(2, 'Thiêu chí 2', 'Nội dung mô tả', NULL, NULL, '2024-04-18 03:52:48', '2024-04-18 03:52:48');

-- --------------------------------------------------------

--
-- Table structure for table `judges`
--

CREATE TABLE `judges` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT '0',
  `competition_id` int(11) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `judges`
--

INSERT INTO `judges` (`id`, `user_id`, `competition_id`, `created_at`, `updated_at`) VALUES
(1, 3, 3, '2024-05-11 08:06:18', '2024-05-11 08:06:18'),
(2, 3, 4, '2024-05-11 08:06:41', '2024-05-11 08:06:41');

-- --------------------------------------------------------

--
-- Table structure for table `results`
--

CREATE TABLE `results` (
  `id` int(11) NOT NULL,
  `file` text,
  `user_id` int(11) DEFAULT NULL,
  `competition_id` int(11) DEFAULT NULL,
  `point` float DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `content` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `results`
--

INSERT INTO `results` (`id`, `file`, `user_id`, `competition_id`, `point`, `created_at`, `updated_at`, `content`) VALUES
(1, NULL, 9, 2, 0, '2024-04-30 07:12:29', '2024-04-30 07:12:29', NULL),
(2, NULL, 9, 1, 0, '2024-04-30 07:13:42', '2024-04-30 07:13:42', NULL),
(3, 'file-e8c2e8e5-8c9d-4046-956a-e8e3572bda3f.docx', 9, 4, 10, '2024-05-11 08:08:43', '2024-05-11 08:09:24', 'Bài tuyệt vời');

-- --------------------------------------------------------

--
-- Table structure for table `schools`
--

CREATE TABLE `schools` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `rector_id` int(11) DEFAULT NULL,
  `status` smallint(6) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `schools`
--

INSERT INTO `schools` (`id`, `name`, `rector_id`, `status`, `created_at`, `updated_at`) VALUES
(1, 'THCS Cù Chính Lan', 2, 1, '2024-04-17 18:32:56', '2024-04-17 18:50:31'),
(2, 'THPT NGuyễn Đức Mậu', 2, 1, '2024-04-18 01:26:49', '2024-04-18 01:26:49');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `username` varchar(191) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `code` varchar(20) DEFAULT NULL,
  `address` text,
  `phone` varchar(191) DEFAULT NULL,
  `type` varchar(191) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `status` smallint(6) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `username`, `avatar`, `code`, `address`, `phone`, `type`, `password`, `status`, `created_at`, `updated_at`) VALUES
(2, 'Phú Phan', 'phupt.humg.94@gmail.com', 'phuphan', NULL, 'MEMBER000002', NULL, NULL, 'RECTOR', '', 1, '2024-04-17 17:56:45', '2024-04-18 01:26:10'),
(3, 'Đức ANh', 'ducanh@gmail.com', 'ducanh', NULL, 'MEMBER000003', '', '', 'TEACHER', '$2b$10$W1.yVNJYDqcr/jPr0GoQz.S0ZMrhV97D1prTw/bxWQwnJ2ZAMTK2W', 1, '2024-04-17 17:58:16', '2024-04-30 02:47:17'),
(4, 'Hoàng Anh', 'hoanganh@gmail.com', 'hoanganh', NULL, 'MEMBER000004', NULL, NULL, 'STUDENT', '123456789', 1, '2024-04-17 18:07:48', '2024-04-17 18:07:48'),
(5, 'Hoàng Anh', 'hoanganh1@gmail.com', 'hoanganh1', NULL, 'MEMBER000005', NULL, NULL, 'STUDENT', '123456789', 1, '2024-04-17 18:10:07', '2024-04-17 18:10:07'),
(6, 'Hoang', 'hoang12121@gmail.com', 'hoang12121', NULL, 'MEMBER000006', NULL, NULL, 'RECTOR', '123456789', 1, '2024-04-17 18:15:20', '2024-04-17 18:15:20'),
(8, 'ADM', 'codethue94@gmail.com', 'codethue94', 'string', 'MEMBER000008', 'Hà Nội', '0909898111', 'RECTOR', '$2b$10$crVULJaIs9Gho9KtHyuRK.ce5OJbMWlibIk6mgIFQjtE1i.i2XGYC', 1, '2024-04-29 01:08:03', '2024-04-29 01:08:03'),
(9, 'SINHVIEN', 'sv@gmail.com', 'sv', 'string', 'MEMBER000009', 'nghean', '0909898112', 'STUDENT', '$2b$10$W1.yVNJYDqcr/jPr0GoQz.S0ZMrhV97D1prTw/bxWQwnJ2ZAMTK2W', 1, '2024-04-29 01:29:54', '2024-04-29 01:29:54');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD UNIQUE KEY `class_pkey` (`id`) USING BTREE;

--
-- Indexes for table `competitions`
--
ALTER TABLE `competitions`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD UNIQUE KEY `competitions_pkey` (`id`) USING BTREE;

--
-- Indexes for table `competitions_criterias`
--
ALTER TABLE `competitions_criterias`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD UNIQUE KEY `competitions_criterias_pkey` (`id`) USING BTREE;

--
-- Indexes for table `criterias`
--
ALTER TABLE `criterias`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD UNIQUE KEY `criterias_pkey` (`id`) USING BTREE;

--
-- Indexes for table `judges`
--
ALTER TABLE `judges`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD UNIQUE KEY `judges_pkey` (`id`) USING BTREE;

--
-- Indexes for table `results`
--
ALTER TABLE `results`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD UNIQUE KEY `results_pkey` (`id`) USING BTREE;

--
-- Indexes for table `schools`
--
ALTER TABLE `schools`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD UNIQUE KEY `schools_pkey` (`id`) USING BTREE;

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD UNIQUE KEY `users_pkey` (`id`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `class`
--
ALTER TABLE `class`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `competitions`
--
ALTER TABLE `competitions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `competitions_criterias`
--
ALTER TABLE `competitions_criterias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `criterias`
--
ALTER TABLE `criterias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `judges`
--
ALTER TABLE `judges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `results`
--
ALTER TABLE `results`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `schools`
--
ALTER TABLE `schools`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
