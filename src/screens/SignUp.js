import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import Background from "../../assets/background.png";
import Gradiant from "../../assets/gradiant.png";
import { Picker } from "@react-native-picker/picker";
import AppLoading from "expo-app-loading";
import { useFonts, oswald, Montserrat } from "@expo-google-fonts/inter";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = ({ navigation }) => {
  const [Status, setStatus] = useState();

  const [FirstName, setFirstName] = useState();
  const [LastName, setLastName] = useState();
  const [Email, setEmail] = useState();
  const [Password, setPassword] = useState();

  const [Phone, setPhone] = useState();
  const [ItemRole, setItemRole] = useState(2);
  const [Address, setAddress] = useState();
  const [mobile_number, setmobile_number] = useState();
  const [country, setcountry] = useState();
  const [emergency_number, setemergency_number] = useState();

  const [error, seterror] = useState("");
  //console.log(mobile_number)

  let PlatformID = 0;
  if (Platform.OS === "android") {
    PlatformID = 1;
  } else {
    PlatformID = 2;
  }

  const _SignUp = () => {
    // POST request using axios inside useEffect React hook

    axios
      .post("https://doggywawky.com/api/auth/registration", {
        first_name: FirstName,
        last_name: LastName,
        email: Email,
        password: Password,
        mobile_number: mobile_number,
        address: Address,
        role_id: ItemRole,
        platform_id: PlatformID,
        mobile_number_country: "US",
        emergency_number: emergency_number,
      })
      .then((response) => {
        console.log(response.status), seterror("");
        navigation.navigate("SignIn");
        Alert.alert("A verification email has been send to you");
      })
      .catch((error) => {
        error.response.data.data.errors.first_name &&
          Alert.alert(error.response.data.data.errors.first_name);
        error.response.data.data.errors.email &&
          seterror(JSON.stringify(error.response.data.data.errors.email));
        error.response.data.data.errors.last_name &&
          Alert.alert(error.response.data.data.errors.last_name);
        error.response.data.data.errors.password &&
          Alert.alert(error.response.data.data.errors.password);
        // error.response.data.data.errors.email&&Alert.alert("Email invalid")
        //  seterror(JSON.stringify(error.response.data.data.errors))

        // Alert.alert(error.response.data.message)
      });

    // empty dependency array means this effect will only run once
  };

  // start return
  let [fontsLoaded] = useFonts({
    oswald: require("../../assets/oswald/Oswald_Stencil/Oswald-Stencil.otf"),
    MontserratBold: require("../../assets/Montserrat/Montserrat-Bold.ttf"),
    Montserrat: require("../../assets/Montserrat/Montserrat-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <ImageBackground
        style={styles.container}
        source={Background}
        blurRadius={3}
      >
        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SafeAreaView style={{ alignItems: "center" }}>
            <Text style={styles.heading}>Sign Up with Doggywawky</Text>
            <View style={{ marginTop: 50, alignItems: "center" }}>
              <View>
                <Text style={styles.inputHeader}>First Name</Text>
                <TextInput
                  placeholder="First Name"
                  style={styles.textinput}
                  value={FirstName}
                  onChangeText={setFirstName}
                ></TextInput>
              </View>

              <View>
                <Text style={styles.inputHeader}>Last Name</Text>
                <TextInput
                  placeholder="Last Name"
                  style={styles.textinput}
                  value={LastName}
                  onChangeText={setLastName}
                ></TextInput>
              </View>

              <View>
                <Text style={styles.inputHeader}>Email</Text>
                <TextInput
                  placeholder="Your Email"
                  style={styles.textinput}
                  value={Email}
                  onChangeText={setEmail}
                  keyboardType={"email-address"}
                ></TextInput>
              </View>

              <View>
                <Text style={styles.inputHeader}>Password</Text>
                <TextInput
                  placeholder="Enter password"
                  style={styles.textinput}
                  value={Password}
                  onChangeText={setPassword}
                ></TextInput>
              </View>

              <View>
                <Text style={styles.inputHeader}>Phone Number</Text>
                <TextInput
                  placeholder="202-000-0000"
                  style={styles.textinput}
                  keyboardType={"phone-pad"}
                  value={mobile_number}
                  onChangeText={setmobile_number}
                ></TextInput>
              </View>

              <View>
                <Text style={styles.inputHeader}>Emergency Number</Text>
                <TextInput
                  placeholder="202-000-0000"
                  style={styles.textinput}
                  keyboardType={"phone-pad"}
                  value={emergency_number}
                  onChangeText={setemergency_number}
                ></TextInput>
                {/* <TextInput placeholder='Country' style={styles.textinput} keyboardType={'default'} value={country} onChangeText={setcountry}></TextInput> */}
              </View>

              <View>
                <Text style={styles.inputHeader}>
                  What role are you Signing up for?
                </Text>
                <View>
                  <Picker
                    style={styles.picker}
                    selectedValue={ItemRole}
                    onValueChange={(itemValue, itemIndex) =>
                      setItemRole(itemValue)
                    }
                  >
                    <Picker.Item label="Sitter" value="2" />
                    <Picker.Item label="Provider" value="3" />
                  </Picker>
                </View>
              </View>

              <View>
                <Text style={styles.inputHeader}>Address</Text>
                <TextInput
                  placeholder="Address"
                  style={styles.textinput}
                  keyboardType={"default"}
                ></TextInput>
              </View>

              <Text style={{ width: 290, color: "red" }}>{error}</Text>
              <TouchableOpacity
                // onPress={_SignUp}
                style={{
                  backgroundColor: "#c91661",
                  marginVertical: 20,
                  height: 45,
                  width: 270,
                  borderRadius: 30,
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 200,
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </ScrollView>
      </ImageBackground>
    );
  }
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    //borderWidth:1,
    // borderColor:'orange'
  },
  heading: {
    marginTop: 100,
    fontSize: 40,
    color: "gray",
    fontFamily: "Montserrat",
  },
  textinput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 30,
    height: 60,
    width: 300,
    textAlign: "center",
    justifyContent: "center",
    marginVertical: 5,
    backgroundColor: "white",
  },
  picker: {
    width: 270,
    height: 50,
    borderWidth: 1,
    marginVertical: 5,
    borderColor: "#ccc",
  },
  inputHeader: {
    marginTop: 20,
    fontFamily: "Montserrat",
    fontSize: 17,
  },
});
