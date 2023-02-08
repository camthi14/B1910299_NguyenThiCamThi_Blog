import uploadApi from "@/apis/uploadApi";

export function convertToSlug(Text) {
  return Text.toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

export function uploadImage(loader) {
  return {
    upload: () => {
      return new Promise(async (resolve, reject) => {
        loader.file.then(async (file) => {
          try {
            if (!file) return;

            //*Call Api upload image to server
            const response = await uploadApi.image(file);
            console.log(response);

            if (response) {
              const urlImage = `${process.env.VUE_APP_ENDPOINT_URL}/${response?.filename}`;
              console.log(urlImage);
              //* result {default: urlImage}
              resolve({ default: urlImage });
            }
          } catch (error) {
            reject(error);
          }
        });
      });
    },
  };
}
