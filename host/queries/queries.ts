import pg from "pg";
import type { RequestOptions } from "../types";

const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "host",
  password: "1234",
  port: 5433,
});

const getAccount = async (id: string) => {
  try {
    const results = await pool.query(
      "SELECT * FROM accounts WHERE id = $1",
      [id]
    );
    return results.rows[0];
  } catch (error) {
    console.log(error);
    return {};
  }
};

const getAccountByEmail = async (email: string) => {
  try {
    const results = await pool.query(
      "SELECT * FROM accounts WHERE email = $1",
      [email]
    );
    return results.rows[0];
  } catch (error) {
    console.log(error);
    return {};
  }
};

const getContracts = async (accountId: string) => {
  try {
    const results = await pool.query(
      "SELECT contracts FROM accounts WHERE id = $1",
      [accountId]
    );
    return results.rows[0];
  } catch (error) {
    console.log(error);
    return {};
  }
};

const loginUser = async (email: string, password: string) => {
  try {
    const results = await pool.query("SELECT * FROM accounts WHERE email = $1 AND password = $2", [
      email,
      password,
    ]);
    console.log(results);
    return results.rows[0];
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
      `INSERT INTO requests (client_name, item_name, quantity, destination, is_urgent, logging_level, is_fragile, take_photos, bid_status) 
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
        "open",
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

export {
  getContracts,
  getAccount,
  getAccountByEmail,
  createRequest,
  getReports,
  loginUser,
  getOrders,
};
