import * as firebase from "firebase";

export const reauthenticate = async (password) => {
  const email = await firebase.auth().currentUser.email;
  const credentials = await firebase.auth.EmailAuthProvider.credential(
    email,
    password
  );
  return firebase.auth().currentUser.reauthenticateWithCredential(credentials);
};
