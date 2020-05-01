import React, { useRef } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { View, StyleSheet } from "react-native";
import Toast from "react-native-easy-toast";

import Logo from "../../Components/Logo";
import FormRegister from "../../Components/Account/FormRegister";

export default function Register() {
  const toastRef = useRef("");
  return (
    <KeyboardAwareScrollView>
      <Logo />
      <View style={styles.viewForm}>
        <FormRegister toastRef={toastRef} />
      </View>
      <Toast
        ref={toastRef}
        opacity={0.7}
        position="center"
        fadeInDuration={750}
        fadeOutDuration={1900}
      />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  viewForm: {
    marginLeft: 40,
    marginRight: 40,
  },
});
