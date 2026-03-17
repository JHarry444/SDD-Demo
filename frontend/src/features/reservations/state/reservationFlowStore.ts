type ReservationFlowState = {
  reservationId: string | null;
  status: "idle" | "pending_payment" | "confirmed" | "failed";
};

let state: ReservationFlowState = {
  reservationId: null,
  status: "idle"
};

export function setReservationFlowState(next: Partial<ReservationFlowState>): ReservationFlowState {
  state = { ...state, ...next };
  return state;
}

export function getReservationFlowState(): ReservationFlowState {
  return state;
}
