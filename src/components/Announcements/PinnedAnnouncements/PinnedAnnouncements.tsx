import React from "react";
import { AnnouncementsModel } from "src/interfaces/AnnouncementsModel";
import SupervisedSection from "src/components/shared/SupervisedSection";
import PreviewItem from "src/components/shared/PreviewItem";

interface PinnedAnnouncementsProps {
  announcements: Array<AnnouncementsModel>;
}

const PinnedAnnouncements: React.FC<PinnedAnnouncementsProps> = ({
  announcements,
}) => {
  return (
    <SupervisedSection title="Most important">
      {announcements.map((a) => (
        <PreviewItem item={a} path="/announcements" key={a.id} />
      ))}
    </SupervisedSection>
  );
};

export default PinnedAnnouncements;
