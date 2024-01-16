
# Partisia Hackathon

## Description

This project was submitted to the 2023 Partisia Hackathon.
The proposed web application is a Secure Blockchain based Transportation Management System.

For this hackathon the following functionalities have been implemented:
- Fund Position, estimate future demand based on historic data using ZK contracts
- Report, generate privacy preserving repots
- Quarterly Revenue/Load Growth across industry/sector, optimize budgets using ZK contracts
- Create logistics contracts (client → manufacturer, logistics bids on contract)
- Consignment
- Proof of Delivery

### Why

Transportation system are system that act on a historical corpus of contracts, which constitutes as the perfect application for blockchain.
The power of Zero-Knowledge Proof allows each entity to receive Symmetric Information, while improving the efficiency and output of the whole structure.

## Roles

There are 4 distinct roles that operate on the Transportation Management System:
- client i.e. end-customer
- logistics company: dispatcher + driver
- manufacturer
- governance e.g. city, emergency serviceses, etc.

## Directory structure

- web: Contains the frontend for the web app and the landing pages
- contracts: Contract logic
- backend: Backend for the logistics company

## Notes

The logistics company has a backend to do business logic. The blockchain comms will happend from here.
