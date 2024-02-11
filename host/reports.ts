import { getReports as getReportsDB } from "./queries";

const REPORT_TYPES = [
  {
    name: "sales",
    doc: "",
  },
  {
    name: "inventory",
    doc: "",
  },
  {
    name: "financial",
    doc: "",
  },
  {
    name: "forecasting",
    doc: "",
  },
  {
    name: "compliance",
    doc: "",
  },
  {
    name: "production",
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
