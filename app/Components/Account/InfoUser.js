import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase";
import { YellowBox } from "react-native";

export default function InfoUser(props) {
  YellowBox.ignoreWarnings(["Setting a timer"]);
  const {
    toastRef,
    userInfo: { uid, photoURL, displayName, email },
    setReloadData,
  } = props;

  const changeAvatar = async () => {
    //Pedimos los permisos para acceder a la camara o galeria
    const permissionsCamera = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    // Con los objetos de permissionsCamera, vemos el estatus si acepto o no dar permisos
    const resultPermissionsCamera =
      permissionsCamera.permissions.cameraRoll.status;

    // Si no acepta los permisos "denied"
    if (resultPermissionsCamera === "denied") {
      toastRef.current.show("Debe Aceptar los permisos");
    } else {
      // Al ecptar los permisos, abrimos la galeria
      const openlibrary = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [2, 2],
      });
      // con los props vemos que al seleccionar una imagen el cancelled es false si se seleciono o true si no.
      if (openlibrary.cancelled === true) {
        toastRef.current.show("Ha cancelado la seleccion de imagen");
      } else {
        console.log("Ha elegido correctamente su imagen");
        // la funcion funciona resmplazando a las variables dadas al momento de crear la funcion
        upLoadImage(openlibrary.uri, uid).then(() => {
          toastRef.current.show("Imagen subida Correctamente");
          updatePhotoUrl(uid);
        });
      }
    }
  };

  const upLoadImage = async (uri, nameImage) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const ref = firebase.storage().ref().child(`Avatar/${nameImage}`);
    return await ref.put(blob);
  };

  const updatePhotoUrl = (uid) => {
    firebase
      .storage()
      .ref(`Avatar/${uid}`)
      .getDownloadURL()
      .then(async (url) => {
        await firebase.auth().currentUser.updateProfile({ photoURL: url });
        setReloadData(true);
      })
      .catch(() => {
        toastRef.current.show("Error del servidor");
      });
  };

  return (
    <View style={styles.viewUserInfo}>
      <Avatar
        rounded
        size="large"
        showEditButton={true}
        onEditPress={changeAvatar}
        containerStyle={styles.userInfoAvatar}
        source={{
          uri: photoURL
            ? photoURL
            : "https://gravatar.com/avatar/6fac59061798be162cba90f470efff0c?s=400&d=mp&r=x",
        }}
      />
      <View>
        <Text style={{ fontWeight: "bold" }}>
          {" "}
          {displayName ? displayName : "Usuario Anonimo"}{" "}
        </Text>
        <Text> {email ? email : "Facebook"} </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    paddingTop: 30,
    paddingBottom: 30,
  },
  userInfoAvatar: {
    marginRight: 20,
  },
});
