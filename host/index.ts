import express from "express";
import bodyParser from "body-parser";
import { createRequest } from "./request";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Manufacturer name
// Item name
// Quantity
// Destination
// Options
//   Urgent
//   Logging level: 'normal', 'high'
//   Fragile
//   Take photos
app.post('/', async (req, res) => {
  console.log(req.body);
  let { client_name: clientName, item_name: itemName, quantity, destination, options = {}} = req.body;
  options = {
    ...options,
    loggingLevel: options.logging_level,
    takePhotos: options.take_photos,
  };

  if (!clientName || !itemName || !quantity || !destination) {
    return res.status(400).send({
      message: 'Body incomplete',
    });
  }
  
  let id;

  try {
    id = await createRequest(clientName, itemName, quantity, destination, options);   
  } catch (error) {
    res.status(500).send({
      message: 'Internal server error',
    })    
  }

  res.status(201).send({
      message: 'Created',
      id,
    });
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
