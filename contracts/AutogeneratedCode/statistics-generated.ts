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
  "5042434142490b000005040000000007010000000a456e747279506f696e740000000700000007726576656e75650800000005636f737473080000000e726576656e75655f6265666f7265080000000f696e76656e746f72795f7374617274080000000d696e76656e746f72795f656e6408000000146e756d6265725f6f665f76696f6c6174696f6e73060000000d70656e616c74795f636f73747308010000001753746174697374696373436f6e747261637453746174650000000300000008646561646c696e65090000000a73746172745f646174650900000006726573756c74120002010000001053746174697374696373526573756c74000000010000000c73616c65735f7265706f72740003010000000b53616c65735265706f72740000000300000007726576656e7565080000000c67726f73735f6d617267696e080000000b67726f7774685f7261746508010000000b536563726574566172496400000001000000067261775f69640301000000134576656e74537562736372697074696f6e496400000001000000067261775f696408010000000f45787465726e616c4576656e74496400000001000000067261775f69640800000005010000000a696e697469616c697a65ffffffff0f000000020000000a73746172745f6461746509000000156d696c6c69735f756e74696c5f646561646c696e650417000000086164645f6461746140000000000000000c7365637265745f696e70757400000200000012636f6d707574655f7374617469737469637301000000001300000014636f6d7075746174696f6e5f636f6d706c657465c8f4df85080000000014000000146f70656e5f726573756c745f7661726961626c65edc3d3fe03000000000001",
  "hex"
)).parseAbi();

type Option<K> = K | undefined;

export interface EntryPoint {
  revenue: number;
  costs: number;
  revenueBefore: number;
  inventoryStart: number;
  inventoryEnd: number;
  numberOfViolations: number;
  penaltyCosts: number;
}

export function newEntryPoint(revenue: number, costs: number, revenueBefore: number, inventoryStart: number, inventoryEnd: number, numberOfViolations: number, penaltyCosts: number): EntryPoint {
  return {revenue, costs, revenueBefore, inventoryStart, inventoryEnd, numberOfViolations, penaltyCosts};
}

function fromScValueEntryPoint(structValue: ScValueStruct): EntryPoint {
  return {
    revenue: structValue.getFieldValue("revenue")!.asNumber(),
    costs: structValue.getFieldValue("costs")!.asNumber(),
    revenueBefore: structValue.getFieldValue("revenue_before")!.asNumber(),
    inventoryStart: structValue.getFieldValue("inventory_start")!.asNumber(),
    inventoryEnd: structValue.getFieldValue("inventory_end")!.asNumber(),
    numberOfViolations: structValue.getFieldValue("number_of_violations")!.asNumber(),
    penaltyCosts: structValue.getFieldValue("penalty_costs")!.asNumber(),
  };
}

export interface StatisticsContractState {
  deadline: BN;
  startDate: BN;
  result: Option<StatisticsResult>;
}

export function newStatisticsContractState(deadline: BN, startDate: BN, result: Option<StatisticsResult>): StatisticsContractState {
  return {deadline, startDate, result};
}

function fromScValueStatisticsContractState(structValue: ScValueStruct): StatisticsContractState {
  return {
    deadline: structValue.getFieldValue("deadline")!.asBN(),
    startDate: structValue.getFieldValue("start_date")!.asBN(),
    result: structValue.getFieldValue("result")!.optionValue().valueOrUndefined((sc1) => fromScValueStatisticsResult(sc1.structValue())),
  };
}

export function deserializeStatisticsContractState(state: StateBytes): StatisticsContractState {
  const scValue = new StateReader(state.state, fileAbi.contract, state.avlTrees).readState();
  return fromScValueStatisticsContractState(scValue);
}

export interface StatisticsResult {
  salesReport: SalesReport;
}

export function newStatisticsResult(salesReport: SalesReport): StatisticsResult {
  return {salesReport};
}

function fromScValueStatisticsResult(structValue: ScValueStruct): StatisticsResult {
  return {
    salesReport: fromScValueSalesReport(structValue.getFieldValue("sales_report")!.structValue()),
  };
}

export interface SalesReport {
  revenue: number;
  grossMargin: number;
  growthRate: number;
}

export function newSalesReport(revenue: number, grossMargin: number, growthRate: number): SalesReport {
  return {revenue, grossMargin, growthRate};
}

function fromScValueSalesReport(structValue: ScValueStruct): SalesReport {
  return {
    revenue: structValue.getFieldValue("revenue")!.asNumber(),
    grossMargin: structValue.getFieldValue("gross_margin")!.asNumber(),
    growthRate: structValue.getFieldValue("growth_rate")!.asNumber(),
  };
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

export function initialize(startDate: BN, millisUntilDeadline: BN): Buffer {
  const fnBuilder = new FnRpcBuilder("initialize", fileAbi.contract);
  fnBuilder.addI64(startDate);
  fnBuilder.addU64(millisUntilDeadline);
  return fnBuilder.getBytes();
}

export function computeStatistics(): Buffer {
  const fnBuilder = new FnRpcBuilder("compute_statistics", fileAbi.contract);
  return fnBuilder.getBytes();
}

