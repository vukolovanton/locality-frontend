import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/state/store";
import { UserRegistrationDto } from "src/interfaces/UserRegistrationDto";
import { api } from "src/utils/api";

interface IRegistrationState {
  loading: boolean;
  hasErrors: boolean;
  userRegistrationStatus: {
    message: string;
  };
}

const initialRegistrationState: IRegistrationState = {
  loading: false,
  hasErrors: false,
  userRegistrationStatus: {
    message: "",
  },
};

export const registrationSlice = createSlice({
  name: "registration",
  initialState: initialRegistrationState,
  reducers: {
    userRegistrationStart: (state) => {
      state.loading = true;
    },
    userRegistrationSuccess: (state, { payload }) => {
      state.userRegistrationStatus = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    userRegistrationFail: (state, { payload }) => {
      state.userRegistrationStatus = payload;
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const postNewUser =
  (newUser: UserRegistrationDto) => async (dispatch: any) => {
    dispatch(userRegistrationStart());

    try {
      const response = await api.postRequest("/v1/auth/signup", newUser);
      const result = await response.json();

      if (response.status === 200) {
        dispatch(userRegistrationSuccess(result));
      } else {
        dispatch(userRegistrationFail(result));
      }
    } catch (error) {
      dispatch(userRegistrationFail(error));
    }
  };

export const {
  userRegistrationStart,
  userRegistrationSuccess,
  userRegistrationFail,
} = registrationSlice.actions;

export const registrationUserSelector = (
  state: RootState
): IRegistrationState => state.registration;

export default registrationSlice.reducer;
