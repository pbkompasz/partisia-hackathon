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

import { Buffer } from 'buffer';

import { putRequest } from "./base-client";
import { PbcClient } from "./pbc-client";
/**
 * Web client that can handle the sending requests to the correct shard of PBC.
 */
export class ShardedClient {
  masterClient;
  shardClients;
  shards;
  baseUrl;

  constructor(baseUrl, shards) {
    this.baseUrl = baseUrl;
    this.shards = shards;
    this.masterClient = new PbcClient(baseUrl);
    this.shardClients = {};
    for (const shard of shards) {
      this.shardClients[shard] = new PbcClient(baseUrl + "/shards/" + shard);
    }
  }

  getClient(shardId) {
    if (shardId == null || this.shards.length === 0) {
      return this.masterClient;
    } else {
      return this.shardClients[shardId];
    }
  }

  shardForAddress(address) {
    if (this.shards.length === 0) {
      return null;
    } else {
      const buffer = Buffer.from(address, "hex");
      const shardIndex = Math.abs(buffer.readInt32BE(17)) % this.shards.length;
      return this.shards[shardIndex];
    }
  }

  getAccountData(address) {
    return this.clientForAddress(address).getAccountData(address);
  }

  getContractData(
    address,
    withState 
  ) {
    const requireState = withState === undefined || withState;
    if (requireState) {
      return this.clientForAddress(address).getContractData(address, requireState);
    } else {
      return this.clientForAddress(address).getContractData(address, requireState);
    }
  }

  getExecutedTransaction(
    shard,
    identifier,
    requireFinal
  ) {
    return this.getClient(shard).getExecutedTransaction(identifier, requireFinal);
  }

  putTransaction(transaction) {
    const byteJson = { payload: transaction.toString("base64") };
    return putRequest(this.baseUrl + "/chain/transactions", byteJson);
  }

  clientForAddress(address) {
    return this.getClient(this.shardForAddress(address));
  }
}
