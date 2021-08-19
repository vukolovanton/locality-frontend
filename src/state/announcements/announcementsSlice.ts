import { createDraftSafeSelector, createSlice } from "@reduxjs/toolkit";
import { AnnouncementsModel } from "src/interfaces/AnnouncementsModel";
import { api } from "src/utils/api";
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
  },
});

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
} = announcementSlice.actions;

export default announcementSlice.reducer;
