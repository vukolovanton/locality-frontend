import { createDraftSafeSelector, createSlice } from "@reduxjs/toolkit";
import { IssuesDto } from "src/interfaces/IssuesDto";
import { RootState } from "../store";
import { IssuesModel } from "../../interfaces/IssuesModel";
import { api } from "../../utils/api";
import { IssueStatuses } from "../../interfaces/IssueStatuses";

interface IIssuesState {
  isFetching: boolean;
  isUpdating: boolean;
  hasErrors: boolean;
  errorMessage: string;
  allIssues: Array<IssuesModel>;
  recentIssues: Array<IssuesModel>;
}

const initialIssuesState: IIssuesState = {
  isFetching: false,
  isUpdating: false,
  hasErrors: false,
  errorMessage: "",
  allIssues: [],
  recentIssues: [],
};

export const issuesSlice = createSlice({
  name: "issues",
  initialState: initialIssuesState,
  reducers: {
    // GET ALL
    getAllIssuesStart: (state) => {
      state.isFetching = true;
    },
    getAllIssuesSuccess: (state, { payload }) => {
      state.isFetching = false;
      state.hasErrors = false;
      state.allIssues = payload;
    },
    getAllIssuesFail: (state, { payload }) => {
      state.isFetching = false;
      state.hasErrors = true;
      state.errorMessage = payload;
    },
    // GET RECENT
    getRecentIssuesStart: (state) => {
      state.isFetching = true;
    },
    getRecentIssuesSuccess: (state, { payload }) => {
      state.isFetching = false;
      state.hasErrors = false;
      state.recentIssues = payload;
    },
    getRecentIssuesFail: (state, { payload }) => {
      state.isFetching = false;
      state.hasErrors = true;
      state.errorMessage = payload;
    },
    // POST AND PATCH
    updateIssueStart: (state) => {
      state.isUpdating = true;
    },
    updateIssueSuccess: (state) => {
      state.isUpdating = false;
      state.hasErrors = false;
    },
    updateIssueFail: (state, { payload }) => {
      state.isUpdating = false;
      state.hasErrors = true;
      state.errorMessage = payload;
    },
  },
});

// POST
export const postNewIssue = (newIssue: IssuesDto) => async (dispatch: any) => {
  dispatch(updateIssueStart());
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
      dispatch(updateIssueSuccess());
    } else {
      dispatch(
        updateIssueFail(
          "Something went wrong. Review your entities and try again"
        )
      );
    }
  } catch (error) {
    dispatch(updateIssueFail(error));
  }
};

// FETCH RECENT
export const fetchRecentIssues =
  (localityId: number, orderBy: string, limit: number) =>
  async (dispatch: any) => {
    dispatch(getRecentIssuesStart());

    const queryParams: any = {
      localityId: localityId.toString(),
      orderBy: orderBy,
      limit: limit,
    };

    try {
      const response = await api.getRequest("/issues", {
        ...queryParams,
      });
      const data = await response.json();

      if (response.status === 200) {
        dispatch(getRecentIssuesSuccess(data));
      }
    } catch (error) {
      dispatch(getRecentIssuesFail(error));
    }
  };

// FETCH ALL
export const fetchAllIssues =
  (localityId: number, status: IssueStatuses, limit: number, page: number) =>
  async (dispatch: any) => {
    dispatch(getAllIssuesStart());

    const queryParams: any = {
      localityId: localityId.toString(),
      status: status,
      limit: limit,
      page: page,
    };

    try {
      const response = await api.getRequest("/issues", {
        ...queryParams,
      });
      const data = await response.json();

      if (response.status === 200) {
        dispatch(getAllIssuesSuccess(data));
      }
    } catch (error) {
      dispatch(getAllIssuesFail(error));
    }
  };

// PATCH ISSUE
export const patchIssue =
  (issueId: number, key: string, value: string) => async (dispatch: any) => {
    dispatch(updateIssueStart());

    try {
      const response = await api.postRequest(
        "/issues",
        {
          issueId,
          key,
          value,
        },
        "PATCH"
      );

      if (response.status === 200) {
        // TODO: when we do patch update, we need to update local state
        dispatch(updateIssueSuccess());
      } else {
        dispatch(
          updateIssueFail(
            "Something went wrong. Review your entities and try again"
          )
        );
      }
    } catch (error) {
      dispatch(updateIssueFail(error));
    }
  };

// STATE
const stateSelector = (state: RootState) => state;
export const issuesStateSelector = createDraftSafeSelector(
  stateSelector,
  (state): IIssuesState => state.issues
);
// RECENT
export const recentIssuesSelector = createDraftSafeSelector(
  issuesStateSelector,
  (state): Array<IssuesModel> => state.recentIssues
);
// ALL
export const allIssuesSelector = createDraftSafeSelector(
  issuesStateSelector,
  (state): Array<IssuesModel> => state.allIssues
);

export const {
  updateIssueStart,
  updateIssueSuccess,
  updateIssueFail,
  getAllIssuesStart,
  getAllIssuesSuccess,
  getAllIssuesFail,
  getRecentIssuesStart,
  getRecentIssuesSuccess,
  getRecentIssuesFail,
} = issuesSlice.actions;

export default issuesSlice.reducer;
