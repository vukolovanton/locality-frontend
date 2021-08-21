import { createDraftSafeSelector, createSlice } from "@reduxjs/toolkit";
import { AnnouncementsModel } from "src/interfaces/AnnouncementsModel";
import { api } from "src/utils/api";
import { AnnouncementDto } from "src/interfaces/AnnouncementDto";
import { RootState } from "../store";
import { AnnouncementsStatuses } from "../../interfaces/AnnouncementsStatuses";

interface IAnnouncementsState {
  loading: boolean;
  hasErrors: boolean;
  errorMessage: string;
  allAnnouncements: Array<AnnouncementsModel>;
  pinnedAnnouncements: Array<AnnouncementsModel>;
}

const initialAnnouncementsState: IAnnouncementsState = {
  loading: false,
  hasErrors: false,
  errorMessage: "",
  allAnnouncements: [],
  pinnedAnnouncements: [],
};

export const announcementSlice = createSlice({
  name: "announcement",
  initialState: initialAnnouncementsState,
  reducers: {
    // GET ALL
    fetchAllAnnouncementsStart: (state) => {
      state.loading = true;
    },
    fetchAllAnnouncementsSuccess: (state, { payload }) => {
      state.loading = false;
      state.hasErrors = false;
      state.allAnnouncements = payload;
    },
    fetchAllAnnouncementsFail: (state, { payload }) => {
      state.loading = false;
      state.hasErrors = true;
      state.errorMessage = payload;
    },
    // GET PINNED
    fetchPinnedAnnouncementsStart: (state) => {
      state.loading = true;
    },
    fetchPinnedAnnouncementsSuccess: (state, { payload }) => {
      state.loading = false;
      state.hasErrors = false;
      state.pinnedAnnouncements = payload;
    },
    fetchPinnedAnnouncementsFail: (state, { payload }) => {
      state.loading = false;
      state.hasErrors = true;
      state.errorMessage = payload;
    },
    // POST
    postAnnouncementsStart: (state) => {
      state.loading = true;
    },
    postAnnouncementsSuccess: (state) => {
      state.loading = false;
      state.hasErrors = false;
    },
    postAnnouncementsFail: (state, { payload }) => {
      state.loading = false;
      state.hasErrors = true;
      state.errorMessage = payload;
    },
    // PATCH
    patchAnnouncementsStart: (state) => {
      state.loading = true;
    },
    patchAnnouncementsSuccess: (state) => {
      state.loading = false;
      state.hasErrors = false;
    },
    patchAnnouncementsFail: (state, { payload }) => {
      state.loading = false;
      state.hasErrors = true;
      state.errorMessage = payload;
    },
  },
});

// GET PINNED
export const fetchPinnedAnnouncements =
  (localityId: number, limit: number, page: number) =>
  async (dispatch: any) => {
    dispatch(fetchPinnedAnnouncementsStart());

    try {
      const queryParams: any = {
        localityId: localityId.toString(),
        limit: limit,
        page: page,
        isPinned: true,
      };

      const response = await api.getRequest("/announcements", {
        ...queryParams,
      });

      if (response.status === 200) {
        const data = await response.json();
        dispatch(fetchPinnedAnnouncementsSuccess(data));
      } else {
        dispatch(
          fetchAllAnnouncementsFail(
            "Something went wrong. Review your entities and try again"
          )
        );
      }
    } catch (error) {
      dispatch(fetchPinnedAnnouncementsFail(error));
    }
  };

// GET ALL
export const fetchAllAnnouncements =
  (
    localityId: number,
    status: AnnouncementsStatuses,
    limit: number,
    page: number
  ) =>
  async (dispatch: any) => {
    dispatch(fetchAllAnnouncementsStart());

    try {
      const queryParams: any = {
        localityId: localityId.toString(),
        limit: limit,
        page: page,
        status: status,
      };

      const response = await api.getRequest("/announcements", {
        ...queryParams,
      });

      if (response.status === 200) {
        const data = await response.json();
        dispatch(fetchAllAnnouncementsSuccess(data));
      } else {
        dispatch(
          fetchAllAnnouncementsFail(
            "Something went wrong. Review your entities and try again"
          )
        );
      }
    } catch (error) {
      dispatch(fetchAllAnnouncementsFail(error));
    }
  };

// POST
export const postNewAnnouncement =
  (newAnnouncement: AnnouncementDto) => async (dispatch: any) => {
    dispatch(postAnnouncementsStart());

    try {
      const res = await api.postRequest("/announcements", newAnnouncement);

      if (res.status === 200) {
        dispatch(postAnnouncementsSuccess());
      } else {
        dispatch(
          postAnnouncementsFail(
            "Something went wrong. Review your entities and try again"
          )
        );
      }
    } catch (error) {
      dispatch(postAnnouncementsFail(error));
    }
  };

// PATCH ISSUE
export const patchAnnouncement =
  (announcementId: number, key: string, value: string) =>
  async (dispatch: any) => {
    dispatch(patchAnnouncementsStart());

    try {
      const response = await api.postRequest(
        "/announcements",
        {
          entityId: announcementId,
          key,
          value,
        },
        "PATCH"
      );

      if (response.status === 200) {
        // TODO: when we do patch update, we need to update local state
        dispatch(patchAnnouncementsSuccess());
      } else {
        dispatch(
          patchAnnouncementsFail(
            "Something went wrong. Review your entities and try again"
          )
        );
      }
    } catch (error) {
      dispatch(patchAnnouncementsFail(error));
    }
  };

const stateSelector = (state: RootState) => state;
export const announcementsStateSelector = createDraftSafeSelector(
  stateSelector,
  (state): IAnnouncementsState => state.announcements
);
export const allAnnouncementsSelector = createDraftSafeSelector(
  announcementsStateSelector,
  (state): Array<AnnouncementsModel> => state.allAnnouncements
);
export const pinnedAnnouncementsSelector = createDraftSafeSelector(
  announcementsStateSelector,
  (state): Array<AnnouncementsModel> => state.pinnedAnnouncements
);

export const {
  fetchAllAnnouncementsStart,
  fetchAllAnnouncementsSuccess,
  fetchAllAnnouncementsFail,
  fetchPinnedAnnouncementsStart,
  fetchPinnedAnnouncementsSuccess,
  fetchPinnedAnnouncementsFail,
  postAnnouncementsStart,
  postAnnouncementsSuccess,
  postAnnouncementsFail,
  patchAnnouncementsStart,
  patchAnnouncementsSuccess,
  patchAnnouncementsFail,
} = announcementSlice.actions;

export default announcementSlice.reducer;
