DROP DATABASE IF EXISTS related_products;

CREATE DATABASE related_products;

USE related_products;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(200),
  price VARCHAR(20),
  styles JSON,
  style_thumbnails JSON,
  PRIMARY KEY (id)
);
