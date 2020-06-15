import firebase from "@firebase/app";
import "@firebase/firestore";
import "@firebase/auth";
import "@firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDesGS6qY9aebk9cooNVSgArESHJsjCaLM",
  authDomain: "vendoo-qa-test.firebaseapp.com",
  databaseURL: "https://vendoo-qa-test.firebaseio.com",
  projectId: "vendoo-qa-test",
  storageBucket: "vendoo-qa-test.appspot.com",
  messagingSenderId: "634735470268",
  appId: "1:634735470268:web:627e53318e9e4022e392b9",
};

const createFirebaseApp = () => {
  let app;
  if (firebase.apps.length) {
    app = firebase.apps[0];
  } else {
    app = firebase.initializeApp(firebaseConfig);
  }

  const firestore = app.firestore();

  const storage = app.storage();
  const auth = app.auth();

  // Actions
  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };
  const register = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };
  const createItem = async ({ photos, title, description, price }) => {
    if (!auth || !auth.currentUser.uid) throw new Error("User not logged in");
    const { uid } = auth.currentUser;
    return await firestore.collection(`users/${uid}/items`).add({
      photos,
      title,
      description,
      price,
    });
  };
  const updateItem = async (id, { photos, title, description, price }) => {
    if (!auth || !auth.currentUser.uid) throw new Error("User not logged in");
    const { uid } = auth.currentUser;
    return await firestore.doc(`users/${uid}/items/${id}`).set({
      photos,
      title,
      description,
      price,
    });
  };
  const getItem = async (id) => {
    return await firestore.doc(`users/${uid}/items/${id}`).get();
  };
  return {
    actions: { login, register, createItem, updateItem, getItem },
    firestore,
    storage,
    auth,
  };
};

const App = createFirebaseApp();

export default App;
