//! ZK computation for statistics contract
use create_type_spec_derive::CreateTypeSpec;
use pbc_zk::*;

/// Input type. Each value is inputted as an i8 integer.
/// If a value outside the given range is inputted, it will not be counted.
#[derive(Clone, SecretBinary, CreateTypeSpec)]
pub struct EntryPoint {
    pub revenue: Sbi32,
    pub costs: Sbi32,
    // revenue year prior
    pub revenue_before: Sbi32,
    pub inventory_start: Sbi32,
    pub inventory_end: Sbi32,
    pub number_of_violations: Sbi8,
    pub penalty_costs: Sbi32,
}

#[derive(Clone, SecretBinary, CreateTypeSpec)]
pub struct SalesEntryPoint {
    pub revenue: Sbi32,
    pub costs: Sbi32,
    // revenue year prior
    pub revenue_before: Sbi32,
}

#[derive(Clone, PartialEq)]
pub struct StatisticsResult {
    pub sales_report: SalesReport,
    // pub inventory_report: InventoryReport,
    // pub financial_report: FinancialReport,
    // pub forecasting_report: ForecastingReport,
    // pub compliance_report: ComplianceReport,
    // pub production_report: ProductionReport,
}

#[derive(Clone, PartialEq, Debug)]
pub struct SalesReport {
    pub revenue: Sbi32,
    pub gross_margin: Sbi32,
    pub growth_rate: Sbi32,
}

#[derive(Clone, PartialEq, Debug)]
pub struct InventoryReport {
    pub turnover_ratio: Sbi32,
    pub holding_costs: Sbi32,
    pub stock_out_rate: Sbi32,
}

#[derive(Clone, PartialEq, Debug)]
pub struct FinancialReport {
    pub profit_margin: Sbi32,
    pub roi: Sbi32,
    pub cash_flow_margin: Sbi32,
}

#[derive(Clone, PartialEq, Debug)]
pub struct ForecastingReport {
    pub accuracy: Sbi32,
    pub bias: Sbi32,
    pub variance: Sbi32,
}

#[derive(Clone, PartialEq, Debug)]
pub struct ComplianceReport {
    pub regulatory_rate: Sbi32,
    pub number_of_violations: Sbi32,
    pub penalty_costs: Sbi32,
}


#[derive(Clone, PartialEq, Debug)]
pub struct ProductionReport {
    pub production_efficiency: Sbi32,
    pub downtime: Sbi32,
    pub scrap_rate: Sbi32,
}


#[allow(clippy::needless_range_loop, dead_code)]
#[zk_compute(shortname = 0x41)]
pub fn compute_sales_report() -> SalesReport {
    // Initialize counts
    let mut total_revenue: Sbi32 = Sbi32::from(0);
    let mut total_costs: Sbi32 = Sbi32::from(0);
    // This comes from other contract
    let mut total_revenue_before: Sbi32 = Sbi32::from(0);
    let mut count: Sbi32 = Sbi32::from(0);

    // Analyze input data
    for variable_id in secret_variable_ids() {
        let input = load_sbi::<EntryPoint>(variable_id);
        total_revenue = total_revenue + input.revenue;
        total_costs = total_costs + input.costs;
        total_revenue_before = total_revenue_before + input.revenue_before;
        count = count + Sbi32::from(1); 
    }

    let growth_rate: Sbi32 = total_revenue - total_revenue_before;
    let gross_margin: Sbi32 = total_revenue - total_costs;

    SalesReport {
        revenue: total_revenue,
        gross_margin: gross_margin,
        growth_rate: growth_rate,
    }
}

#[allow(clippy::needless_range_loop, dead_code)]
#[zk_compute(shortname = 0x40)]
pub fn compute_statistics() -> StatisticsResult {
    // Initialize counts
    let mut total_revenue: Sbi32 = Sbi32::from(0);
    let mut total_costs: Sbi32 = Sbi32::from(0);
    // This comes from other contract
    let mut total_revenue_before: Sbi32 = Sbi32::from(0);
    let mut count: Sbi32 = Sbi32::from(0);

    // Analyze input data
    for variable_id in secret_variable_ids() {
        let input = load_sbi::<EntryPoint>(variable_id);
        total_revenue = total_revenue + input.revenue;
        total_costs = total_costs + input.costs;
        total_revenue_before = total_revenue_before + input.revenue_before;
        count = count + Sbi32::from(1); 
    }

    let growth_rate: Sbi32 = total_revenue - total_revenue_before;
    let gross_margin: Sbi32 = total_revenue - total_costs;

    StatisticsResult {
        sales_report: SalesReport {
            revenue: total_revenue,
            gross_margin: gross_margin,
            growth_rate: growth_rate,
        }
    }
}

#[allow(clippy::needless_range_loop, dead_code)]
#[zk_compute(shortname = 0x40)]
pub fn compute_item_statistics() -> ItemResult {
    // Initialize counts
    let mut total_revenue: Sbi32 = Sbi32::from(0);
    let mut total_costs: Sbi32 = Sbi32::from(0);
    // This comes from other contract
    let mut total_revenue_before: Sbi32 = Sbi32::from(0);
    let mut count: Sbi32 = Sbi32::from(0);

    // Analyze input data
    for variable_id in secret_variable_ids() {
        let input = load_sbi::<EntryPoint>(variable_id);
        total_revenue = total_revenue + input.revenue;
        total_costs = total_costs + input.costs;
        total_revenue_before = total_revenue_before + input.revenue_before;
        count = count + Sbi32::from(1); 
    }

    let growth_rate: Sbi32 = total_revenue - total_revenue_before;
    let gross_margin: Sbi32 = total_revenue - total_costs;

    ItemResult {
        revenue: total_revenue,
        gross_margin: gross_margin,
        growth_rate: growth_rate,
    }
}
