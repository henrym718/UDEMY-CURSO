import React, { useRef } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { Divider } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-easy-toast";
import Logo from "../../Components/Logo";
import FormLogin from "../../Components/Account/FormLogin";
import FacebookLogin from "../../Components/Account/FacebookLogin";

export default function Login(props) {
  const toastFef = useRef();
  const { navigation } = props;
  return (
    <KeyboardAwareScrollView>
      <ScrollView>
        <View>
          <Logo />
          <View style={styles.viewcontainer}>
            <FormLogin toastFef={toastFef} />
            <CreateAccount navigation={navigation} />
          </View>
          <Divider style={styles.divider} />
          <View style={styles.viewcontainer}>
            <FacebookLogin toastFef={toastFef} navigation={navigation} />
          </View>
        </View>
        <Toast
          ref={toastFef}
          opacity={0.7}
          position="center"
          fadeInDuration={750}
          fadeOutDuration={1500}
        />
      </ScrollView>
    </KeyboardAwareScrollView>
  );
}

function CreateAccount(props) {
  const { navigation } = props;
  return (
    <Text style={styles.textRegister}>
      ¿Aun no tienes una cuenta? {""}
      <Text
        style={styles.btnRegister}
        onPress={() => navigation.navigate("Register")}
      >
        Regístrate
      </Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  viewcontainer: {
    marginLeft: 40,
    marginRight: 40,
  },
  textRegister: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
    alignSelf: "center",
  },
  btnRegister: {
    color: "#00a680",
    fontWeight: "bold",
  },
  divider: {
    backgroundColor: "#00a680",
    margin: 40,
  },
});
