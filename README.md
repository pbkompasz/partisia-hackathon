
# Partisia Hackathon - Supply-Chain Management Solution

## Description

This project was submitted to the 2023-2024 Partisia Hackathon.
The proposed web application is a blockchain-based Supply-Chain Management Solution.

For this hackathon the following functionalities have been implemented:
- Blockchain based delivery
- Dyanmic route optimization using blockchain and MPC
- Manufacturer statistics and report generation on sales data using ZK contracts
- Proof of Delivery

### Inspiration

The goal was the creation of a Supply-Chain Management Solution that extends an existing logistics operation and makes it secure, transparent, and more efficient.  With the use of Smart Contracts we can automate certain logistics steps, add oversight to the whole process and create a Data Sharing platform for transportation optimization and report generation.

## How to Run

docker-compose coming soon

Run database
```
cd db/
docker run --rm -P --publish 127.0.0.1:5433:5432 -e POSTGRES_PASSWORD="1234" --name pg -v ./init.sql:/docker-entrypoint-initdb.d/init.sql postgres:alpine
```

Run host
```
cd host/
npm install
npm run dev
```

Run web
```
cd web/
npm install
npm run dev
```

Visit `localhost:5173/login`, connect to the blockchain using MPC wallet extension and use one of the demo accounts' indentifications to log in:
- email address:
  - driver: `driver@demo.com`
  - manufacturer: `manufact@demo.com`
  - dispatcher: `dispatch@demo.com`
- password: `password`

## Directory structure

- web: Contains the frontend for the web app, authentication pages, the landing page and the tracking page
- contracts: a set of public and zero-knowledge contracts: delivery contract, bidding contract, statistics contract and route information sharing contract  
- host: a service to cache contract states and perform other off-chain activity
- db: Database init script

# Notes
