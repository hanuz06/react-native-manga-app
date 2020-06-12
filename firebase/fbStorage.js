// import * as firebase from "firebase";
let fs = require("fs");

let imageNames = [];

function readContent() {
  fs.readdir("../assets/images", "utf8", function (err, data) {
    if (err) {
      return console.log("ERROR IN FS ", err);
    }

    // console.log("data from fs ", data);
    imageNames = data;
    console.log("imageNamges ", imageNames);
  });
}


readContent();
// uploadImages(imageNames) {
//   return new Promise((resolve, reject) => {
//     const urls = [];
//     for (const file of imageNames) {
//       // const path = `${title}/${Date.now()}_${file.name}`;
//       const ref = firebase.storage.ref(file);
//       const task = firebase.storage.upload(file, file);

//       task.snapshotChanges().pipe(
//         finalize(() => {
//           ref.getDownloadURL().subscribe(url => {
//             urls.push(url);

//             if (imageNames.length === urls.length) {
//               resolve(urls);
//             }
//           });
//         })
//       ).subscribe();
//     }
//   });
// }

