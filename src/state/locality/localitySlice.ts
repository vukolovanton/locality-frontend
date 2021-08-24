import { createDraftSafeSelector, createSlice } from "@reduxjs/toolkit";
import { LocalityDto } from "src/interfaces/LocalityDto";
import { RootState } from "../store";
import { api } from "../../utils/api";

interface ILocalityState {
  loading: boolean;
  hasErrors: boolean;
  errorMessage: string;
  locality: LocalityDto;
}

const initialLocalityState: ILocalityState = {
  loading: false,
  hasErrors: false,
  errorMessage: "",
  locality: {
    title: "",
    description: "",
    street: "",
    city: "",
  },
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

    try {
      const response = await api.getRequest(`/locality/${localityId}`, {});

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
  (state): ILocalityState => state.locality
);
export const localitySelector = createDraftSafeSelector(
  localityStateSelector,
  (state): LocalityDto => state.locality
);

export const { fetchLocalityStart, fetchLocalitySuccess, fetchLocalityFail } =
  localitySlice.actions;

export default localitySlice.reducer;
