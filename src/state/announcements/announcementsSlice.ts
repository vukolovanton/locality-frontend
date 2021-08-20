import { createDraftSafeSelector, createSlice } from "@reduxjs/toolkit";
import { AnnouncementsModel } from "src/interfaces/AnnouncementsModel";
import { api } from "src/utils/api";
import { AnnouncementDto } from "src/interfaces/AnnouncementDto";
import { RootState } from "../store";

interface IAnnouncementsState {
  loading: boolean;
  hasErrors: boolean;
  errorMessage: string;
  announcements: Array<AnnouncementsModel>;
}

const initialAnnouncementsState: IAnnouncementsState = {
  loading: false,
  hasErrors: false,
  errorMessage: "",
  announcements: [],
};

export const announcementSlice = createSlice({
  name: "announcement",
  initialState: initialAnnouncementsState,
  reducers: {
    fetchAnnouncementsStart: (state) => {
      state.loading = true;
    },
    fetchAnnouncementsSuccess: (state, { payload }) => {
      state.loading = false;
      state.hasErrors = false;
      state.announcements = payload;
    },
    fetchAnnouncementsFail: (state, { payload }) => {
      state.loading = false;
      state.hasErrors = true;
      state.errorMessage = payload;
    },
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
  },
});

// GET
export const fetchAllAnnouncements =
  (localityId: number, limit: number, page: number) =>
  async (dispatch: any) => {
    dispatch(fetchAnnouncementsStart());

    try {
      const queryParams: any = {
        localityId: localityId.toString(),
        limit: limit,
        page: page,
      };

      const response = await api.getRequest("/announcements", {
        ...queryParams,
      });

      if (response.status === 200) {
        const data = await response.json();
        dispatch(fetchAnnouncementsSuccess(data));
      } else {
        dispatch(
          fetchAnnouncementsFail(
            "Something went wrong. Review your entities and try again"
          )
        );
      }
    } catch (error) {
      dispatch(fetchAnnouncementsFail(error));
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

const stateSelector = (state: RootState) => state;
export const announcementsStateSelector = createDraftSafeSelector(
  stateSelector,
  (state): IAnnouncementsState => state.announcements
);
export const announcementsSelector = createDraftSafeSelector(
  announcementsStateSelector,
  (state): Array<AnnouncementsModel> => state.announcements
);

export const {
  fetchAnnouncementsStart,
  fetchAnnouncementsSuccess,
  fetchAnnouncementsFail,
  postAnnouncementsStart,
  postAnnouncementsSuccess,
  postAnnouncementsFail,
} = announcementSlice.actions;

export default announcementSlice.reducer;
