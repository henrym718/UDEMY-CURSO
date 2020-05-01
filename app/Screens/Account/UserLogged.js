import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import Toast from "react-native-easy-toast";
import * as firebase from "firebase";
import InfoUser from "../../Components/Account/InfoUser";
import AccountOptions from "../../Components/Account/AccountOptions";

export default function UserLogged() {
  const toastRef = useRef("");

  const [userInfo, setUserInfo] = useState({});
  const [reloadData, setReloadData] = useState(false);

  useEffect(() => {
    (async () => {
      const user = await firebase.auth().currentUser;
      setUserInfo(user.providerData[0]);
    })();
    setReloadData(false);
  }, [reloadData]);

  return (
    <View style={styles.viewUserInfor}>
      <InfoUser
        userInfo={userInfo}
        setReloadData={setReloadData}
        toastRef={toastRef}
      />
      <AccountOptions
        userInfo={userInfo}
        setReloadData={setReloadData}
        toastRef={toastRef}
      />
      <Button
        title="Cerrar Sesión"
        onPress={() => firebase.auth().signOut()}
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.buttonst}
        titleStyle={styles.textButon}
      />
      <Toast
        ref={toastRef}
        opacity={0.7}
        position="center"
        fadeInDuration={750}
        fadeOutDuration={1500}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewUserInfor: {
    minHeight: "100%",
    backgroundColor: "#f2f2f2",
  },
  buttonContainer: {
    //width: "100%",
    //alignContent: "center",
    //alignSelf: "center",
    //marginTop: 30,
  },
  buttonst: {
    marginTop: 30,
    borderRadius: 60,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: "#e3e3e3",
    borderBottomColor: "#e3e3e3",
    paddingTop: 10,
    paddingBottom: 10,
  },
  textButon: {
    color: "#00a680",
  },
});
