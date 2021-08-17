import { createDraftSafeSelector, createSlice } from "@reduxjs/toolkit";
import { IssuesDto } from "src/interfaces/IssuesDto";
import { RootState } from "../store";
import { IssuesModel } from "../../interfaces/IssuesModel";

interface IIssuesState {
  loading: boolean;
  hasErrors: boolean;
  errorMessage: string;
  data: Array<IssuesModel>;
}

const initialIssuesState: IIssuesState = {
  loading: false,
  hasErrors: false,
  errorMessage: "",
  data: [],
};

export const issuesSlice = createSlice({
  name: "issues",
  initialState: initialIssuesState,
  reducers: {
    // POST
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
    // GET
    getAllIssuesStart: (state) => {
      state.loading = true;
    },
    getAllIssuesSuccess: (state, { payload }) => {
      state.loading = false;
      state.hasErrors = false;
      state.data = payload;
    },
    getAllIssuesFail: (state, { payload }) => {
      state.loading = false;
      state.hasErrors = true;
      state.errorMessage = payload;
    },
    // PATCH
    patchIssueStart: (state) => {
      state.loading = true;
    },
    patchIssueSuccess: (state) => {
      state.loading = false;
      state.hasErrors = false;
    },
    patchIssueFail: (state, { payload }) => {
      state.loading = false;
      state.hasErrors = true;
      state.errorMessage = payload;
    },
  },
});

export const postNewIssue = (newIssue: IssuesDto) => async (dispatch: any) => {
  dispatch(postIssueStart());
  const token = localStorage.token;

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

export const fetchAllIssues = (localityId: number) => async (dispatch: any) => {
  dispatch(getAllIssuesStart());
  const token = localStorage.token;

  try {
    const response = await fetch(
      `${process.env.REACT_APP_LOCAL_ENVIRONMENT_PREFIX}/api/issues?` +
        new URLSearchParams({ localityId: localityId.toString() }),
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
    const data = await response.json();

    if (response.status === 200) {
      dispatch(getAllIssuesSuccess(data));
    } else {
      dispatch(
        getAllIssuesFail(
          "Something went wrong. Review your entities and try again"
        )
      );
    }
  } catch (error) {
    dispatch(getAllIssuesFail(error));
  }
};

export const patchIssue =
  (issueId: number, imageUrl: string) => async (dispatch: any) => {
    dispatch(patchIssueStart());
    const token = localStorage.token;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_LOCAL_ENVIRONMENT_PREFIX}/api/issues/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3000",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            issueId,
            imageUrl,
          }),
        }
      );

      if (response.status === 200) {
        dispatch(patchIssueSuccess());
      } else {
        dispatch(
          patchIssueFail(
            "Something went wrong. Review your entities and try again"
          )
        );
      }
    } catch (error) {
      dispatch(patchIssueFail(error));
    }
  };

const stateSelector = (state: RootState) => state;
export const issuesStateSelector = createDraftSafeSelector(
  stateSelector,
  (state): IIssuesState => state.issues
);
export const issuesSelector = createDraftSafeSelector(
  issuesStateSelector,
  (state): Array<IssuesModel> => state.data
);

export const {
  postIssueStart,
  postIssueSuccess,
  postIssueFail,
  getAllIssuesStart,
  getAllIssuesSuccess,
  getAllIssuesFail,
  patchIssueStart,
  patchIssueSuccess,
  patchIssueFail,
} = issuesSlice.actions;

export default issuesSlice.reducer;
