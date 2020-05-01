import React from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { Button } from "react-native-elements";
import { withNavigation } from "react-navigation";

function UserGuest(props) {
  const { navigation } = props;
  return (
    <ScrollView style={styles.viewbody} centerContent={true}>
      <Image
        source={require("../../../assets/img/original.jpg")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Consulta tu perfil de 5-Tenedores</Text>
      <Text style={styles.description}>
        Cómo describirias tu mejor restaurante, busca y visualiza los mejores
        restaurantes de una forma sencilla, vota cual te ha gustado más y
        comenta sobre tu experiencia.
      </Text>
      <View style={styles.btn}>
        <Button
          buttonStyle={styles.buttonStyle}
          containerStyle={styles.buttonContainer}
          title="Ver tu perfil"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </ScrollView>
  );
}
export default withNavigation(UserGuest);

const styles = StyleSheet.create({
  viewbody: {
    marginLeft: 30,
    marginRight: 30,
  },
  image: {
    height: 300,
    width: "100%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 15,
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    fontSize: 15,
    marginBottom: 20,
    marginLeft: 12,
    marginRight: 12,
  },
  btn: {
    flex: 1,
    alignItems: "center",
  },
  buttonStyle: {
    backgroundColor: "#00a680",
  },
  buttonContainer: {
    width: "70%",
  },
});
