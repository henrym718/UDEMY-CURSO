import React, { useRef, useState } from "react";
import { View } from "react-native";
import AddRestaurantFrom from "../../Components/Restaurants/AddRestaurantForm";
import Toast from "react-native-easy-toast";
import Loading from "../../Components/Loading";

export default function AddRestaurant(props) {
  const { navigation } = props;
  const toastRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View>
      <AddRestaurantFrom
        navigation={navigation}
        toastRef={toastRef}
        setIsLoading={setIsLoading}
      />
      <Toast ref={toastRef} position="center" opacity={0.5} />
      <Loading isVisible={isLoading} tex="CREANDO RESTAURANTE" />
    </View>
  );
}
