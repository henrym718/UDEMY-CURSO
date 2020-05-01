import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import * as firebase from "firebase";
import { validationPassword } from "../../Utils/Validation";
import { reauthenticate } from "../../Utils/Api";

export default function ChangePasswordForm(props) {
  const { setIsVisibleModal, toastRef } = props;
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordRepit, setNewPasswordRepit] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [error, setError] = useState({});

  const ChangeNewPassword = () => {
    setError({});
    if (!password || !newPassword || !newPasswordRepit) {
      let objError = {};
      !password && (objError.password = "No puede estar vacio");
      !newPassword && (objError.NewPassword = "No puede estar vacio");
      !newPasswordRepit && (objError.NewPasswordRepit = "No puede estar vacio");
      setError(objError);
    } else {
      if (newPasswordRepit !== newPassword) {
        setError({ NewPasswordRepit: "La contraseña no coincide" });
      } else {
        if (!validationPassword(newPassword)) {
          setError({
            NewPassword:
              "La contraseña debe contener 8 caracteres o más entre numeros y letras",
          });
        } else {
          setIsLoading(true);
          reauthenticate(password)
            .then(() => {
              firebase
                .auth()
                .currentUser.updatePassword(newPassword)
                .then(() => {
                  setIsLoading(false);
                  setIsVisibleModal(false);
                  toastRef.current.show("Cambio de contraseña exitoso");
                })
                .catch(() => {
                  toastRef.current.show("Error al cambiar contraseña");
                });
            })
            .catch(() => {
              setError({ password: "Contraseña incorrecta" });
              setIsLoading(false);
            });
        }
      }
    }
  };

  return (
    <View>
      <Input
        placeholder="Contraseña actual"
        password={true}
        secureTextEntry={hidePassword}
        errorMessage={error.password}
        onChange={(e) => setPassword(e.nativeEvent.text)}
        containerStyle={styles.inputContainer}
        rightIcon={
          <Icon
            type="material-community"
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
            color="#c1c1c1"
            onPress={() => setHidePassword(!hidePassword)}
          />
        }
      />
      <Input
        placeholder="Nueva contraseña "
        password={true}
        secureTextEntry={hidePassword}
        errorMessage={error.NewPassword}
        onChange={(e) => setNewPassword(e.nativeEvent.text)}
        containerStyle={styles.inputContainer}
        rightIcon={
          <Icon
            type="material-community"
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
            color="#c1c1c1"
            onPress={() => setHidePassword(!hidePassword)}
          />
        }
      />
      <Input
        placeholder="Repita la nueva contraseña "
        password={true}
        secureTextEntry={hidePassword}
        errorMessage={error.NewPasswordRepit}
        onChange={(e) => setNewPasswordRepit(e.nativeEvent.text)}
        containerStyle={styles.inputContainer}
        rightIcon={
          <Icon
            type="material-community"
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
            color="#c1c1c1"
            onPress={() => setHidePassword(!hidePassword)}
          />
        }
      />
      <Button
        title="Cambiar contraseña"
        onPress={ChangeNewPassword}
        containerStyle={styles.btnContainer}
        loading={isLoading}
        buttonStyle={styles.btn}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    width: "100%",
    marginTop: 10,
  },
  inputContainer: {
    marginBottom: 10,
  },
  btn: {
    backgroundColor: "#00a680",
  },
});
