import firebase from "firebase/app";
import "firebase/firestore";
import { firebaseConfig } from "./config";

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({
  cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED,
});
firebase
  .firestore()
  .enablePersistence({ synchronizeTabs: true })
  .then(() => {
    firebase.firestore();
    console.log("Offline support enabled");
  })

export default firebase.firestore();