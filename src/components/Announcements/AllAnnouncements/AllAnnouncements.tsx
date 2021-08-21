import React from "react";
import { AnnouncementsModel } from "../../../interfaces/AnnouncementsModel";
import Filters from "../../shared/Filters";
import { PAGINATION_LIMIT } from "../../../interfaces/constants";
import {
  ANNOUNCEMENTS_STATUSES_CONFIG,
  AnnouncementsStatuses,
} from "../../../interfaces/AnnouncementsStatuses";
import PreviewItem from "../../shared/PreviewItem";

interface AllAnnouncementsProps {
  announcements: Array<AnnouncementsModel>;
  filterStatus: AnnouncementsStatuses;
  setFilterStatus: (status: AnnouncementsStatuses) => void;
  currentPage: number;
  handlePaginationClick: (type: string) => void;
}

const AllAnnouncements: React.FC<AllAnnouncementsProps> = ({
  announcements,
  filterStatus,
  setFilterStatus,
  currentPage,
  handlePaginationClick,
}) => {
  return (
    <section>
      <h2>All announcements</h2>
      <div>
        <Filters
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          config={ANNOUNCEMENTS_STATUSES_CONFIG}
        />
        <div className="grid-container">
          {announcements.map((a) => (
            <PreviewItem item={a} path="/announcements" key={a.id} />
          ))}
        </div>

        <button
          disabled={currentPage === 1}
          onClick={() => handlePaginationClick("PREV")}
        >
          Prev
        </button>
        <button
          disabled={announcements.length < PAGINATION_LIMIT}
          onClick={() => handlePaginationClick("NEXT")}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default AllAnnouncements;
