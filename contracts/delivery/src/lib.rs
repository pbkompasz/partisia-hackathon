
#[macro_use]
extern crate pbc_contract_codegen;

use pbc_contract_common::context::ContractContext;
use create_type_spec_derive::CreateTypeSpec;
use read_write_rpc_derive::ReadWriteRPC;
use read_write_state_derive::ReadWriteState;

#[derive(ReadWriteState, ReadWriteRPC, CreateTypeSpec, Debug, Clone)]
pub struct Action {
  completed: bool,
  name: String,
}

/// The public state of the contract.
#[state]
struct DeliveryContractState {
    deadline: i64,
    start_date: i64,
    is_urgent: bool,    
    logging_level: i8,    
    is_fragile: bool,    
    take_photos: bool,    
    actions: Vec<Action>,
    current_action: i8,
    min_weight: i8,
}

#[init]
fn initialize(
    context: ContractContext,
    deadline: i64,
    is_urgent: bool,
    logging_level: i8,
    is_fragile: bool,
    take_photos: bool,
    min_weight: i8
) -> DeliveryContractState {

    let mut actions: Vec<Action> = Vec::new();
    actions.push(Action {
      completed: false,
      name: String::from("Start delivery"),
    });

    actions.push(Action {
      completed: false,
      name: String::from("Final delivery"),
    });

    DeliveryContractState {
      deadline: deadline,
      start_date: context.block_production_time,
      is_urgent: is_urgent,
      logging_level: logging_level,
      is_fragile: is_fragile,
      min_weight: min_weight,
      take_photos: take_photos,
      actions: actions,
      current_action: 0,
    }
}

#[action]
fn complete_action(
  _context: ContractContext,
  mut state: DeliveryContractState,
  weight: i8,
  picture_hash: String,
  is_damaged: bool,
) -> DeliveryContractState {

  assert!(state.actions.len() > state.current_action.try_into().unwrap(), "There are no more actions to complete");

  if state.take_photos {
    assert!(!picture_hash.is_empty(), "Picture is required");
  };
  assert!(state.min_weight > weight, "Weight is lower then min-weight");
  assert!(is_damaged, "Package is damaged. Stopping!");

  state.current_action = state.current_action + 1;

  state
}

#[action]
fn add_new_action(
  _context: ContractContext,
  mut state: DeliveryContractState,
  name: String,
  position: i8,
) -> DeliveryContractState {
  assert!(position > state.current_action, "Cannot insert action before a completed action");

  let action = Action {
    completed: false,
    name: name,
  };

  if state.actions.len() < position.try_into().unwrap() {
    state.actions.push(action);
  } else {
    state.actions.insert(position.try_into().unwrap(), action)
  };

  state
}

