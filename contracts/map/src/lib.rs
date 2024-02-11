#![doc = include_str!("../README.md")]
#![allow(unused_variables)]

#[macro_use]
extern crate pbc_contract_codegen;
extern crate pbc_contract_common;

use pbc_contract_common::context::ContractContext;
use pbc_contract_common::sorted_vec_map::SortedVecSet;
use read_write_rpc_derive::ReadWriteRPC;
use read_write_state_derive::ReadWriteState;
use create_type_spec_derive::CreateTypeSpec;

#[derive(ReadWriteState, ReadWriteRPC, CreateTypeSpec, Debug, Clone, Ord, PartialOrd, Eq, PartialEq)]
struct MapEvent {
    coord_x: String,
    coord_y: String,
    description: String,
    event_type: String,
    create_date_utc_millis: i64,
    duration: i32,
}

#[state]
pub struct MapState {
    events: SortedVecSet<MapEvent>,
    description: String,
    start_date_utc_millis: i64,
}

#[init]
pub fn initialize(_ctx: ContractContext, description: String, start_date_utc_millis: i64) -> MapState {
    assert_ne!(
        description, "",
        "Description cannot be empty"
    );
    MapState {
        description,
        start_date_utc_millis,
        events: SortedVecSet::new(),
    }
}

#[action(shortname = 0x01)]
pub fn sign(ctx: ContractContext, mut state: MapState, coord_x: String, coord_y: String, description: String, event_type: String, create_date_utc_millis: i64, duration: i32) -> MapState {
    let new_event = MapEvent {
        coord_x,
        coord_y,
        description,
        event_type,
        create_date_utc_millis,
        duration,
    };

    state.events.insert(new_event);
    state
}
