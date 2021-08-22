import { createDraftSafeSelector, createSlice } from "@reduxjs/toolkit";
import { IssuesDto } from "src/interfaces/IssuesDto";
import { IssuesModel } from "src/interfaces/IssuesModel";
import { api } from "src/utils/api";
import { IssueStatuses } from "src/interfaces/IssueStatuses";
import { RootState } from "../store";

interface IIssuesState {
  isFetching: boolean;
  isUpdating: boolean;
  hasErrors: boolean;
  errorMessage: string;
  allIssues: Array<IssuesModel>;
  recentIssues: Array<IssuesModel>;
  singleIssue: IssuesModel;
}

const initialIssuesState: IIssuesState = {
  isFetching: false,
  isUpdating: false,
  hasErrors: false,
  errorMessage: "",
  allIssues: [],
  recentIssues: [],
  singleIssue: {
    id: 0,
    title: "",
    description: "",
    status: "",
    imageUrl: "",
    username: "",
    createdAt: ",",
  },
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
    // GET SINGLE
    getSingleIssueStart: (state) => {
      state.isFetching = true;
    },
    getSingleIssueSuccess: (state, { payload }) => {
      state.isFetching = false;
      state.hasErrors = false;
      state.singleIssue = payload;
    },
    getSingleIssueFail: (state, { payload }) => {
      state.isFetching = false;
      state.hasErrors = true;
      state.errorMessage = payload;
    },
    // POST
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
    // PATCH
    patchIssueStart: (state) => {
      state.isUpdating = true;
    },
    patchIssueSuccess: (state, { payload }) => {
      state.isUpdating = false;
      state.hasErrors = false;
      // @ts-ignore
      state.singleIssue[payload.key] = payload.value;
    },
    patchIssueFail: (state, { payload }) => {
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

// FETCH SINGLE
export const fetchSingleIssue = (issueId: number) => async (dispatch: any) => {
  dispatch(getSingleIssueStart());

  try {
    const response = await api.getRequest(`/issues/${issueId}`, {});
    const data = await response.json();

    if (response.status === 200) {
      dispatch(getSingleIssueSuccess(data));
    }
  } catch (error) {
    dispatch(getSingleIssueFail(error));
  }
};

// PATCH ISSUE
export const patchIssue =
  (issueId: number, key: string, value: string) => async (dispatch: any) => {
    dispatch(patchIssueStart());

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
        dispatch(patchIssueSuccess({ key, value }));
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
// SINGLE
export const singleIssueSelector = createDraftSafeSelector(
  issuesStateSelector,
  (state): IssuesModel => state.singleIssue || {}
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
  patchIssueStart,
  patchIssueSuccess,
  patchIssueFail,
  getSingleIssueStart,
  getSingleIssueSuccess,
  getSingleIssueFail,
} = issuesSlice.actions;

export default issuesSlice.reducer;
