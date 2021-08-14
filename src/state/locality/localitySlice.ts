import { createDraftSafeSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ILocalityState {
  loading: boolean;
  hasErrors: boolean;
  errorMessage: string;
  locality: {};
}

const initialLocalityState: ILocalityState = {
  loading: false,
  hasErrors: false,
  errorMessage: "",
  locality: {},
};

export const localitySlice = createSlice({
  name: "locality",
  initialState: initialLocalityState,
  reducers: {
    fetchLocalityStart: (state) => {
      state.loading = true;
    },
    fetchLocalitySuccess: (state, { payload }) => {
      state.loading = false;
      state.hasErrors = false;
      state.locality = payload;
    },
    fetchLocalityFail: (state, { payload }) => {
      state.loading = false;
      state.hasErrors = true;
      state.errorMessage = payload;
    },
  },
});

export const fetchCurrentUserLocality =
  (localityId: number) => async (dispatch: any) => {
    dispatch(fetchLocalityStart());
    const token = localStorage.token;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_LOCAL_ENVIRONMENT_PREFIX}/api/locality/${localityId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3000",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        dispatch(fetchLocalitySuccess(data));
      } else {
        dispatch(
          fetchLocalityFail(
            "Something went wrong. Review your entities and try again"
          )
        );
      }
    } catch (error) {
      dispatch(fetchLocalityFail(error));
    }
  };

const stateSelector = (state: RootState) => state;
export const localityStateSelector = createDraftSafeSelector(
  stateSelector,
  (state) => state.locality
);
export const localitySelector = createDraftSafeSelector(
  localityStateSelector,
  (state) => state.locality
);

export const { fetchLocalityStart, fetchLocalitySuccess, fetchLocalityFail } =
  localitySlice.actions;

export default localitySlice.reducer;
