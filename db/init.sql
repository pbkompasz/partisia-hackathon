CREATE DATABASE host;

\c host

CREATE TABLE accounts (
  ID SERIAL PRIMARY KEY,
  firstname VARCHAR(30),
  lastname VARCHAR(30),
  email VARCHAR(30),
  password VARCHAR(30),
  role VARCHAR(20),
  address VARCHAR(30),
  contracts JSONB
);

-- TODO Set contracts for demo accounts
INSERT INTO accounts (firstname, lastname, password, email, role, contracts) VALUES ('Demo', 'Manufacturer', 'password', 'manufact@demo.com', 'manufacturer',
  '[{"name": "zk-report", "address": "03dbe4946619e80851afa7c889eda9c012e2476798"}]'
);
INSERT INTO accounts (firstname, lastname, password, email, role, contracts) VALUES ('Demo', 'Driver', 'password', 'driver@demo.com', 'driver',
  '[{"name": "map", "address": "028f19a1d88c7511798eab03f89accf43943047630"}, {"name": "delivery", "address": "02e890dcb482b4c25f1640efb24d16fc21df4ebf25"}]'
);
INSERT INTO accounts (firstname, lastname, password, email, role, contracts) VALUES ('Demo', 'Dispatcher', 'password', 'dispatch@demo.com', 'dispatcher',
  '[{"name": "zk-bidding", "address": "N/A"}]'
);
INSERT INTO accounts (firstname, lastname, password, email, role) VALUES ('George', 'Detective', 'password', 'george@gmail.com', 'driver');

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
  bid_status VARCHAR(30),
  bid_winner INT
);

INSERT INTO requests (
  client_name, item_name, quantity, destination, is_urgent, logging_level, is_fragile, take_photos, bid_status) 
VALUES (
  'demo',
  'book',
  '100',
  'home',
  false,
  1,
  false,
  true,
  'open'
);

CREATE TABLE reports (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(30),
  due_date DATE,
  start_date DATE,
  type VARCHAR(20),
  address VARCHAR(30),
  status VARCHAR(20),
  inputs TEXT[]
);

INSERT INTO reports (
  name,
  due_date,
  start_date,
  type,
  status,
  inputs
) VALUES (
  'Q1 - Sales Report',
  TO_DATE('7 Apr 2024', 'DD Mon YYYY'),
  TO_DATE('1 Apr 2024', 'DD Mon YYYY'),
  'market-eval',
  'upcomming',
  '{"revenue", "gross_margin", "growth_rate"}' 
);

INSERT INTO reports (
  name,
  due_date,
  start_date,
  type,
  status,
  inputs
) VALUES (
  'Q1 - Inventory Report',
  TO_DATE('7 Apr 2024', 'DD Mon YYYY'),
  TO_DATE('1 Apr 2024', 'DD Mon YYYY'),
  'market-eval',
  'upcomming',
  '{"turnover_ratio", "holding_costs", "stock_out_rate"}' 
);

INSERT INTO reports (
  name,
  due_date,
  start_date,
  type,
  status,
  inputs
) VALUES (
  'Q1 - Financial Report',
  TO_DATE('7 Apr 2024', 'DD Mon YYYY'),
  TO_DATE('1 Apr 2024', 'DD Mon YYYY'),
  'market-eval',
  'upcomming',
  '{"profit_margin", "roi", "cash_flow_margin"}' 
);

INSERT INTO reports (
  name,
  due_date,
  start_date,
  type,
  status,
  inputs
) VALUES (
  'Q1 - Forecasting Report',
  TO_DATE('7 Apr 2024', 'DD Mon YYYY'),
  TO_DATE('1 Apr 2024', 'DD Mon YYYY'),
  'market-eval',
  'upcomming',
  '{"accuracy", "bias", "variance"}' 
);

INSERT INTO reports (
  name,
  due_date,
  start_date,
  type,
  status,
  inputs
) VALUES (
  'Q1 - Compliance Report',
  TO_DATE('7 Apr 2024', 'DD Mon YYYY'),
  TO_DATE('1 Apr 2024', 'DD Mon YYYY'),
  'market-eval',
  'upcomming',
  '{"regulatory_rate", "number_of_violations", "penalty_costs"}' 
);

INSERT INTO reports (
  name,
  due_date,
  start_date,
  type,
  status,
  inputs
) VALUES (
  'Q1 - Production Report',
  TO_DATE('7 Apr 2024', 'DD Mon YYYY'),
  TO_DATE('1 Apr 2024', 'DD Mon YYYY'),
  'market-eval',
  'upcomming',
  '{"production_efficiency", "downtime", "scrap_rate"}' 
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


