-- \copy reviews (id,product_id,rating,rev_date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness)
-- from './reviews.csv'
-- with (header true, format csv);

-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'product_details'
-- 
-- ---

DROP TABLE IF EXISTS product_details;
		
CREATE TABLE product_details (
  id SERIAL,
  product_id INTEGER NULL DEFAULT NULL,
  review_id INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (product_id)
);

-- ---
-- Table 'reviews'
-- 
-- ---

DROP TABLE IF EXISTS reviews;
		
CREATE TABLE reviews (
  id SERIAL,
  product_id INTEGER NULL DEFAULT NULL,
  rating INTEGER NULL DEFAULT NULL,
  rev_date TEXT NULL DEFAULT NULL,
  summary TEXT NULL DEFAULT NULL,
  body TEXT NULL DEFAULT NULL,
  recommend BOOLEAN NULL DEFAULT NULL,
  reported BOOLEAN NULL DEFAULT NULL,
  reviewer_name TEXT NULL DEFAULT NULL,
  reviewer_email TEXT NULL DEFAULT NULL,
  response TEXT NULL DEFAULT NULL,
  helpfulness INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'photos'
-- 
-- ---

DROP TABLE IF EXISTS photos;
		
CREATE TABLE photos (
  id SERIAL,
  review_id INTEGER NULL DEFAULT NULL,
  url_str VARCHAR NULL DEFAULT NULL
-- KEY (review_id)
);

-- CREATE INDEX review_id ON photos;

-- ---
-- Table 'characteristics'
-- 
-- ---

DROP TABLE IF EXISTS characteristics;
		
CREATE TABLE characteristics (
  id SERIAL,
  product_id INTEGER NULL DEFAULT NULL,
  char_name CHAR NULL DEFAULT NULL
-- KEY (product_id)
);

-- ---
-- Table 'characteristics_rev'
-- 
-- ---

DROP TABLE IF EXISTS characteristics_rev;
		
CREATE TABLE characteristics_rev (
  id SERIAL,
  review_id INTEGER NULL DEFAULT NULL,
  characteristic_id INTEGER NULL DEFAULT NULL,
  char_value INTEGER NULL DEFAULT NULL
-- KEY (review_id)
);

-- ---
-- Foreign Keys 
-- ---

-- ALTER TABLE product_details ADD FOREIGN KEY (review_id) REFERENCES reviews (id);
-- ALTER TABLE reviews ADD FOREIGN KEY (product_id) REFERENCES product_details (product_id);
-- ALTER TABLE photos ADD FOREIGN KEY (review_id) REFERENCES reviews (id);
-- ALTER TABLE characteristics ADD FOREIGN KEY (product_id) REFERENCES product_details (product_id);
-- ALTER TABLE characteristics_rev ADD FOREIGN KEY (review_id) REFERENCES reviews (id);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `product_details` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `reviews` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `photos` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `characteristics` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `characteristics_rev` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `product_details` (`id`,`product_id`,`review_id`) VALUES
-- ('','','');
-- INSERT INTO `reviews` (`id`,`product_id`,`rating`,`date`,`summary`,`body`,`recommend`,`reported`,`reviewer_name`,`reviewer_email`,`response`,`helpfulness`) VALUES
-- ('','','','','','','','','','','','');
-- INSERT INTO `photos` (`id`,`review_id`,`url`) VALUES
-- ('','','');
-- INSERT INTO `characteristics` (`id`,`product_id`,`name`) VALUES
-- ('','','');
-- INSERT INTO `characteristics_rev` (`id`,`review_id`,`characteristic_id`,`value`) VALUES
-- ('','','','');