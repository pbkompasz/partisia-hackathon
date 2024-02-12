/*
 * Copyright (C) 2022 - 2023 Partisia Blockchain Foundation
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

import { ShardedClient } from "./client/sharded-client";
import { MapApi } from "./contract/map-api";

export const CLIENT = new ShardedClient("https://node1.testnet.partisiablockchain.com", [
  "Shard0",
  "Shard1",
  "Shard2",
]);

let contractAddress;
let currentAccount;
let contractAbi;
let averageApi;
let engineKeys;

export const setAccount = (account) => {
  currentAccount = account;
  // if (role === 'driver') {
    // setMapApi();
  //   setDeliveryApi();
  // } else if (role === 'dispatcher') {
  //   setRoutesApi();
  // } else if (role === 'manufacturer') {
  //   setReportApi();
  // }
};

export const resetAccount = () => {
  currentAccount = undefined;
};

export const isConnected = () => {
  return currentAccount != null;
};

export const getContractAbi = () => {
  return contractAbi;
};


export const getAverageApi = () => {
  return averageApi;
};

export const getEngineKeys = () => {
  return engineKeys;
};

export const getContractAddress = () => {
  return contractAddress;
};

export const setContractAddress = (address) => {
  contractAddress = address;
};
