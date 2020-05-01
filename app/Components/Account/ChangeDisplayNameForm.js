import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import firebase from "firebase";

export default function ChaneDisplayNameForm(props) {
  const { displayName, setIsVisibleModal, setReloadData, toastRef } = props;
  const [newDisplayName, setNewDisplayName] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateDysplayName = () => {
    setError(null);
    if (!newDisplayName) {
      setError("EL nombre debe ser diferente al actual");
    } else {
      setIsLoading(true);
      const updatename = {
        displayName: newDisplayName,
      };

      firebase
        .auth()
        .currentUser.updateProfile(updatename)
        .then(() => {
          setIsLoading(false);
          setReloadData(true);
          setIsVisibleModal(false);
          toastRef.current.show("Nombre actualizado correctamente");
        })
        .catch(() => {
          toastRef.current.show("Error al actualizar el nombre");
          setIsLoading(false);
        });
    }
  };

  return (
    <View style={styles.view}>
      <Input
        placeholder="Nombre"
        containerStyle={styles.inputcontainer}
        onChange={(e) => setNewDisplayName(e.nativeEvent.text)}
        defaultValue={displayName && displayName}
        rightIcon={
          <Icon
            type="material-community"
            name="account-circle-outline"
            color="#c2c2c2"
          />
        }
        errorMessage={error}
      />
      <Button
        title="Cambiar Nombre"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={updateDysplayName}
        loading={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    paddingBottom: 10,
    paddingTop: 10,
    alignItems: "center",
  },
  inputcontainer: {
    marginBottom: 10,
  },
  btnContainer: {
    marginTop: 20,
    width: "100%",
  },
  btn: {
    backgroundColor: "#00a680",
  },
});
