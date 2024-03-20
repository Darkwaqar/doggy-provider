import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import product from "../../assets/dog.png";
import AppLoading from "expo-app-loading";
import { useFonts, oswald, Montserrat } from "@expo-google-fonts/inter";

const DogList = (props) => {
  let [fontsLoaded] = useFonts({
    oswald: require("../../assets/oswald/Oswald_Stencil/Oswald-Stencil.otf"),
    Montserrat: require("../../assets/Montserrat/Montserrat-Black.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View
        style={{ alignItems: "center", justifyContent: "center", margin: 5 }}
      >
        <Image style={styles.image} source={props.image} />
        <Text style={styles.heading}>{props.name}</Text>
        <View style={{ flexDirection: "row", marginHorizontal: 35 }}>
          <TouchableOpacity style={{ margin: 10 }} onPress={props.edit}>
            <Text style={{ color: "white", fontSize: 1 }}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ margin: 10 }}>
            <Text style={{ color: "white", fontSize: 1 }}>View</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

export default DogList;

const styles = StyleSheet.create({
  heading: {
    fontFamily: "oswald",
    fontSize: 25,
  },
  image: {
    height: 130,
    width: 150,
  },
});
