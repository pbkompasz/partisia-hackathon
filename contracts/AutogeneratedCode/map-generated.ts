/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import BN from "bn.js";
import {
  AbiParser,
  AbstractBuilder, BigEndianReader,
  FileAbi, FnKinds, FnRpcBuilder, RpcReader,
  ScValue,
  ScValueEnum, ScValueOption,
  ScValueStruct,
  StateReader, TypeIndex,
  StateBytes,
  BlockchainAddress
} from "@partisiablockchain/abi-client";
import {BigEndianByteOutput} from "@secata-public/bitmanipulation-ts";

const fileAbi: FileAbi = new AbiParser(Buffer.from(
  "5042434142490a02000504000000000501000000084d61704576656e740000000600000007636f6f72645f780b00000007636f6f72645f790b0000000b6465736372697074696f6e0b0000000a6576656e745f747970650b000000166372656174655f646174655f7574635f6d696c6c697309000000086475726174696f6e0801000000084d6170537461746500000003000000066576656e74731000000000000b6465736372697074696f6e0b0000001573746172745f646174655f7574635f6d696c6c697309010000000b536563726574566172496400000001000000067261775f69640301000000134576656e74537562736372697074696f6e496400000001000000067261775f696408010000000f45787465726e616c4576656e74496400000001000000067261775f69640800000002010000000a696e697469616c697a65ffffffff0f000000020000000b6465736372697074696f6e0b0000001573746172745f646174655f7574635f6d696c6c69730902000000047369676e010000000600000007636f6f72645f780b00000007636f6f72645f790b0000000b6465736372697074696f6e0b0000000a6576656e745f747970650b000000166372656174655f646174655f7574635f6d696c6c697309000000086475726174696f6e080001",
  "hex"
)).parseAbi();

type Option<K> = K | undefined;

export interface MapEvent {
  coordX: string;
  coordY: string;
  description: string;
  eventType: string;
  createDateUtcMillis: BN;
  duration: number;
}

export function newMapEvent(coordX: string, coordY: string, description: string, eventType: string, createDateUtcMillis: BN, duration: number): MapEvent {
  return {coordX, coordY, description, eventType, createDateUtcMillis, duration};
}

function fromScValueMapEvent(structValue: ScValueStruct): MapEvent {
  return {
    coordX: structValue.getFieldValue("coord_x")!.stringValue(),
    coordY: structValue.getFieldValue("coord_y")!.stringValue(),
    description: structValue.getFieldValue("description")!.stringValue(),
    eventType: structValue.getFieldValue("event_type")!.stringValue(),
    createDateUtcMillis: structValue.getFieldValue("create_date_utc_millis")!.asBN(),
    duration: structValue.getFieldValue("duration")!.asNumber(),
  };
}

export interface MapState {
  events: MapEvent[];
  description: string;
  startDateUtcMillis: BN;
}

export function newMapState(events: MapEvent[], description: string, startDateUtcMillis: BN): MapState {
  return {events, description, startDateUtcMillis};
}

function fromScValueMapState(structValue: ScValueStruct): MapState {
  return {
    events: structValue.getFieldValue("events")!.setValue().values.map((sc1) => fromScValueMapEvent(sc1.structValue())),
    description: structValue.getFieldValue("description")!.stringValue(),
    startDateUtcMillis: structValue.getFieldValue("start_date_utc_millis")!.asBN(),
  };
}

export function deserializeMapState(state: StateBytes): MapState {
  const scValue = new StateReader(state.state, fileAbi.contract, state.avlTrees).readState();
  return fromScValueMapState(scValue);
}

export interface SecretVarId {
  rawId: number;
}

export function newSecretVarId(rawId: number): SecretVarId {
  return {rawId};
}

function fromScValueSecretVarId(structValue: ScValueStruct): SecretVarId {
  return {
    rawId: structValue.getFieldValue("raw_id")!.asNumber(),
  };
}

export interface EventSubscriptionId {
  rawId: number;
}

export function newEventSubscriptionId(rawId: number): EventSubscriptionId {
  return {rawId};
}

function fromScValueEventSubscriptionId(structValue: ScValueStruct): EventSubscriptionId {
  return {
    rawId: structValue.getFieldValue("raw_id")!.asNumber(),
  };
}

export interface ExternalEventId {
  rawId: number;
}

export function newExternalEventId(rawId: number): ExternalEventId {
  return {rawId};
}

function fromScValueExternalEventId(structValue: ScValueStruct): ExternalEventId {
  return {
    rawId: structValue.getFieldValue("raw_id")!.asNumber(),
  };
}

export function initialize(description: string, startDateUtcMillis: BN): Buffer {
  const fnBuilder = new FnRpcBuilder("initialize", fileAbi.contract);
  fnBuilder.addString(description);
  fnBuilder.addI64(startDateUtcMillis);
  return fnBuilder.getBytes();
}

export function sign(coordX: string, coordY: string, description: string, eventType: string, createDateUtcMillis: BN, duration: number): Buffer {
  const fnBuilder = new FnRpcBuilder("sign", fileAbi.contract);
  fnBuilder.addString(coordX);
  fnBuilder.addString(coordY);
  fnBuilder.addString(description);
  fnBuilder.addString(eventType);
  fnBuilder.addI64(createDateUtcMillis);
  fnBuilder.addI32(duration);
  return fnBuilder.getBytes();
}

