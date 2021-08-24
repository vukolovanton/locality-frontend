import { createDraftSafeSelector, createSlice } from "@reduxjs/toolkit";
import { api } from "src/utils/api";
import { IssueStatsModel } from "src/interfaces/dashboard/IssueStatsModel";
import { AnnouncementsStatsModel } from "src/interfaces/dashboard/AnnouncementsStatsModel";
import { UserStatsModel } from "src/interfaces/dashboard/UserStatsModel";
import { RootState } from "../store";

interface IDashboardState {
  loadingIssuesStats: boolean;
  loadingAnnouncementsStats: boolean;
  loadingUsersStats: boolean;
  issuesStats: Array<IssueStatsModel>;
  announcementsStats: Array<AnnouncementsStatsModel>;
  usersStats: Array<UserStatsModel>;
  hasErrors: boolean;
  errorMessage: string;
}

const initialDashboardState: IDashboardState = {
  loadingIssuesStats: false,
  loadingAnnouncementsStats: false,
  loadingUsersStats: false,
  issuesStats: [],
  announcementsStats: [],
  usersStats: [],
  hasErrors: false,
  errorMessage: "",
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: initialDashboardState,
  reducers: {
    // ISSUES STATS
    getIssuesStatsStart: (state) => {
      state.loadingIssuesStats = true;
    },
    getIssuesStatsSuccess: (state, { payload }) => {
      state.loadingIssuesStats = false;
      state.hasErrors = false;
      state.issuesStats = payload;
    },
    getIssuesStatsFail: (state, { payload }) => {
      state.loadingIssuesStats = false;
      state.hasErrors = true;
      state.errorMessage = payload;
    },
    // ANNOUNCEMENTS STATS
    getAnnouncementsStatsStart: (state) => {
      state.loadingAnnouncementsStats = true;
    },
    getAnnouncementsStatsSuccess: (state, { payload }) => {
      state.loadingAnnouncementsStats = false;
      state.hasErrors = false;
      state.announcementsStats = payload;
    },
    getAnnouncementsStatsFail: (state, { payload }) => {
      state.loadingAnnouncementsStats = false;
      state.hasErrors = true;
      state.errorMessage = payload;
    },
    // USERS STATS
    getUsersStatsStart: (state) => {
      state.loadingUsersStats = true;
    },
    getUsersStatsSuccess: (state, { payload }) => {
      state.loadingUsersStats = false;
      state.hasErrors = false;
      state.usersStats = payload;
    },
    getUsersStatsFail: (state, { payload }) => {
      state.loadingUsersStats = false;
      state.hasErrors = true;
      state.errorMessage = payload;
    },
  },
});

// GET ISSUE STATS
export const fetchIssuesStats =
  (localityId: number) => async (dispatch: any) => {
    dispatch(getIssuesStatsStart());
    try {
      const response = await api.getRequest("/dashboard/issues", {
        localityId: localityId,
      });

      if (response.status === 200) {
        const data = await response.json();
        dispatch(getIssuesStatsSuccess(data));
      }
    } catch (error) {
      dispatch(getIssuesStatsFail(error));
    }
  };

// GET ANNOUNCEMENTS STATS
export const fetchAnnouncementsStats =
  (localityId: number) => async (dispatch: any) => {
    dispatch(getAnnouncementsStatsStart());
    try {
      const response = await api.getRequest("/dashboard/announcements", {
        localityId: localityId,
      });

      if (response.status === 200) {
        const data = await response.json();
        dispatch(getAnnouncementsStatsSuccess(data));
      }
    } catch (error) {
      dispatch(getAnnouncementsStatsFail(error));
    }
  };

// GET USERS STATS
export const fetchUsersStats =
  (localityId: number) => async (dispatch: any) => {
    dispatch(getUsersStatsStart());
    try {
      const response = await api.getRequest("/dashboard/users", {
        localityId: localityId,
      });

      if (response.status === 200) {
        const data = await response.json();
        dispatch(getUsersStatsSuccess(data));
      }
    } catch (error) {
      dispatch(getUsersStatsFail(error));
    }
  };

// export const fetchAllStatsV2 = (localityId: number) => async (dispatch: any) => {
//   dispatch(getIssuesStatsStart());
//   dispatch(getAnnouncementsStatsStart());
//   dispatch(getUsersStatsStart());
//
//   try {
//     const [issuesRes, announcementsRes, userRes] = await Promise.all([
//       api.getRequest("/dashboard/issues", {
//         localityId: localityId,
//       }),
//       api.getRequest("/dashboard/announcements", {
//         localityId: localityId,
//       }),
//       api.getRequest("/dashboard/users", {
//         localityId: localityId,
//       }),
//     ]);
//
//     if (issuesRes.status === 200) {
//       const data = await issuesRes.json();
//       dispatch(getIssuesStatsSuccess(data));
//     }
//
//     if (announcementsRes.status === 200) {
//       const data = await announcementsRes.json();
//       dispatch(getAnnouncementsStatsSuccess(data));
//     }
//
//     if (userRes.status === 200) {
//       const data = await userRes.json();
//       dispatch(getUsersStatsSuccess(data));
//     }
//   } catch (error) {
//     getIssuesStatsFail(error);
//     getAnnouncementsStatsFail(error);
//     getUsersStatsFail(error);
//   }
// };

export const fetchAllStats = (localityId: number) => async (dispatch: any) => {
  dispatch(fetchIssuesStats(localityId));
  dispatch(fetchAnnouncementsStats(localityId));
  dispatch(fetchUsersStats(localityId));
};

export const {
  getIssuesStatsStart,
  getIssuesStatsSuccess,
  getIssuesStatsFail,
  getAnnouncementsStatsStart,
  getAnnouncementsStatsSuccess,
  getAnnouncementsStatsFail,
  getUsersStatsStart,
  getUsersStatsSuccess,
  getUsersStatsFail,
} = dashboardSlice.actions;

const stateSelector = (state: RootState) => state;
export const dashboardStateSelector = createDraftSafeSelector(
  stateSelector,
  (state): IDashboardState => state.dashboard
);
// ISSUES
export const issuesStatsSelector = createDraftSafeSelector(
  dashboardStateSelector,
  (state): Array<IssueStatsModel> => state.issuesStats
);
// ANNOUNCEMENTS
export const announcementsStatsSelector = createDraftSafeSelector(
  dashboardStateSelector,
  (state): Array<AnnouncementsStatsModel> => state.announcementsStats
);
// USERS
export const usersStatsSelector = createDraftSafeSelector(
  dashboardStateSelector,
  (state): Array<UserStatsModel> => state.usersStats
);

export default dashboardSlice.reducer;
