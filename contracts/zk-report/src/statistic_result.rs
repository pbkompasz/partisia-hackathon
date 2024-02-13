//! Data types for the zk computation output.
//! Similar structs can be found in zk_compute.rs

use create_type_spec_derive::CreateTypeSpec;
use read_write_state_derive::ReadWriteState;

#[derive(ReadWriteState, CreateTypeSpec, Clone)]
pub struct StatisticsResult {
    pub sales_report: SalesReport,
    pub inventory_report: InventoryReport,
    pub financial_report: FinancialReport,
    pub forecasting_report: ForecastingReport,
    pub compliance_report: ComplianceReport,
    pub production_report: ProductionReport,
}

#[derive(ReadWriteState, CreateTypeSpec, Clone)]
pub struct ItemResult {
    pub orders: i32,
    pub sold: i32,
    pub in_production: i32,
}

#[derive(ReadWriteState, CreateTypeSpec, Clone)]
pub struct SalesReport {
    pub revenue: i32,
    pub gross_margin: i32,
    pub growth_rate: i32,
}

#[derive(ReadWriteState, CreateTypeSpec, Clone)]
pub struct InventoryReport {
    pub turnover_ratio: i32,
    pub holding_costs: i32,
    pub stock_out_rate: i32,
}

#[derive(ReadWriteState, CreateTypeSpec, Clone)]
pub struct FinancialReport {
    pub profit_margin: i32,
    pub roi: i32,
    pub cash_flow_margin: i32,
}

#[derive(ReadWriteState, CreateTypeSpec, Clone)]
pub struct ForecastingReport {
    pub accuracy: i32,
    pub bias: i32,
    pub variance: i32,
}

#[derive(ReadWriteState, CreateTypeSpec, Clone)]
pub struct ComplianceReport {
    pub regulatory_rate: i32,
    pub number_of_violations: i32,
    pub penalty_costs: i32,
}


#[derive(ReadWriteState, CreateTypeSpec, Clone)]
pub struct ProductionReport {
    pub production_efficiency: i32,
    pub downtime: i32,
    pub scrap_rate: i32,
}
