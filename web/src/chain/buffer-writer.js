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

/**
 * Utility class used to write specific types of values to a buffer.
 */
export class BufferWriter {
  buffer;

  constructor() {
    this.buffer = Buffer.alloc(0);
  }

  writeIntBE = (int) => {
    const buffer = Buffer.alloc(4);
    buffer.writeInt32BE(int, 0);
    this.appendBuffer(buffer);
  };

  writeLongBE = (long) => {
    this.writeNumberBE(long, 8);
  };

  writeNumberBE = (num, byteCount) => {
    const buffer = num.toTwos(byteCount * 8).toArrayLike(Buffer, "be", byteCount);
    this.appendBuffer(buffer);
  };

  writeBuffer = (buffer) => {
    this.appendBuffer(buffer);
  };

  writeDynamicBuffer = (buffer) => {
    this.writeIntBE(buffer.length);
    this.writeBuffer(buffer);
  };

  writeHexString = (hex) => {
    this.appendBuffer(Buffer.from(hex, "hex"));
  };

  toBuffer = () => {
    return this.buffer.slice();
  };

  appendBuffer = (buffer) => {
    this.buffer = Buffer.concat([this.buffer, buffer]);
  };
}
