
# Partisia Hackathon

## Description

This project was submitted to the 2023-2024 Partisia Hackathon.
The proposed web application is a blockchain-based Supply-Chain Management System.

For this hackathon the following functionalities have been implemented:
- Blockchain based delivery
- Dyanmic route optimization using blockchain and MPC
- Manufacturer statistics and report generation on sales data using ZK contracts
- Proof of Delivery

### Why

Transportation system are system that act on a historical corpus of contracts, which constitutes as the perfect application for blockchain.
The power of Zero-Knowledge Proof allows each entity to receive Symmetric Information, while improving the efficiency and output of the whole structure.
Every actor will join if they get a positive ROI without sharing private data or losing market share due to competitor gaining Asymmetric Information.

## Roles

There are 3 distinct roles that operate on the Transportation Management System:
- logistics company: dispatcher + driver
- manufacturer
- client i.e. end-customer
<!-- - governance e.g. city, emergency serviceses, etc. -->

## How to Run (docker-compose coming soon)

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

## Directory structure

- web: Contains the frontend for the web app, the landing page and the tracking page
- contracts: Smart and ZK Contracts
- host: Reader node and authentication
- db: Database init script

# Notes

