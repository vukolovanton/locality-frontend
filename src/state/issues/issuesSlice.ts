import { createDraftSafeSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface IIssuesState {
  loading: boolean;
  hasErrors: boolean;
  errorMessage: string;
  issues: {};
}

const initialIssuesState: IIssuesState = {
  loading: false,
  hasErrors: false,
  errorMessage: "",
  issues: {},
};

export const issuesSlice = createSlice({
  name: "issues",
  initialState: initialIssuesState,
  reducers: {
    postIssueStart: (state) => {
      state.loading = true;
    },
    postIssueSuccess: (state) => {
      state.loading = false;
      state.hasErrors = false;
    },
    postIssueFail: (state, { payload }) => {
      state.loading = false;
      state.hasErrors = true;
      state.errorMessage = payload;
    },
  },
});

export const postNewIssue =
  (newIssue: { title: string; description: string }) =>
  async (dispatch: any) => {
    dispatch(postIssueStart());
    const token = localStorage.token;
    console.log(token);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_LOCAL_ENVIRONMENT_PREFIX}/api/issues/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3000",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newIssue),
        }
      );

      if (response.status === 200) {
        dispatch(postIssueSuccess());
      } else {
        dispatch(
          postIssueFail(
            "Something went wrong. Review your entities and try again"
          )
        );
      }
    } catch (error) {
      dispatch(postIssueFail(error));
    }
  };

const stateSelector = (state: RootState) => state;
export const issuesStateSelector = createDraftSafeSelector(
  stateSelector,
  (state) => state.issues
);
export const issuesSelector = createDraftSafeSelector(
  issuesStateSelector,
  (state) => state.issues
);

export const { postIssueStart, postIssueSuccess, postIssueFail } =
  issuesSlice.actions;

export default issuesSlice.reducer;
