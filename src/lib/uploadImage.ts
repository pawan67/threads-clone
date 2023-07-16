import axios from "axios";

export const uploadImage = async (file: File) => {
  const payload = new FormData();
  payload.append("file", file);
  payload.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET!);
  payload.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!);

  const { data } = await axios.post(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    payload
  );

  return data.secure_url;
};
