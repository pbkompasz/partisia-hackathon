import { getReports as getReportsDB } from "../queries/queries";

const REPORT_TYPES = [
  {
    name: "SalesReport",
    doc: "",
  },
  {
    name: "InventoryReport",
    doc: "",
  },
  {
    name: "FinancialReport",
    doc: "",
  },
  {
    name: "ForecastingReport",
    doc: "",
  },
  {
    name: "ComplianceReport",
    doc: "",
  },
  {
    name: "ProductionReport",
    doc: "",
  },
];

const getReports = async () => {
  try {
    const reports = await getReportsDB();
    return reports;
  } catch (error) {
    throw error;
  }
};

const getReportTypes = async () => {
  try {
    return REPORT_TYPES;
  } catch (error) {
    throw error;
  }
};

const getReport = async (id: string) => {};

export { getReports, getReportTypes, getReport };
