CREATE DATABASE host;

\c host

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(30),
  email VARCHAR(30),
  password VARCHAR(30),
  role VARCHAR(20)
);

INSERT INTO users (name, email, password, role) VALUES ('Demo Manufacturer', 'password', 'manufact@demo.com', 'manufacturer');
INSERT INTO users (name, email, password, role) VALUES ('Demo Driver', 'password', 'driver@demo.com', 'driver');
INSERT INTO users (name, email, password, role) VALUES ('Demo Dispatcher', 'password', 'driver@demo.com', 'dispatcher');
INSERT INTO users (name, email, password, role) VALUES ('George', 'password', 'george@gmail.com', 'driver');

CREATE TABLE requests (
  ID SERIAL PRIMARY KEY,
  client_name VARCHAR(30),
  item_name VARCHAR(30),
  quantity SMALLINT,
  destination VARCHAR(30),
  is_urgent BOOLEAN,
  logging_level SMALLINT,
  is_fragile BOOLEAN,
  take_photos BOOLEAN,
  bid_winner INT
);

INSERT INTO requests (
  client_name, item_name, quantity, destination, is_urgent, logging_level, is_fragile, take_photos) 
VALUES (
  'demo',
  'book',
  '100',
  'home',
  false,
  1,
  false,
  true
);

CREATE TABLE reports (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(30),
  due_date DATE,
  start_date DATE,
  type VARCHAR(20),
  address VARCHAR(30),
  status VARCHAR(20)
);

INSERT INTO reports (
  name,
  due_date,
  start_date,
  type,
  status
) VALUES (
  'Q1 - Market Evaluation',
  TO_DATE('7 Apr 2024', 'DD Mon YYYY'),
  TO_DATE('1 Apr 2024', 'DD Mon YYYY'),
  'market-eval',
  'upcomming'
);

CREATE TABLE public_reports (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(30),
  due_date DATE,
  start_date DATE,
  type VARCHAR(20),
  address VARCHAR(30),
  status VARCHAR(20)
);

INSERT INTO public_reports (
  name,
  due_date,
  start_date,
  type,
  status
) VALUES (
  'Q1 - Market Evaluation',
  TO_DATE('7 Apr 2024', 'DD Mon YYYY'),
  TO_DATE('1 Apr 2024', 'DD Mon YYYY'),
  'market-eval',
  'upcomming'
);

CREATE TABLE routes (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(30),
  due_date DATE,
  start_location VARCHAR(30),
  destination VARCHAR(30),
  driver INT,
  dispatcher INT,
  manufacturer INT,
  address VARCHAR(30),
  status VARCHAR(20)
);


