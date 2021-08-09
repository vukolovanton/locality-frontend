import { createSlice } from "@reduxjs/toolkit";
import { UserModel } from "../../../interfaces/UserModel";
import { UserLoginDto } from "../../../interfaces/UserLoginDto";
import { RootState } from "../../store";

interface IUserLogin {
  loading: boolean;
  hasErrors: boolean;
  user: string;
}

const initialUserLogin: IUserLogin = {
  loading: false,
  hasErrors: false,
  user: "",
};

export const loginSlice = createSlice({
  name: "login",
  initialState: initialUserLogin,
  reducers: {
    userLoginStart: (state) => {
      state.loading = true;
    },
    userLoginSuccess: (state, { payload }) => {
      state.loading = false;
      state.hasErrors = false;
      state.user = payload;
    },
    userLoginFail: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const userLoginFetch =
  (userLoginCredentials: UserLoginDto) => async (dispatch: any) => {
    dispatch(userLoginStart());

    try {
      const response = await fetch(
        `${process.env.REACT_APP_LOCAL_ENVIRONMENT_PREFIX}/api/v1/auth/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3000",
          },
          body: JSON.stringify(userLoginCredentials),
        }
      );

      const result: UserModel = await response.json();

      if (response.status === 200) {
        dispatch(userLoginSuccess(result));
        localStorage.setItem("token", result.token);
      } else {
        dispatch(userLoginFail());
      }
    } catch (error) {
      dispatch(userLoginFail());
    }
  };

export const { userLoginStart, userLoginFail, userLoginSuccess } =
  loginSlice.actions;

export const userSelector = (state: RootState) => state.user;

export default loginSlice.reducer;
