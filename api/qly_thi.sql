/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 100427
 Source Host           : localhost:3333
 Source Schema         : qly_thi

 Target Server Type    : MySQL
 Target Server Version : 100427
 File Encoding         : 65001

 Date: 15/04/2024 18:35:32
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for class
-- ----------------------------
DROP TABLE IF EXISTS `class`;
CREATE TABLE `class`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `school_id` int NULL DEFAULT NULL,
  `unit` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `status` smallint NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp,
  `updated_at` timestamp NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `class_pkey`(`id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for competitions
-- ----------------------------
DROP TABLE IF EXISTS `competitions`;
CREATE TABLE `competitions`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `contents` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `author_id` int NULL DEFAULT NULL,
  `status` int NULL DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp,
  `updated_at` timestamp NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `competitions_pkey`(`id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for competitions_criterias
-- ----------------------------
DROP TABLE IF EXISTS `competitions_criterias`;
CREATE TABLE `competitions_criterias`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `competition_id` int NULL DEFAULT NULL,
  `criterias_id` int NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp,
  `updated_at` timestamp NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `competitions_criterias_pkey`(`id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for criterias
-- ----------------------------
DROP TABLE IF EXISTS `criterias`;
CREATE TABLE `criterias`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `contents` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `author_id` int NULL DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp,
  `updated_at` timestamp NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `criterias_pkey`(`id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for judges
-- ----------------------------
DROP TABLE IF EXISTS `judges`;
CREATE TABLE `judges`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NULL DEFAULT 0,
  `competition_id` int NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp,
  `updated_at` timestamp NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `judges_pkey`(`id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for results
-- ----------------------------
DROP TABLE IF EXISTS `results`;
CREATE TABLE `results`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `file` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `user_id` int NULL DEFAULT NULL,
  `competition_id` int NULL DEFAULT NULL,
  `point` float NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp,
  `updated_at` timestamp NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `results_pkey`(`id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for schools
-- ----------------------------
DROP TABLE IF EXISTS `schools`;
CREATE TABLE `schools`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `rector_id` int NULL DEFAULT NULL,
  `status` smallint NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp,
  `updated_at` timestamp NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `schools_pkey`(`id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `username` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `code` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `phone` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `type` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `status` smallint NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp,
  `updated_at` timestamp NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `users_pkey`(`id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
