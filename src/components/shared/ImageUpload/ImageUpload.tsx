import React, { FormEvent, useState } from "react";
import { postImageToCloudinary } from "src/utils/helpers";

interface InputUploadProps {
  setImageUrl: (url: string) => void;
}

const ImageUpload: React.FC<InputUploadProps> = ({ setImageUrl }) => {
  const [imageFile, setImageFile] = useState<File>();

  const handleImageUpload = async (e: FormEvent) => {
    e.preventDefault();
    if (imageFile) {
      const cloudinaryLink = await postImageToCloudinary(imageFile);
      setImageUrl(cloudinaryLink);
    }
  };

  return (
    <>
      <input
        type="file"
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          const file: File = (target.files as FileList)[0];
          setImageFile(file);
        }}
      />
      <button onClick={handleImageUpload}>Upload</button>
    </>
  );
};

export default ImageUpload;
