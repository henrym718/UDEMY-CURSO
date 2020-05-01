import React from "react";
import { StyleSheet } from "react-native";
import { Overlay } from "react-native-elements";

export default function Modal(props) {
  const { isVisible, setIsVisible, Children } = props;

  const closeModal = () => setIsVisible(false);

  return (
    <Overlay
      isVisible={isVisible}
      overlayBackgroundColor="transparent"
      overlayStyle={styles.overlay}
      onBackdropPress={closeModal}
    >
      {Children}
    </Overlay>
  );
}

const styles = StyleSheet.create({
  overlay: {
    height: "auto",
    width: "95%",
    backgroundColor: "#fff",
  },
});
