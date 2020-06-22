import { useState, useEffect, useCallback } from "react";
import firebase from "firebase/app";

const useFetchImage = (image: string) => {
  const [mangaImage, setMangaImage] = useState<string | "">("");

  const getImageUrl = useCallback(
    async (image) => {
      const imageRef: firebase.storage.Reference = firebase
        .storage()
        .ref(`images/${image}`);
      const foundImage: string = await imageRef.getDownloadURL();
      setMangaImage(foundImage);
    },
    [image]
  );

  useEffect(() => {
    getImageUrl(image);
  }, [image, getImageUrl]);

  return mangaImage;
};

export default useFetchImage;
