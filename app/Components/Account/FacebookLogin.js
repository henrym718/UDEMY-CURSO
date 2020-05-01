import { SocialIcon } from "react-native-elements";
import React, { useState } from "react";
import * as Facebook from "expo-facebook";
import { FacebookApi } from "../../Utils/social";
import * as firebase from "firebase";
import Loading from "../Loading";
import { View } from "react-native";

export default function FacebookLogin(props) {
  const { toastFef, navigation } = props;
  const [isLoading, seIsLoading] = useState(false);

  Facebook.initializeAsync(FacebookApi.id);

  const loginfacebook = async () => {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync({
      permissions: FacebookApi.permissions,
    });

    if (type === "success") {
      const credentials = firebase.auth.FacebookAuthProvider.credential(token);
      seIsLoading(true);
      await firebase
        .auth()
        .signInWithCredential(credentials)
        .then(() => {
          navigation.navigate("MyAccount");
        })
        .catch(() => {
          toastFef.current.show("Error de logueo");
        });
    } else if (type === "cancel") {
      toastFef.current.show("Inicio de sesion cancelado");
    } else {
      toastFef.current.show("Error desconocido, intente más tarde");
    }
    seIsLoading(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <SocialIcon
        button
        title="sing whint Facebook"
        type="facebook"
        onPress={loginfacebook}
        style={{ width: "70%", height: 45, alignSelf: "center" }}
      />
      <Loading isVisible={isLoading} tex="INICIANDO SESIÓN" />
    </View>
  );
}
