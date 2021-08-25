import React, { FormEvent, useState } from "react";
import { postImageToCloudinary } from "src/utils/helpers";

interface InputUploadProps {
  setImageUrl: (url: string) => void;
}

const ImageUpload: React.FC<InputUploadProps> = ({ setImageUrl }) => {
  const [imageFile, setImageFile] = useState<File>();
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleImageUpload = async (e: FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    if (imageFile) {
      const cloudinaryLink = await postImageToCloudinary(imageFile);
      if (cloudinaryLink !== "") {
        setImageUrl(cloudinaryLink);
        setIsSuccessful(true);
        setIsUploading(false);
      }
    }
  };

  return (
    <>
      <input
        type="file"
        style={{ boxShadow: "none" }}
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          const file: File = (target.files as FileList)[0];
          setImageFile(file);
        }}
      />
      {imageFile && isSuccessful ? (
        <span>Image uploaded successfully!</span>
      ) : (
        <button onClick={handleImageUpload} disabled={!imageFile}>
          {isUploading ? "Please wait..." : "Upload"}
        </button>
      )}
    </>
  );
};

export default ImageUpload;
