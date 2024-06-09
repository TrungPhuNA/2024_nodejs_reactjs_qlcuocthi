ALTER TABLE results 
ADD COLUMN content varchar(255) NULL DEFAULT null;




ALTER TABLE results 
ADD COLUMN round_number int NULL default 1,
ADD COLUMN status varchar(255) NULL default 'PENDING',
ADD COLUMN meta_data longtext NULL;

ALTER TABLE competitions 
ADD COLUMN school_id int NULL ALTER TABLE competitions 
ADD COLUMN deadline timestamp NULL;

ALTER TABLE users 
ADD COLUMN school_id int NULL,
ADD COLUMN class_id int NULL;

