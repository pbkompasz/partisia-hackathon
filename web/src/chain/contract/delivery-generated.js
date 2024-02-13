import {
  AbiParser,
  FnRpcBuilder,
  StateReader,
} from "@partisiablockchain/abi-client";

const fileAbi = new AbiParser(Buffer.from(
  "5042434142490a0200050400000000050100000006416374696f6e0000000200000009636f6d706c657465640c000000046e616d650b010000001544656c6976657279436f6e747261637453746174650000000900000008646561646c696e65090000000a73746172745f64617465090000000969735f757267656e740c0000000d6c6f6767696e675f6c6576656c060000000a69735f66726167696c650c0000000b74616b655f70686f746f730c00000007616374696f6e730e00000000000e63757272656e745f616374696f6e060000000a6d696e5f77656967687406010000000b536563726574566172496400000001000000067261775f69640301000000134576656e74537562736372697074696f6e496400000001000000067261775f696408010000000f45787465726e616c4576656e74496400000001000000067261775f69640800000003010000000a696e697469616c697a65ffffffff0f0000000600000008646561646c696e65090000000969735f757267656e740c0000000d6c6f6767696e675f6c6576656c060000000a69735f66726167696c650c0000000b74616b655f70686f746f730c0000000a6d696e5f77656967687406020000000f636f6d706c6574655f616374696f6e888781c30d0000000300000006776569676874060000000c706963747572655f686173680b0000000a69735f64616d616765640c020000000e6164645f6e65775f616374696f6ec9cac0c00a00000002000000046e616d650b00000008706f736974696f6e060001",
  "hex"
)).parseAbi();


export function newAction(completed, name) {
  return {completed, name};
}

function fromScValueAction(structValue) {
  return {
    completed: structValue.getFieldValue("completed").boolValue(),
    name: structValue.getFieldValue("name").stringValue(),
  };
}

export function newDeliveryContractState(deadline, startDate, isUrgent, loggingLevel, isFragile, takePhotos, actions, currentAction, minWeight) {
  return {deadline, startDate, isUrgent, loggingLevel, isFragile, takePhotos, actions, currentAction, minWeight};
}

function fromScValueDeliveryContractState(structValue) {
  return {
    deadline: structValue.getFieldValue("deadline").asBN(),
    startDate: structValue.getFieldValue("start_date").asBN(),
    isUrgent: structValue.getFieldValue("is_urgent").boolValue(),
    loggingLevel: structValue.getFieldValue("logging_level").asNumber(),
    isFragile: structValue.getFieldValue("is_fragile").boolValue(),
    takePhotos: structValue.getFieldValue("take_photos").boolValue(),
    actions: structValue.getFieldValue("actions").vecValue().values().map((sc1) => fromScValueAction(sc1.structValue())),
    currentAction: structValue.getFieldValue("current_action").asNumber(),
    minWeight: structValue.getFieldValue("min_weight").asNumber(),
  };
}

export function deserializeDeliveryContractState(state) {
  const scValue = new StateReader(state.state, fileAbi.contract, state.avlTrees).readState();
  return fromScValueDeliveryContractState(scValue);
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

export function initialize(deadline, isUrgent, loggingLevel, isFragile, takePhotos, minWeight) {
  const fnBuilder = new FnRpcBuilder("initialize", fileAbi.contract);
  fnBuilder.addI64(deadline);
  fnBuilder.addBool(isUrgent);
  fnBuilder.addI8(loggingLevel);
  fnBuilder.addBool(isFragile);
  fnBuilder.addBool(takePhotos);
  fnBuilder.addI8(minWeight);
  return fnBuilder.getBytes();
}

export function completeAction(weight, pictureHash, isDamaged) {
  const fnBuilder = new FnRpcBuilder("complete_action", fileAbi.contract);
  fnBuilder.addI8(weight);
  fnBuilder.addString(pictureHash);
  fnBuilder.addBool(isDamaged);
  return fnBuilder.getBytes();
}

export function addNewAction(name, position) {
  const fnBuilder = new FnRpcBuilder("add_new_action", fileAbi.contract);
  fnBuilder.addString(name);
  fnBuilder.addI8(position);
  return fnBuilder.getBytes();
}

