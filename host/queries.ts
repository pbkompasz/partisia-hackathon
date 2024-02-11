import pg from "pg";
import type { RequestOptions } from "./types";

const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "host",
  password: "1234",
  port: 5433,
});

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

const loginUser = async (email: string, password: string) => {
  try {
    await pool.query("SELECT * FROM users WHERE email = $1 AND password = $2", [
      email,
      password,
    ]);
  } catch (error) {
    throw error;
  }
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

const getReports = async () => {
  try {
    const results = await pool.query("SELECT * FROM reports");
    console.log(results);
    return results.rows;
  } catch (error) {
    throw error;
  }
};

const getOrders = async (manufacturerId: string) => {
  try {
    const results = await pool.query(
      "SELECT * FROM orders WHERE manufacturer_id = $1",
      [manufacturerId]
    );
    console.log(results);
    return results.rows;
  } catch (error) {
    throw error;
  }
};

export { getUserByName, createRequest, getReports, loginUser, getOrders };
