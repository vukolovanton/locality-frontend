export const validateObjectValues = (
  objectToValidate: Object,
  callback: (s: string) => void
): boolean => {
  let isValid = true;
  const values: Array<string> = Object.values(objectToValidate);
  values.forEach((value) => {
    if (!value) {
      isValid = false;
      callback("Review your entities and try again");
    }
  });

  return isValid;
};

export const formatDate = (mysqlDate: string) => {
  return new Date(mysqlDate).toLocaleDateString();
};

export const postImageToCloudinary = async (image: File) => {
  const data = new FormData();
  data.append("file", image || "");
  data.append("upload_preset", "locality");
  data.append("cloud_name", "vukolovanton");
  let url = "";

  try {
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/vukolovanton/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const parsedRes: any = await res.json();
    url = parsedRes.url;
  } catch (e) {
    alert(e);
  }

  return url;
};

export const normalizeBy = (key: string) => {
  return (data: any, item: any) => {
    data[item[key]] = item;
    return data;
  };
};
