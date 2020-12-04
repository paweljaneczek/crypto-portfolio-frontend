export interface RequestState {
  isOngoing: boolean;
  error: Error | null;
}

export const createInitialRequestState = (): RequestState => ({
  isOngoing: false,
  error: null,
});