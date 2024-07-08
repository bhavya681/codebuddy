import axios from "axios";

export const useUpload = async ({ image, onUploadProgress }) => {
  try {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "coder-buddy"); // ensure this preset exists in your Cloudinary account
    formData.append("api_key", "499681822989638"); // replace with your Cloudinary API key

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: onUploadProgress,
    };

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dkcqln50d/image/upload",
      formData,
      config
    );

    const data = res.data;
    if (!data) {
      throw new Error("Error while uploading image");
    }

    return {
      public_id: data.public_id,
      url: data.secure_url,
    };
  } catch (error) {
    return { error: error.message };
  }
};
