import React from "react";
import { AnnouncementsModel } from "src/interfaces/AnnouncementsModel";
import SupervisedSection from "src/components/shared/SupervisedSection";
import PreviewItem from "src/components/shared/IssuePreview";

interface PinnedProps {
  announcements: Array<AnnouncementsModel>;
}

const Pinned: React.FC<PinnedProps> = ({ announcements }) => {
  return (
    <SupervisedSection title="Most important">
      {announcements.map((a) => (
        <PreviewItem item={a} path="/announcements" />
      ))}
    </SupervisedSection>
  );
};

export default Pinned;
