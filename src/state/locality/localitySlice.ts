import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ILocalityState {
  loading: boolean;
  hasErrors: boolean;
  errorMessage: string;
}

const initialLocalityState: ILocalityState = {
  loading: false,
  hasErrors: false,
  errorMessage: "",
};

export const localitySlice = createSlice({
  name: "locality",
  initialState: initialLocalityState,
  reducers: {
    fetchLocalityStart: (state) => {
      state.loading = true;
    },
    fetchLocalitySuccess: (state) => {
      state.loading = false;
      state.hasErrors = false;
    },
    fetchLocalityFail: (state, { payload }) => {
      state.loading = false;
      state.hasErrors = true;
      state.errorMessage = payload;
    },
  },
});

export const fetchUsersLocality = () => async (dispatch: any) => {
  dispatch(fetchLocalityStart());
  const token = localStorage.token;

  try {
    const response = await fetch(
      `${process.env.REACT_APP_LOCAL_ENVIRONMENT_PREFIX}/api/locality`,
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
      dispatch(fetchLocalitySuccess());
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

export const { fetchLocalityStart, fetchLocalitySuccess, fetchLocalityFail } =
  localitySlice.actions;

export const currentLocalitySelector = (state: RootState) => {
  return state.localityCreation;
};

export default localitySlice.reducer;
