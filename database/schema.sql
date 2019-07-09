DROP DATABASE IF EXISTS related_products

CREATE DATABASE related_products;

USE related_products;

CREATE TABLE products (
  id INT NOT NULL,
  name VARCHAR(200),
  price VARCHAR(20),
  style_ids JSON,
  PRIMARY KEY id auto_increment,
  FOREIGN KEY style_ids
);

CREATE TABLE styles (
  id INT,
  name VARCHAR(200),
  img_url VARCHAR(500)
);

/*  To execute:
 *    mysql -u root < server/schema.sql
 */