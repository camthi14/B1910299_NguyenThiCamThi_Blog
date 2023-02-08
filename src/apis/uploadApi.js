import instance from "./axios";

const uploadApi = {
  image: async (files) => {
    const data = new FormData();
    data.append("files", files);
    return await instance.post("/image/upload", data);
  },
};

export default uploadApi;
