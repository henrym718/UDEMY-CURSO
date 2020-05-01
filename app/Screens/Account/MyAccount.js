import React, { useState, useEffect } from "react";
import Loading from "../../Components/Loading";
import UserGuest from "../Account/UserGuest";
import UserLogged from "../Account/UserLogged";
import * as firebase from "firebase";

export default function MyAccount() {
  const [login, setlogin] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      !user ? setlogin(false) : setlogin(true);
    });
  }, []);

  if (login === null) {
    return <Loading isVisible={true} tex="CARGANDO..." />;
  }
  if (login === true) {
    return <UserLogged />;
  }
  if (login === false) {
    return <UserGuest />;
  }
}
