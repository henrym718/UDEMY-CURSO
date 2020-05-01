import React from "react";
import { Image, StyleSheet } from "react-native";

export default function Logo() {
  return (
    <Image
      source={require("../../assets/img/ico.png")}
      resizeMode="contain"
      style={styles.logo}
    />
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20,
  },
});
