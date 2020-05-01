import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { validateEmail, validationPassword } from "../../Utils/Validation";
import { reauthenticate } from "../../Utils/Api";
import * as firebase from "firebase";

export default function ChangeEmailForm(props) {
  const { email, setIsVisibleModal, setReloadData } = props;

  const [newEmail, setNewEmail] = useState();
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [hidePassword, setHidePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const updateEmail = () => {
    setError({});
    if (!validateEmail(newEmail)) {
      setError({ email: "Email no válido" });
    } else {
      if (email == newEmail) {
        setError({ email: "El email no puede ser igual al actual" });
      } else {
        if (!validationPassword(password)) {
          setError({
            password:
              "La contraseña debe contener mínimo 8 caracteres entre numeros y letras",
          });
        } else {
          setIsLoading(true);
          reauthenticate(password)
            .then(() => {
              firebase
                .auth()
                .currentUser.updateEmail(newEmail)
                .then(() => {
                  setIsLoading(false);
                  setReloadData(true);
                  setIsVisibleModal(false);
                })
                .catch(() => {
                  setError({ email: "Error al actualizar el email" });
                  setIsLoading(false);
                });
            })
            .catch(() => {
              setError({ password: "La Contraseña es incorrecta" });
              setIsLoading(false);
            });
        }
      }
    }
  };

  return (
    <View style={styles.view}>
      <Input
        placeholder="Correo Electronico"
        errorMessage={error.email}
        containerStyle={styles.inputContainer}
        onChange={(e) => setNewEmail(e.nativeEvent.text)}
        defaultValue={email && email}
        rightIcon={<Icon type="material-community" name="at" color="#c2c2c2" />}
      />
      <Input
        placeholder="Escriba la contraseña actual"
        errorMessage={error.password}
        password={true}
        secureTextEntry={hidePassword}
        containerStyle={styles.inputContainer}
        onChange={(e) => setPassword(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
            color="#c2c2c2"
            onPress={() => setHidePassword(!hidePassword)}
          />
        }
      />
      <Button
        title="Cambiar email"
        onPress={updateEmail}
        buttonStyle={styles.btn}
        containerStyle={styles.btnContainer}
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
  inputContainer: {
    marginBottom: 10,
  },
  btn: {
    backgroundColor: "#00a680",
  },
  btnContainer: {
    marginTop: 20,
    width: "100%",
  },
});
