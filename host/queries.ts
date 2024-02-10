import pg from "pg";
import type { RequestOptions } from "./types";

const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "host",
  password: "1234",
  port: 5433,
});

// postgresql://postgres:1234@localhost:5433/postgres
// CREATE DATABASE host;
// \c host
// CREATE TABLE users (
//   ID SERIAL PRIMARY KEY,
//   name VARCHAR(30),
//   email VARCHAR(30)
// );
// CREATE TABLE requests (
//   ID SERIAL PRIMARY KEY,
//   client_name VARCHAR(30),
//   item_name VARCHAR(30),
//   quantity SMALLINT,
//   destination VARCHAR(30),
//   is_urgent BOOLEAN,
//   logging_level SMALLINT,
//   is_fragile BOOLEAN,
//   take_photos BOOLEAN
// );

const getUserByName = (name: string) => {
  pool.query(
    "SELECT * FROM users WHERE name = $1",
    [name],
    (error, results) => {
      if (error) {
        throw error;
      }
      return parseInt(results.rows[0].count);
    }
  );
};

const createRequest = async (
  clientName: string,
  itemName: string,
  quantity: string,
  destination: string,
  options: RequestOptions
) => {
  try {
    const results = await pool.query(
      `INSERT INTO requests (client_name, item_name, quantity, destination, is_urgent, logging_level, is_fragile, take_photos) 
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id`,
      [
        clientName,
        itemName,
        quantity,
        destination,
        options.isUrgent ?? false,
        options.loggingLevel ? (options.loggingLevel === "normal" ? 0 : 1) : 0,
        options.isFragile ?? false,
        options.takePhotos ?? false,
      ]
    );
    console.log(results);
    console.log(`Request created with ID: ${results.rows[0].id}`);
    return results.rows[0].id;
  } catch (error) {
    throw error;
  }
};

export { getUserByName, createRequest };
