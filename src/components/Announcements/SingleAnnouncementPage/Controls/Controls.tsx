import React, { ChangeEvent } from "react";
import {
  ANNOUNCEMENTS_STATUSES_CONFIG,
  AnnouncementsStatuses,
} from "src/interfaces/AnnouncementsStatuses";

interface ControlsProps {
  status: AnnouncementsStatuses;
  isPinned: boolean;
  handleAnnouncementStatusChange: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;
  handleAnnouncementPinnedChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Controls: React.FC<ControlsProps> = ({
  status,
  isPinned,
  handleAnnouncementStatusChange,
  handleAnnouncementPinnedChange,
}) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        alignItems: "center",
        justifyItems: "start",
      }}
    >
      <div>
        <label htmlFor="options">Change status:</label>
        <select
          name="options"
          id="options"
          required
          value={status}
          onChange={handleAnnouncementStatusChange}
        >
          {ANNOUNCEMENTS_STATUSES_CONFIG.map((c) => (
            <option value={c.value} key={c.value}>
              {c.title}
            </option>
          ))}
        </select>
      </div>

      <div
        className="checkbox"
        style={{
          justifySelf: "end",
        }}
      >
        <input
          type="checkbox"
          name="isPinned"
          id="isPinned"
          checked={isPinned}
          onChange={handleAnnouncementPinnedChange}
        />
        <label htmlFor="isPinned">
          <i className="material-icons">bookmark_border</i>
        </label>
      </div>
    </div>
  );
};

export default Controls;
