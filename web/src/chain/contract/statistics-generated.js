import {
  AbiParser,
  FnRpcBuilder,
  StateReader
} from "@partisiablockchain/abi-client";

const fileAbi = new AbiParser(Buffer.from(
  "5042434142490b000005040000000007010000000a456e747279506f696e740000000700000007726576656e75650800000005636f737473080000000e726576656e75655f6265666f7265080000000f696e76656e746f72795f7374617274080000000d696e76656e746f72795f656e6408000000146e756d6265725f6f665f76696f6c6174696f6e73060000000d70656e616c74795f636f73747308010000001753746174697374696373436f6e747261637453746174650000000300000008646561646c696e65090000000a73746172745f646174650900000006726573756c74120002010000001053746174697374696373526573756c74000000010000000c73616c65735f7265706f72740003010000000b53616c65735265706f72740000000300000007726576656e7565080000000c67726f73735f6d617267696e080000000b67726f7774685f7261746508010000000b536563726574566172496400000001000000067261775f69640301000000134576656e74537562736372697074696f6e496400000001000000067261775f696408010000000f45787465726e616c4576656e74496400000001000000067261775f69640800000005010000000a696e697469616c697a65ffffffff0f000000020000000a73746172745f6461746509000000156d696c6c69735f756e74696c5f646561646c696e650417000000086164645f6461746140000000000000000c7365637265745f696e70757400000200000012636f6d707574655f7374617469737469637301000000001300000014636f6d7075746174696f6e5f636f6d706c657465c8f4df85080000000014000000146f70656e5f726573756c745f7661726961626c65edc3d3fe03000000000001",
  "hex"
)).parseAbi();

export function newEntryPoint(revenue, costs, revenueBefore, inventoryStart, inventoryEnd, numberOfViolations, penaltyCosts) {
  return {revenue, costs, revenueBefore, inventoryStart, inventoryEnd, numberOfViolations, penaltyCosts};
}

function fromScValueEntryPoint(structValue) {
  return {
    revenue: structValue.getFieldValue("revenue").asNumber(),
    costs: structValue.getFieldValue("costs").asNumber(),
    revenueBefore: structValue.getFieldValue("revenue_before").asNumber(),
    inventoryStart: structValue.getFieldValue("inventory_start").asNumber(),
    inventoryEnd: structValue.getFieldValue("inventory_end").asNumber(),
    numberOfViolations: structValue.getFieldValue("number_of_violations").asNumber(),
    penaltyCosts: structValue.getFieldValue("penalty_costs").asNumber(),
  };
}

export function newStatisticsContractState(deadline, startDate, result) {
  return {deadline, startDate, result};
}

function fromScValueStatisticsContractState(structValue) {
  return {
    deadline: structValue.getFieldValue("deadline").asBN(),
    startDate: structValue.getFieldValue("start_date").asBN(),
    result: structValue.getFieldValue("result").optionValue().valueOrUndefined((sc1) => fromScValueStatisticsResult(sc1.structValue())),
  };
}

export function deserializeStatisticsContractState(state) {
  const scValue = new StateReader(state.state, fileAbi.contract, state.avlTrees).readState();
  return fromScValueStatisticsContractState(scValue);
}

export function newStatisticsResult(salesReport) {
  return {salesReport};
}

function fromScValueStatisticsResult(structValue) {
  return {
    salesReport: fromScValueSalesReport(structValue.getFieldValue("sales_report").structValue()),
  };
}

export function newSalesReport(revenue, grossMargin, growthRate) {
  return {revenue, grossMargin, growthRate};
}

function fromScValueSalesReport(structValue) {
  return {
    revenue: structValue.getFieldValue("revenue").asNumber(),
    grossMargin: structValue.getFieldValue("gross_margin").asNumber(),
    growthRate: structValue.getFieldValue("growth_rate").asNumber(),
  };
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

export function initialize(startDate, millisUntilDeadline) {
  const fnBuilder = new FnRpcBuilder("initialize", fileAbi.contract);
  fnBuilder.addI64(startDate);
  fnBuilder.addU64(millisUntilDeadline);
  return fnBuilder.getBytes();
}

export function computeStatistics() {
  const fnBuilder = new FnRpcBuilder("compute_statistics", fileAbi.contract);
  return fnBuilder.getBytes();
}

