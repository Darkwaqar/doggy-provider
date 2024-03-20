import React from "react";
import { Animated, View, StyleSheet, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Logo from "../../assets/whitelogo.png";

const HEADER_HEIGHT = 200;

const AnimatedHeader = ({ animatedValue }) => {
  const insets = useSafeAreaInsets();

  const headerHeight = animatedValue.interpolate({
    inputRange: [0, HEADER_HEIGHT + insets.top],
    outputRange: [HEADER_HEIGHT, insets.top + 10],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      style={{
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // right: 0,
        zIndex: 10,
        height: headerHeight,
      }}
    >
      <View style={styles.heading}>
        <Image style={styles.headerimage} source={Logo} />
      </View>
    </Animated.View>
  );
};

export default AnimatedHeader;

const styles = StyleSheet.create({
  heading: {
    width: "100%",
    height: HEADER_HEIGHT,
    backgroundColor: "#22224a",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  headerimage: {
    width: 225,
    height: 100,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#ccc",
    marginHorizontal: 5,
    marginVertical: 5,

    width: 100,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttontext: {
    color: "white",
    fontSize: 15,
  },
  textinput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 30,
    height: 50,
    width: 300,
    textAlign: "center",
    justifyContent: "center",
    marginVertical: 10,
    backgroundColor: "white",
  },
  true: {
    backgroundColor: "#FB611B",
    marginHorizontal: 5,
    marginVertical: 5,
    width: 100,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
