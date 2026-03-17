type AuthState = {
  userId: string | null;
  email: string | null;
  loggedIn: boolean;
};

let state: AuthState = {
  userId: null,
  email: null,
  loggedIn: false
};

export function setAuthState(next: Partial<AuthState>): AuthState {
  state = { ...state, ...next };
  return state;
}

export function getAuthState(): AuthState {
  return state;
}

export function clearAuthState(): AuthState {
  state = { userId: null, email: null, loggedIn: false };
  return state;
}
