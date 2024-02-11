import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import { createRequest } from "./request";
import { getReports } from "./reports";
import { login } from "./authenticate";

// Super secret
const secretKey = "your-secret-key";

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

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

app.post("/", verifyToken, async (req, res) => {
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

app.get("/reports", verifyToken, async (req, res) => {
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

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    await login(email, password);
    const token = jwt.sign({ email }, secretKey);
    res.json({ jwt: token });
  } catch (error) {
    res.status(401).send("Invalid username or password");
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
