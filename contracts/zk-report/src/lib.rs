
#[macro_use]
extern crate pbc_contract_codegen;

use pbc_contract_common::context::ContractContext;
use pbc_contract_common::events::EventGroup;
use pbc_contract_common::zk::{SecretVarId, ZkInputDef, ZkState, ZkStateChange};
use pbc_traits::ReadWriteState;
use read_write_state_derive::ReadWriteState;

use crate::statistic_result::StatisticsResult;
use crate::zk_compute::EntryPoint;

mod statistic_result;
mod zk_compute;

#[derive(ReadWriteState, Debug, Clone)]
pub struct PublicInfoForEntry {}

#[derive(ReadWriteState, Debug, Clone)]
pub struct PublicInfoForResult {}

#[state]
struct StatisticsContractState {
    deadline: i64,
    start_date: i64,
    result: Option<StatisticsResult>,
}


#[init(zk = true)]
fn initialize(
    context: ContractContext,
    _zk_state: ZkState<PublicInfoForEntry>,
    start_date: i64,
    millis_until_deadline: u64,
) -> StatisticsContractState {
    StatisticsContractState {
        deadline: context.block_production_time + millis_until_deadline as i64,
        start_date: start_date,
        result: None,
    }
}

#[zk_on_secret_input(shortname = 0x40, secret_type = "EntryPoint")]
fn add_data(
    context: ContractContext,
    state: StatisticsContractState,
    _zk_state: ZkState<PublicInfoForEntry>,
) -> (
    StatisticsContractState,
    Vec<EventGroup>,
    ZkInputDef<PublicInfoForEntry, EntryPoint>,
) {
    assert!(
        context.block_production_time > state.start_date,
        "Inputting data is not allowed yet. Start time is at {}",
        state.start_date
    );

    assert!(
        context.block_production_time < state.deadline,
        "Inputting data is not allowed after the deadline. Current time is {}, deadline was {}",
        context.block_production_time,
        state.deadline
    );

    let input_def = ZkInputDef::with_metadata(PublicInfoForEntry {});

    (state, vec![], input_def)
}

#[action(shortname = 0x01, zk = true)]
fn compute_statistics(
    context: ContractContext,
    state: StatisticsContractState,
    _zk_state: ZkState<PublicInfoForEntry>,
) -> (StatisticsContractState, Vec<EventGroup>, Vec<ZkStateChange>) {
    assert!(
        context.block_production_time >= state.deadline,
        "Cannot start computing statistics before deadline has been passed, deadline is {} ms UTC, current time is {} ms UTC",
        state.deadline,
        context.block_production_time,
    );
    (
        state,
        vec![],
        vec![zk_compute::compute_statistics_start(
            &PublicInfoForResult {},
        )],
    )
}

#[zk_on_compute_complete]
fn computation_complete(
    _context: ContractContext,
    state: StatisticsContractState,
    _zk_state: ZkState<PublicInfoForEntry>,
    output_variables: Vec<SecretVarId>,
) -> (StatisticsContractState, Vec<EventGroup>, Vec<ZkStateChange>) {
    (
        state,
        vec![],
        vec![ZkStateChange::OpenVariables {
            variables: output_variables,
        }],
    )
}

#[zk_on_variables_opened]
fn open_result_variable(
    _context: ContractContext,
    mut state: StatisticsContractState,
    zk_state: ZkState<PublicInfoForEntry>,
    opened_variables: Vec<SecretVarId>,
) -> (StatisticsContractState, Vec<EventGroup>, Vec<ZkStateChange>) {
    let result = read_result(&zk_state, opened_variables.get(0));

    state.result = Some(result);
    (state, vec![], vec![ZkStateChange::ContractDone])
}

/// Reads the output of the computation.
fn read_result(
    zk_state: &ZkState<PublicInfoForEntry>,
    variable_id: Option<&SecretVarId>,
) -> StatisticsResult {
    let variable_id = *variable_id.unwrap();
    let variable = zk_state.get_variable(variable_id).unwrap();
    let buffer: Vec<u8> = variable.data.clone().unwrap();
    let result = StatisticsResult::state_read_from(&mut buffer.as_slice());

    result
}
