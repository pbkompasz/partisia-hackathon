import { axiosClient } from "./client";

const getReports = async () => {
  try {
    const resp = await axiosClient.get(`/reports`);
    console.log(resp.data)
    return resp.data.reports;
  } catch (error) {
    console.log(error.message);
    return [];
  }
}

export {
  getReports,
}
