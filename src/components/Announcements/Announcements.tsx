import React from "react";
import { useAnnouncements } from "src/hooks/announcements/useAnnouncements";
import SectionPageLayout from "src/components/shared/SectionPageLayout";
import CreateNewAnnouncement from "./CreateNewAnnouncement";
import Pinned from "./Pinned";

const Announcements: React.FC = () => {
  const { announcements } = useAnnouncements();

  return (
    <SectionPageLayout>
      <div>
        <Pinned announcements={announcements} />
      </div>

      <div>
        <CreateNewAnnouncement />
      </div>
    </SectionPageLayout>
  );
};

export default Announcements;
