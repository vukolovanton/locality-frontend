import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { UserModelDto } from "../../interfaces/UserModelDto";

interface IRegistrationState {
  loading: boolean;
  hasErrors: boolean;
  userRegistrationStatus: {
    message: string;
  };
}

export interface RegistrationResponseMessage {
  message: string;
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

export const postNewUser = (newUser: UserModelDto) => async (dispatch: any) => {
  dispatch(userRegistrationStart());

  try {
    const response = await fetch(
      `${process.env.REACT_APP_LOCAL_ENVIRONMENT_PREFIX}/api/v1/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(newUser),
      }
    );

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

export const userSelector = (state: RootState) => state.registration;

export default registrationSlice.reducer;
