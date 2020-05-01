import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import firebase from "firebase";
import Loading from "../../Components/Loading";
import { withNavigation } from "react-navigation";

import {
  validateEmail,
  validationPassword,
  validationRepitPassword,
} from "../../Utils/Validation";

function FromRegister(props) {
  const [hidepassword, sethidepassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repitPassword, setRepitpassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const { toastRef, navigation } = props;

  const register = async () => {
    setIsVisible(true);
    if (!email || !password || !repitPassword) {
      toastRef.current.show("Todos los campos son obligatorios");
    } else {
      if (!validateEmail(email)) {
        toastRef.current.show("Correo Electrónico inválido");
      } else {
        if (!validationPassword(password)) {
          toastRef.current.show(
            "La contraseña debe contener mínimo 8 caracteres entre nñumeros y letras"
          );
        } else {
          if (!validationRepitPassword(repitPassword)) {
            toastRef.current.show(
              "La contraseña debe contener mínimo 8 caracteres entre nñumeros y letras"
            );
          } else {
            if (password != repitPassword) {
              toastRef.current.show("Las contraseñas no coinciden");
            } else {
              await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                  navigation.navigate("MyAccount");
                })
                .catch(() => {
                  toastRef.current.show("Error al crear usuario");
                });
            }
          }
        }
      }
    }
    setIsVisible(false);
  };

  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Correo Eletrónico"
        containerStyle={styles.inputForm}
        onChange={(e) => setEmail(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            iconStyle={styles.iconRigth}
          />
        }
      />
      <Input
        placeholder="Contraseña"
        password={true}
        secureTextEntry={hidepassword}
        containerStyle={styles.inputForm}
        onChange={(e) => setPassword(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name={hidepassword ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.iconRigth}
            onPress={() => sethidepassword(!hidepassword)}
          />
        }
      />
      <Input
        placeholder="Repetir Contraseña"
        password={true}
        secureTextEntry={hidepassword}
        containerStyle={styles.inputForm}
        onChange={(e) => setRepitpassword(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name={hidepassword ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.iconRigth}
            onPress={() => sethidepassword(!hidepassword)}
          />
        }
      />
      <Button
        title="Unirse"
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.buttonstl}
        onPress={register}
      />

      <Loading isVisible={isVisible} tex="CREANDO CUENTA" />
    </View>
  );
}

export default withNavigation(FromRegister);

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
  },
  iconRigth: {
    color: "#c1c1c1",
  },
  buttonContainer: {
    marginTop: 30,
    height: 60,
    width: "70%",
  },
  buttonstl: {
    backgroundColor: "#00a680",
  },
});
