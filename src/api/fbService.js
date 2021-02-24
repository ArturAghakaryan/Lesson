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
    const data = res.toJSON();
    return Object.values(data);
  };
  getPosts = async (startAt = 0, endAt = 8) => {
    const res = await firebase
      .database()
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
  };

  createPost = async (postData) => {
    const res = await firebase
      .database()
      .ref("posts")
      .orderByKey()
      .limitToLast(1)
      .get();
    const lastItemJSON = res.toJSON();
    const lastItem = Object.values(lastItemJSON)[0];
    const { id } = lastItem;
    const newItem = {
      ...postData,
      id: id + 1,
    };
    await firebase
      .database()
      .ref(`posts/${id + 1}`)
      .set(newItem);

    return newItem;
  };

  updatePost = async (postData) => {
    const postRef = firebase.database().ref(`posts/${postData.id}`);
    await postRef.update(postData);
    const res = await postRef.get();
    return res.val();
  };

  deletePost = async (id, startAt = 0, endAt = 8) => {
    const postRef = firebase.database().ref(`posts/${id}`);
    await postRef.remove();

    const posts = await this.getAllPosts();
    await firebase
      .database()
      .ref("posts")
      .set(
        posts.map((el, index) => {
          return { ...el, id: index };
        })
      );

    const data = await this.getPosts(startAt, endAt);
    return data;
  };
}

const fbService = new FbService();

export default fbService;
