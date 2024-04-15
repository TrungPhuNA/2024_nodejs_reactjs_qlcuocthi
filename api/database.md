CREATE TABLE articles  (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  avatar varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  content text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id) USING BTREE
);

CREATE TABLE rooms  (
  id int NOT NULL,
  name varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  user_id int NULL DEFAULT NULL,
  image varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id) USING BTREE
);

CREATE TABLE services  (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  type varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  price float NULL DEFAULT NULL,
  sale float NULL DEFAULT NULL,
  image varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id) USING BTREE
);

CREATE TABLE users  (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  email varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  username varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  password varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  phone varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  code varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  avatar varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  gender varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  type varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'MEMBER',
  status smallint NOT NULL default -1,
  address varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  health_information longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL,
  birthday timestamp NULL DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id) USING BTREE
);

CREATE TABLE users_services  (
  id int NOT NULL AUTO_INCREMENT,
  user_id int NULL DEFAULT NULL,
  service_id int NULL DEFAULT NULL,
  room_id int NULL DEFAULT NULL,
  author_id int NULL DEFAULT NULL,
  time_start datetime NULL DEFAULT NULL,
  time_stop datetime NULL DEFAULT NULL,
  status smallint NULL DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id) USING BTREE
);



<!-- Thêm mới bảng -->
ALTER TABLE users_services 
ADD COLUMN total_price float NULL DEFAULT 0, 
ADD COLUMN payment_status int NULL DEFAULT 1, 
ADD COLUMN payment_type int NULL DEFAULT 1,
ADD COLUMN count int NULL DEFAULT 0,  
ADD COLUMN total_discount float NULL DEFAULT 0;

ALTER TABLE services 
ADD COLUMN status int NULL DEFAULT -1;

CREATE TABLE users_logs  (
  id int NOT NULL AUTO_INCREMENT,
  user_id int NULL DEFAULT NULL,
  user_service_id int NULL DEFAULT NULL,
  type VARCHAR(255) NULL DEFAULT NULL,
  payment_status int NULL DEFAULT NULL,
	payment_type int NULL DEFAULT NULL,
	price float NULL DEFAULT NULL,
	discount int NULL DEFAULT NULL,
  time_start datetime NULL DEFAULT NULL,
  time_stop datetime NULL DEFAULT NULL,
  status smallint NULL DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id) USING BTREE
);


ALTER TABLE users_logs 
ADD COLUMN service_id int NULL DEFAULT null,
ADD COLUMN room_id int NULL DEFAULT null;