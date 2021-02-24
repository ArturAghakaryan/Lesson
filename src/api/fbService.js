import firebase from "firebase/app";
import "firebase/database";
import firebaseConfig from "./firebaseConfig";

class FbService {
  constructor() {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  getAllPosts = async () => {
    const res = await firebase.database().ref("posts").get();
    return res.val();
  };

  getPosts = async (startAt = 1 , endAt = 9) => {
      console.log("startAt", startAt);
      console.log("endAt", endAt);
    const res  = await  firebase.database()
    .ref("posts")
    .orderByKey()
    .startAt(startAt.toString())
    .endAt(endAt.toString())
    .get();

    const data = res.toJSON();
    return Object.values(data);
  };

  getPost = async (id) => {
    const res = await firebase.database().ref(`posts/${id}`).get();
    return res.val();
  }


  updatePost = async (postData) => {

  }
}

const fbService = new FbService();

export default fbService;
