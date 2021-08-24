import React from "react";
import { LocalityDto } from "src/interfaces/LocalityDto";
import styles from "src/components/Registration/styles.module.scss";

interface SearchLocalityPreviewProps {
  locality: LocalityDto;
  handleLocalityIdSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchLocalityPreview: React.FC<SearchLocalityPreviewProps> = ({
  locality,
  handleLocalityIdSelect,
}) => {
  return (
    <div className={styles.previewItem}>
      <input
        type="radio"
        name="locality"
        value={locality.id}
        id={locality.title}
        onChange={handleLocalityIdSelect}
      />
      <label className={styles.localityTitle} htmlFor={locality.title}>
        {locality.title}
      </label>
      <span>
        {locality.city}, {locality.street}
      </span>
    </div>
  );
};

export default SearchLocalityPreview;
