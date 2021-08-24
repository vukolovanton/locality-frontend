import { createDraftSafeSelector, createSlice } from "@reduxjs/toolkit";
import { History } from "history";
import { UserModel } from "src/interfaces/UserModel";
import { UserLoginDto } from "src/interfaces/UserLoginDto";
import { RootState } from "src/state/store";
import { Roles } from "src/interfaces/roles";
import { api } from "src/utils/api";

interface IUserLoginState {
  loading: boolean;
  hasErrors: boolean;
  isLoginSuccessfully: boolean;
  user: UserModel;
}

const initialUserLogin: IUserLoginState = {
  loading: false,
  hasErrors: false,
  isLoginSuccessfully: false,
  user: {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    token: "",
    type: "",
    roles: Roles.USER,
    id: 0,
    localityId: 0,
  },
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
      state.user = initialUserLogin.user;
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
      const response = await api.postRequest(
        "/v1/auth/signin",
        userLoginCredentials
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

const stateSelector = (state: RootState) => state;
export const userStateSelector = createDraftSafeSelector(
  stateSelector,
  (state): IUserLoginState => state.user
);
export const currentUserSelector = createDraftSafeSelector(
  userStateSelector,
  (state): UserModel => state.user
);

export default loginSlice.reducer;
