import { createSlice } from "@reduxjs/toolkit";
import { History } from "history";
import { UserModel } from "src/interfaces/UserModel";
import { UserLoginDto } from "src/interfaces/UserLoginDto";
import { RootState } from "src/state/store";

interface IUserLogin {
  loading: boolean;
  hasErrors: boolean;
  isLoginSuccessfully: boolean;
  user: {};
}

const initialUserLogin: IUserLogin = {
  loading: false,
  hasErrors: false,
  isLoginSuccessfully: false,
  user: {},
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
      state.isLoginSuccessfully = true;
      state.user = payload;
    },
    userLoginFail: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
    userLogout: (state) => {
      state.user = {};
      state.isLoginSuccessfully = false;
    },
  },
});

export const userLoginFetch =
  (
    userLoginCredentials: UserLoginDto,
    shouldSetToken: boolean,
    history?: History
  ) =>
  async (dispatch: any) => {
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
        if (shouldSetToken) {
          localStorage.setItem("token", result.token);
          if (history) {
            history.push("/");
          }
        }
      } else {
        dispatch(userLoginFail());
      }
    } catch (error) {
      dispatch(userLoginFail());
    }
  };

export const { userLoginStart, userLoginFail, userLoginSuccess, userLogout } =
  loginSlice.actions;

export const userSelector = (state: RootState) => state.user;

export default loginSlice.reducer;
