import BN from "bn.js";
import { BufferWriter } from "./buffer-writer";

const serializeTransaction = (
  inner,
  data,) => {
  const bufferWriter = new BufferWriter();
  serializeTransactionInner(bufferWriter, inner);
  bufferWriter.writeHexString(data.address);
  bufferWriter.writeDynamicBuffer(data.rpc);
  return bufferWriter.toBuffer();
}

function serializeTransactionInner(bufferWriter, inner) {
  bufferWriter.writeLongBE(new BN(inner.nonce));
  bufferWriter.writeLongBE(new BN(inner.validTo));
  bufferWriter.writeLongBE(new BN(inner.cost));
}

export {
  serializeTransaction,
};
