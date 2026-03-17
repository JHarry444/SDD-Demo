type ReservationManagementState = {
  selectedReservationId: string | null;
  lastAction: "none" | "modify" | "cancel";
};

let state: ReservationManagementState = {
  selectedReservationId: null,
  lastAction: "none"
};

export function setReservationManagementState(next: Partial<ReservationManagementState>): ReservationManagementState {
  state = { ...state, ...next };
  return state;
}

export function getReservationManagementState(): ReservationManagementState {
  return state;
}
