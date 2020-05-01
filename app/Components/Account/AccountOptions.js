import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ListItem } from "react-native-elements";
import Modal from "../Modal";
import ChangeDisplayNameForm from "./ChangeDisplayNameForm";
import ChangeEmailForm from "./ChangeEmailForm";
import ChangePasswordForm from "./ChangePasswordForm";

export default function AccountOptions(props) {
  const { userInfo, setReloadData, toastRef } = props;

  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);

  const selectedConponet = (key) => {
    switch (key) {
      case "displayName":
        setRenderComponent(
          <ChangeDisplayNameForm
            displayName={userInfo.displayName}
            setIsVisibleModal={setIsVisibleModal}
            setReloadData={setReloadData}
            toastRef={toastRef}
          />
        );
        setIsVisibleModal(true);
        break;
      case "email":
        setRenderComponent(
          <ChangeEmailForm
            email={userInfo.email}
            setIsVisibleModal={setIsVisibleModal}
            setReloadData={setReloadData}
            toastRef={toastRef}
          />
        );
        setIsVisibleModal(true);
        break;
      case "password":
        setRenderComponent(
          <ChangePasswordForm
            setIsVisibleModal={setIsVisibleModal}
            toastRef={toastRef}
          />
        );
        setIsVisibleModal(true);
        break;
      default:
        break;
    }
  };

  const optionsListItem = [
    {
      title: "Cambiar Nombre y Apellidos",
      iconType: "material-community",
      iconNameLeft: "account-circle",
      iconNameRight: "chevron-right",
      colorIcon: "#ccc",
      onPress: () => selectedConponet("displayName"),
    },
    {
      title: "Cambiar email",
      iconType: "material-community",
      iconNameLeft: "at",
      iconNameRight: "chevron-right",
      colorIcon: "#ccc",
      onPress: () => selectedConponet("email"),
    },
    {
      title: "Cambiar contraseña",
      iconType: "material-community",
      iconNameLeft: "lock-reset",
      iconNameRight: "chevron-right",
      colorIcon: "#ccc",
      onPress: () => selectedConponet("password"),
    },
  ];

  return (
    <View>
      {optionsListItem.map((options, index) => (
        <ListItem
          key={index}
          title={options.title}
          onPress={options.onPress}
          containerStyle={styles.menuItem}
          rightIcon={{
            type: options.iconType,
            name: options.iconNameRight,
            color: options.colorIcon,
          }}
          leftIcon={{
            type: options.iconType,
            name: options.iconNameLeft,
            color: options.colorIcon,
          }}
        />
      ))}

      {renderComponent && (
        <Modal
          isVisible={isVisibleModal}
          setIsVisible={setIsVisibleModal}
          Children={renderComponent}
        ></Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
  },
});
