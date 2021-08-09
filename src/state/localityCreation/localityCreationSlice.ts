import { createSlice } from "@reduxjs/toolkit";
import { LocalityDto } from "../../interfaces/LocalityDto";

interface ILocalityCreationState {
  loading: boolean;
  hasErrors: boolean;
  errorMessage: string;
}

const initialLocalityCreationState: ILocalityCreationState = {
  loading: false,
  hasErrors: false,
  errorMessage: "",
};

export const localityCreationSlice = createSlice({
  name: "localityCreation",
  initialState: initialLocalityCreationState,
  reducers: {
    localityCreationStart: (state) => {
      state.loading = true;
    },
    localityCreationSuccess: (state) => {
      state.loading = false;
      state.hasErrors = false;
    },
    localityCreationFail: (state, { payload }) => {
      state.loading = false;
      state.hasErrors = true;
      state.errorMessage = payload;
    },
  },
});

export const postNewLocality =
  (newLocality: LocalityDto) => async (dispatch: any) => {
    dispatch(localityCreationStart());
    const token = localStorage.token;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_LOCAL_ENVIRONMENT_PREFIX}/api/locality`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3000",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newLocality),
        }
      );

      if (response.status === 200) {
        dispatch(localityCreationSuccess());
      } else if (response.status === 403) {
        dispatch(
          localityCreationFail(
            "You should register a new user before creating Locality"
          )
        );
      } else {
        dispatch(
          localityCreationFail(
            "Something went wrong. Review your entities and try again"
          )
        );
      }
    } catch (error) {
      dispatch(localityCreationFail(error));
    }
  };

export const {
  localityCreationStart,
  localityCreationSuccess,
  localityCreationFail,
} = localityCreationSlice.actions;

export default localityCreationSlice.reducer;
