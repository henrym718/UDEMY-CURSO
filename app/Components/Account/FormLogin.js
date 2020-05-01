import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import * as firebase from "firebase";
import { validateEmail, validationPassword } from "../../Utils/Validation";
import Loading from "../../Components/Loading";
import { withNavigation } from "react-navigation";

function FormLogin(props) {
  const { toastFef, navigation } = props;
  const [hidepassword, setHidepassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const login = async () => {
    setIsVisible(true);
    if (!email || !password) {
      toastFef.current.show("Todos los campos son obligatorios");
    } else {
      if (!validateEmail(email)) {
        toastFef.current.show("Correo Electrónico inválido");
      } else {
        if (!validationPassword(password)) {
          toastFef.current.show(
            "La contraseña debe contener mínimo 8 caracteres entre nñumeros y letras"
          );
        } else {
          await firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
              navigation.navigate("MyAccount");
            })
            .catch(() => {
              toastFef.current.show("Datos de ingreso incorrectos");
            });
        }
      }
    }
    setIsVisible(false);
  };

  return (
    <View style={styles.containerform}>
      <Input
        placeholder="Correo Electrónico"
        containerStyle={styles.inputform}
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
        containerStyle={styles.inputform}
        onChange={(e) => setPassword(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name={hidepassword ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.iconRigth}
            onPress={() => setHidepassword(!hidepassword)}
          />
        }
      />
      <Button
        title="Iniciar Sesión"
        buttonStyle={styles.btnform}
        containerStyle={styles.btncontainer}
        onPress={login}
      />
      <Loading isVisible={isVisible} tex="INICIANDO SESIÓN" />
    </View>
  );
}

export default withNavigation(FormLogin);

const styles = StyleSheet.create({
  containerform: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  inputform: {
    width: "100%",
    marginTop: 20,
  },
  iconRigth: {
    color: "#c1c1c1",
  },
  btnform: {
    backgroundColor: "#00a680",
  },
  btncontainer: {
    marginTop: 30,
    height: 60,
    width: "95%",
  },
});
