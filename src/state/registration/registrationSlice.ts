import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { UserModelDto } from "../../interfaces/UserModelDto";

interface IRegistrationState {
  loading: boolean;
  hasErrors: boolean;
  user: Array<Object>;
}

export const registrationState: IRegistrationState = {
  loading: false,
  hasErrors: false,
  user: [],
};

export const registrationSlice = createSlice({
  name: "registration",
  initialState: registrationState,
  reducers: {
    userRegistrationStart: (state) => {
      state.loading = true;
    },
    userRegistrationSuccess: (state, { payload }) => {
      state.user = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    userRegistrationFail: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const postNewUser = (newUser: UserModelDto) => {
  return async (dispatch: (arg0: { payload: any; type: string }) => void) => {
    dispatch(userRegistrationStart());
    console.log(process.env.REACT_APP_LOCAL_ENVIRONMENT_PREFIX);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_LOCAL_ENVIRONMENT_PREFIX}/api/v1/auth/signup`,
        {
          ...newUser,
        }
      );
      const { data } = response;

      dispatch(userRegistrationSuccess(data));
    } catch (error) {
      dispatch(userRegistrationFail());
    }
  };
};

export const {
  userRegistrationStart,
  userRegistrationSuccess,
  userRegistrationFail,
} = registrationSlice.actions;

export const userSelector = (state: RootState) => state.registration;

export default registrationSlice.reducer;
