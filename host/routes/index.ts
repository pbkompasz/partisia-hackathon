import jwt from "jsonwebtoken";
import express, { Request, Response, NextFunction } from "express";
import { createRequest } from "./request";
import { getReports } from "./reports";
import { login } from "./authenticate";
import { getAccount, getContracts, } from "../queries/queries";

// Super secret
const secretKey = "your-secret-key";
const router = express.Router();

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const jwt_token = req.headers['authorization'];
  console.log(jwt_token);
  if (!jwt_token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(jwt_token.split(' ')[1], secretKey);
    console.log(decoded)
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send('Invalid token.');
  }
};

router.post("/", verifyToken, async (req, res) => {
  console.log(req.body);
  let {
    client_name: clientName,
    item_name: itemName,
    quantity,
    destination,
    options = {},
  } = req.body;
  options = {
    ...options,
    loggingLevel: options.logging_level,
    takePhotos: options.take_photos,
  };

  if (!clientName || !itemName || !quantity || !destination) {
    return res.status(400).send({
      message: "Body incomplete",
    });
  }

  let id;

  try {
    id = await createRequest(
      clientName,
      itemName,
      quantity,
      destination,
      options
    );
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
    });
  }

  res.status(201).send({
    message: "Created",
    id,
  });
});

router.get("/reports", verifyToken, async (req, res) => {
  let reports;
  try {
    reports = await getReports();
    console.log(reports);
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
    });
  }
  res.json({
    reports,
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const account = await login(email, password);
    const token = jwt.sign({ email }, secretKey);
    res.json({ jwt: token, account });
  } catch (error) {
    console.log(error);
    res.status(401).send("Invalid username or password");
  }
});

router.get("/account/:accountId", async (req, res) => {
  const userId = req.params.accountId;
  try {
    const account = await getAccount(userId);
    console.log(account)
    res.json({ account, });
  } catch (error) {
    res.status(401).send("Invalid id");
  }
});

router.get("/account/:accountId/contracts", async (req, res) => {
  const userId = req.params.accountId;
  try {
    const contracts = await getContracts(userId);
    res.json({ contracts, });
  } catch (error) {
    res.status(401).send("Invalid id");
  }
});

export default router;
