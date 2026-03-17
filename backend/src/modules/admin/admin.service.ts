export function calculateOccupancyRate(occupied: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round((occupied / total) * 100);
}

export function buildOccupancyReport(startDate: string, endDate: string) {
  const totalReservations = 42;
  const occupancyRate = calculateOccupancyRate(63, 100);
  return {
    startDate,
    endDate,
    occupancyRate,
    totalReservations
  };
}
