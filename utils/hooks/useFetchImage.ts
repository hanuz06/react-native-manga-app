import { useState, useEffect, useCallback } from "react";
import * as firebase from "firebase/app";
import "firebase/storage";

const useFetchImage = (image: string) => {
  const [mangaImage, setMangaImage] = useState<string | "">("");
  
  const getImageUrl = useCallback(
    async (image) => {
      const imageRef: any = firebase.storage().ref(`images/${image}`);
      const foundImage = await imageRef.getDownloadURL();
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
