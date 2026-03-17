import { apiFetch } from "../../../services/apiClient";

type OccupancyReport = {
  startDate: string;
  endDate: string;
  occupancyRate: number;
  totalReservations: number;
};

export function getOccupancyReport(startDate: string, endDate: string): Promise<OccupancyReport> {
  return apiFetch(`/admin/reports/occupancy?startDate=${startDate}&endDate=${endDate}`);
}
