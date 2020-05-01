import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, Dimensions, Alert } from "react-native";
import {
  Icon,
  Avatar,
  Image,
  Button,
  Input,
  Overlay,
} from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import MapView from "react-native-maps";

const widthMovil = Dimensions.get("window").width;

export default function AddRestaurantForm(props) {
  const { navigation, toastRef, setIsLoading } = props;
  const [imageSelect, setImageSelect] = useState([]);
  const [nameRestaurants, setNameRestaurants] = useState();
  const [addressRestaurant, setAddressRestaurant] = useState();
  const [descriptionsRestaurants, setDescriptionsRestaurants] = useState();
  const [isVisibleMap, setIsVisibleMap] = useState(true);
  const [locationRestaurant, SetLocationRestaurant] = useState(null);

  return (
    <ScrollView>
      <ImagePortada imageSelect={imageSelect[0]} />
      <DescriptionRestaurants
        setNameRestaurants={setNameRestaurants}
        setAddressRestaurant={setAddressRestaurant}
        setDescriptionsRestaurants={setDescriptionsRestaurants}
        setIsVisibleMap={setIsVisibleMap}
        locationRestaurant={locationRestaurant}
      />
      <ImagesNewRestaurants
        imageSelect={imageSelect}
        setImageSelect={setImageSelect}
        toastRef={toastRef}
      />
      <Map
        isVisibleMap={isVisibleMap}
        setIsVisibleMap={setIsVisibleMap}
        toastRef={toastRef}
        SetLocationRestaurant={SetLocationRestaurant}
      />
    </ScrollView>
  );
}

function ImagePortada(props) {
  const { imageSelect } = props;
  return (
    <View style={styles.viewPortada}>
      {imageSelect ? (
        <Image
          source={{ uri: imageSelect }}
          style={{ width: widthMovil, height: 300 }}
        />
      ) : (
        <Image
          source={require("../../../assets/img/portada.png")}
          style={{ width: widthMovil, height: 300 }}
          resizeMode="contain"
        />
      )}
    </View>
  );
}

function ImagesNewRestaurants(props) {
  const { imageSelect, setImageSelect, toastRef } = props;

  // Agregamos las imagenes al avatar, antes pedimos permiso, y abrimos galeria
  const addImageAvatar = async () => {
    const permissionsGalery = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    const resulPermissionsGalery =
      permissionsGalery.permissions.cameraRoll.status;

    if (resulPermissionsGalery === "denied") {
      toastRef.current.show("Debe aceptar los permisos", 1500);
    } else {
      const galeryOpen = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (galeryOpen.cancelled === true) {
        toastRef.current.show("Ha cancelado la seleccion de imagen", 1500);
      } else {
        setImageSelect([...imageSelect, galeryOpen.uri]);
      }
    }
  };

  // Eliminamos imagenes del avatar con un Alert. alert, y actualizamos el setimageSelect
  //con las imagenes diferentes a la seleccionada al eliminar por ende solo se muestran las que deseamos
  const removeImageAvatar = (image) => {
    Alert.alert(
      "Eliminar Imagen",
      "¿Estas seguro que deseas eliminar la imagen?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },

        {
          text: "Eliminar",
          onPress: () =>
            setImageSelect(
              imageSelect.filter((imageSelect) => imageSelect !== image)
            ),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.viewImage}>
      {imageSelect.length < 5 && (
        <Icon
          type="material-comunity"
          name="camera"
          color="#7a7a7a"
          size={40}
          containerStyle={styles.iconcontainer}
          onPress={addImageAvatar}
        />
      )}
      {imageSelect.map((imageRestaurant, index) => (
        <Avatar
          index={index}
          style={styles.miniaturaStyle}
          source={{ uri: imageRestaurant }}
          onPress={() => removeImageAvatar(imageRestaurant)}
        />
      ))}
    </View>
  );
}

function DescriptionRestaurants(props) {
  const {
    setNameRestaurants,
    setAddressRestaurant,
    setDescriptionsRestaurants,
    setIsVisibleMap,
    locationRestaurant,
  } = props;

  return (
    <View style={styles.viewDescripcion}>
      <Input
        placeholder="Nombre del Restaurant"
        onChange={(e) => setNameRestaurants(e.nativeEvent.text)}
        containerStyle={styles.inputDescriptions}
      />
      <Input
        placeholder="Direccion"
        onChange={(e) => setAddressRestaurant(e.nativeEvent.text)}
        containerStyle={styles.inputDescriptions}
        rightIcon={
          <Icon
            type="material-community"
            name="google-maps"
            color={locationRestaurant ? "#00a680" : "#c2c2c2"}
            iconStyle={styles.icon}
            onPress={() => setIsVisibleMap(true)}
          />
        }
      />
      <Input
        placeholder="Descripcion"
        onChange={(e) => setDescriptionsRestaurants(e.nativeEvent.text)}
        multiline={true}
        containerStyle={styles.inputDescriptions}
        inputContainerStyle={styles.descriptions}
      />
    </View>
  );
}

function Map(props) {
  const {
    isVisibleMap,
    setIsVisibleMap,
    SetLocationRestaurant,
    toasRef,
  } = props;
  const [location, setLocation] = useState(null);

  const closeModal = () => setIsVisibleMap(false);
  return (
    <Overlay
      isVisible={isVisibleMap}
      onBackdropPress={closeModal}
      overlayBackgroundColor="transparent"
      overlayStyle={styles.overlay}
    >
      <View>
        {location && (
          <MapView
            style={styles.mapStyle}
            initialRegion={location} //Locacion actual, recuperamos la locacion actual en LOCATION
            showsUserLocation={true} //para habilitar que se muestre en el mapa la locacion (falta el MapView.Marker)
            onRegionChange={(region) => setLocation(region)} //Cuando se mueve en el mapa captura las nuevas coordenadas
          >
            <MapView.Marker
              coordenate={{
                Latitude: location.latitude,
                Longitude: location.longitude,
              }}
              Draggable
            />
          </MapView>
        )}
        <View style={styles.viewMapBtn}>
          <Button
            title="GUARDAR"
            onPress={() => console.log("Guardar ubicacion")}
            containerStyle={styles.btnSaveContainer}
            buttonStyle={styles.btnSaveStyle}
          />
          <Button
            title="CANCELAR"
            onPress={() => console.log("CANCELAR")}
            containerStyle={styles.btnSaveContainer}
            buttonStyle={styles.btnCancelStyle}
          />
        </View>
      </View>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  btnSaveStyle: {
    backgroundColor: "#00a680",
    width: 130,
  },
  btnCancelStyle: {
    backgroundColor: "#a60d0d",
    width: 130,
  },

  btnSaveContainer: {
    paddingRight: 5,
  },
  viewMapBtn: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  mapStyle: {
    width: "100%",
    height: 550,
  },
  viewPortada: {
    alignItems: "center",
    marginBottom: 5,
  },
  viewImage: {
    flexDirection: "row",
    marginTop: 20,
  },
  iconcontainer: {
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e3e3e3",
  },
  miniaturaStyle: {
    width: 70,
    height: 70,
    marginLeft: 5,
  },
  viewDescripcion: {
    marginLeft: 10,
    marginRight: 10,
  },
  inputDescriptions: {
    marginBottom: 10,
  },
  descriptions: {
    height: 100,
    width: "100%",
    margin: 0,
    padding: 0,
  },
  overlay: {
    height: "auto",
    width: "95%",
    backgroundColor: "#fff",
  },
});
