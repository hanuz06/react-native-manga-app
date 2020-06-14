import * as firebase from "firebase";

const fetchImage = async (imageName: string) => {
  const imageRef = firebase.storage().ref(`images/${imageName}`);
  const imageUrl = await imageRef.getDownloadURL();
  return imageUrl;
};

export default fetchImage;
