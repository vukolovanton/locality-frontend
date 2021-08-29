import React from "react";
import SectionPageLayout from "src/components/shared/SectionPageLayout";
import CreateNewAnnouncement from "./CreateNewAnnouncement";
import SearchAnnouncement from "./SearchAnnouncement";
import PreviewAnnouncements from "./PreviewAnnouncements";

const Announcements: React.FC = () => {
  return (
    <SectionPageLayout>
      <PreviewAnnouncements />

      <div>
        <CreateNewAnnouncement />
        <SearchAnnouncement />
      </div>
    </SectionPageLayout>
  );
};

export default Announcements;
