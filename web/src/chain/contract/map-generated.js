import {
  AbiParser,
  FnRpcBuilder,
  StateReader,
} from "@partisiablockchain/abi-client";

const fileAbi = new AbiParser(Buffer.from(
  "5042434142490a02000504000000000501000000084d61704576656e740000000600000007636f6f72645f780b00000007636f6f72645f790b0000000b6465736372697074696f6e0b0000000a6576656e745f747970650b000000166372656174655f646174655f7574635f6d696c6c697309000000086475726174696f6e0801000000084d6170537461746500000003000000066576656e74731000000000000b6465736372697074696f6e0b0000001573746172745f646174655f7574635f6d696c6c697309010000000b536563726574566172496400000001000000067261775f69640301000000134576656e74537562736372697074696f6e496400000001000000067261775f696408010000000f45787465726e616c4576656e74496400000001000000067261775f69640800000002010000000a696e697469616c697a65ffffffff0f000000020000000b6465736372697074696f6e0b0000001573746172745f646174655f7574635f6d696c6c69730902000000047369676e010000000600000007636f6f72645f780b00000007636f6f72645f790b0000000b6465736372697074696f6e0b0000000a6576656e745f747970650b000000166372656174655f646174655f7574635f6d696c6c697309000000086475726174696f6e080001",
  "hex"
)).parseAbi();


export function newMapEvent(coordX, coordY, description, eventType, createDateUtcMillis, duration) {
  return {coordX, coordY, description, eventType, createDateUtcMillis, duration};
}

function fromScValueMapEvent(structValue) {
  return {
    coordX: structValue.getFieldValue("coord_x").stringValue(),
    coordY: structValue.getFieldValue("coord_y").stringValue(),
    description: structValue.getFieldValue("description").stringValue(),
    eventType: structValue.getFieldValue("event_type").stringValue(),
    createDateUtcMillis: structValue.getFieldValue("create_date_utc_millis").asBN(),
    duration: structValue.getFieldValue("duration").asNumber(),
  };
}

export function newMapState(events, description, startDateUtcMillis) {
  return {events, description, startDateUtcMillis};
}

function fromScValueMapState(structValue) {
  return {
    events: structValue.getFieldValue("events").setValue().values.map((sc1) => fromScValueMapEvent(sc1.structValue())),
    description: structValue.getFieldValue("description").stringValue(),
    startDateUtcMillis: structValue.getFieldValue("start_date_utc_millis").asBN(),
  };
}

export function deserializeMapState(state) {
  console.log(state);
  const scValue = new StateReader(state.state, fileAbi.contract, state.avlTrees).readState();
  return fromScValueMapState(scValue);
}

export function newSecretVarId(rawId) {
  return {rawId};
}

function fromScValueSecretVarId(structValue) {
  return {
    rawId: structValue.getFieldValue("raw_id").asNumber(),
  };
}

export function newEventSubscriptionId(rawId) {
  return {rawId};
}

function fromScValueEventSubscriptionId(structValue) {
  return {
    rawId: structValue.getFieldValue("raw_id").asNumber(),
  };
}

export function newExternalEventId(rawId) {
  return {rawId};
}

function fromScValueExternalEventId(structValue) {
  return {
    rawId: structValue.getFieldValue("raw_id").asNumber(),
  };
}

export function initialize(description, startDateUtcMillis) {
  const fnBuilder = new FnRpcBuilder("initialize", fileAbi.contract);
  fnBuilder.addString(description);
  fnBuilder.addI64(startDateUtcMillis);
  return fnBuilder.getBytes();
}

export function sign(coordX, coordY, description, eventType, createDateUtcMillis, duration) {
  const fnBuilder = new FnRpcBuilder("sign", fileAbi.contract);
  fnBuilder.addString(coordX);
  fnBuilder.addString(coordY);
  fnBuilder.addString(description);
  fnBuilder.addString(eventType);
  fnBuilder.addI64(createDateUtcMillis);
  fnBuilder.addI32(duration);
  return fnBuilder.getBytes();
}

