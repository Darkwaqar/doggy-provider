import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import { useFonts, oswald, Montserrat } from "@expo-google-fonts/inter";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Background from "../../assets/background.png";
import { Picker } from "@react-native-picker/picker";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import DateTime from "../reusableComponents/DateTime";
import axios from "axios";
import { useSelector } from "react-redux";

const ServiceSettings = ({ route, navigation }) => {
  const [reliefWalk, setreliefWalk] = useState(false);
  const [regularWalk, setregularWalk] = useState(false);
  const [extendedWalk, setextendedWalk] = useState(false);
  const [smallDog, setsmallDog] = useState(false);
  const [mediumDog, setmediumDog] = useState(false);
  const [largeDog, setlargeDog] = useState(false);
  const [giantDog, setgiantDog] = useState(false);
  const [sameDay, setsameDay] = useState(false);
  const [oneDay, setoneDay] = useState(false);
  const [threeDay, setthreeDay] = useState(false);
  const [sevenDay, setsevenDay] = useState(false);
  const [bathAndDry, setbathAndDry] = useState(false);
  const [brushing, setbrushing] = useState(false);
  const [haircut, sethaircut] = useState(false);
  const [nailTrimming, setnailTrimming] = useState(false);
  const [teethBrushing, setteethBrushing] = useState(false);
  const [earCleaning, setearCleaning] = useState(false);
  const [commercialPet, setcommercialPet] = useState(false);
  const [residentialPet, setresidentialPet] = useState(false);
  const { service } = route.params;
  var acces_token = useSelector((state) => state.cart.acces_token);

  const ServiceInfoApi = () => {
    if (service === "Dog Walking") {
      const data = {
        dog_weight: ["small_dog", "medium_dog"],
        date: ["March 20 2022", "March 17 2022"],
        cancellation_policy: "same_day",
        walking_duration: "min_10",
      };

      axios
        .post("https://doggywawky.com/api/service/dog-walking/save", data, {
          headers: { Authorization: `Bearer ${acces_token}` },
        })
        .then(async (response) => {
          Alert.alert("Details details have been saved");
        })
        .catch((error) => {
          Alert.alert("Invalid dog-walking Info");
        });
    } else if (service === "Dog Sitting") {
      const data = {
        cancellation_policy: "same_day",
        walking_duration: "min_10",
      };

      axios
        .post("https://doggywawky.com/api/service/dog-sitting/save", data, {
          headers: { Authorization: `Bearer ${acces_token}` },
        })
        .then((response) => {
          Alert.alert("Details details have been saved");
        })
        .catch((error) => {
          Alert.alert("Invalid Info");
        });
    } else if (service === "Dog Grooming") {
      const data = {
        cancellation_policy: "same_day",
        walking_duration: "min_10",
      };

      axios
        .post("https://doggywawky.com/api/service/dog-grooming/save", data, {
          headers: { Authorization: `Bearer ${acces_token}` },
        })
        .then((response) => {
          Alert.alert("Details details have been saved");
        })
        .catch((error) => {
          Alert.alert("Invalid Info");
        });
    } else if (service === "Pooper Scooper") {
      const data = {
        cancellation_policy: "same_day",
        walking_duration: "min_10",
      };

      axios
        .post("https://doggywawky.com/api/service/pooper-scooper/save", data, {
          headers: { Authorization: `Bearer ${acces_token}` },
        })
        .then((response) => {
          Alert.alert("Details details have been saved");
        })
        .catch((error) => {
          Alert.alert("Invalid Info");
        });
    } else {
      const data = {
        dog_weight: ["small_dog", "medium_dog"],
        cancellation_policy: "same_day",
        walking_duration: "min_10",
      };

      axios
        .post("https://doggywawky.com/api/service/pooper-scooper/save", data, {
          headers: { Authorization: `Bearer ${acces_token}` },
        })
        .then((response) => {
          Alert.alert("Details details have been saved");
        })
        .catch((error) => {
          Alert.alert("Invalid Info");
        });
    }
  };

  const ServiceInfo = () => {
    if (service === "Dog Walking") {
      return (
        <View>
          <Text style={styles.heading}>Walk Duration</Text>
          <Text style={styles.h2}>Walk Duration?</Text>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={reliefWalk ? styles.buttonTrue : styles.buttonFalse}
              onPress={() => setreliefWalk(!reliefWalk)}
            >
              <Text
                style={
                  reliefWalk
                    ? { color: "white", fontSize: 16 }
                    : { color: "black", fontSize: 16 }
                }
              >
                Relief Walk-10min
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={regularWalk ? styles.buttonTrue : styles.buttonFalse}
              onPress={() => setregularWalk(!regularWalk)}
            >
              <Text
                style={
                  regularWalk
                    ? { color: "white", fontSize: 16 }
                    : { color: "black", fontSize: 16 }
                }
              >
                Regular Walk-30min
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={extendedWalk ? styles.buttonTrue : styles.buttonFalse}
              onPress={() => setextendedWalk(!extendedWalk)}
            >
              <Text
                style={
                  extendedWalk
                    ? { color: "white", fontSize: 16 }
                    : { color: "black", fontSize: 16 }
                }
              >
                Extended Walk-60min
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (service === "Dog Sitting") {
      return <View></View>;
    } else if (service === "Dog Grooming") {
      return (
        <View>
          <Text style={styles.heading}>Grooming Service</Text>
          <Text style={styles.h2}>Grooming Services?</Text>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={bathAndDry ? styles.buttonTrue : styles.buttonFalse}
              onPress={() => setbathAndDry(!bathAndDry)}
            >
              <Text
                style={
                  bathAndDry
                    ? { color: "white", fontSize: 16 }
                    : { color: "black", fontSize: 16 }
                }
              >
                Bath and dry
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={brushing ? styles.buttonTrue : styles.buttonFalse}
              onPress={() => setbrushing(!brushing)}
            >
              <Text
                style={
                  brushing
                    ? { color: "white", fontSize: 16 }
                    : { color: "black", fontSize: 16 }
                }
              >
                Brushing
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={haircut ? styles.buttonTrue : styles.buttonFalse}
              onPress={() => sethaircut(!haircut)}
            >
              <Text
                style={
                  haircut
                    ? { color: "white", fontSize: 16 }
                    : { color: "black", fontSize: 16 }
                }
              >
                Haircut
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={nailTrimming ? styles.buttonTrue : styles.buttonFalse}
              onPress={() => setnailTrimming(!nailTrimming)}
            >
              <Text
                style={
                  nailTrimming
                    ? { color: "white", fontSize: 16 }
                    : { color: "black", fontSize: 16 }
                }
              >
                Nail Trimming
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={teethBrushing ? styles.buttonTrue : styles.buttonFalse}
              onPress={() => setteethBrushing(!teethBrushing)}
            >
              <Text
                style={
                  teethBrushing
                    ? { color: "white", fontSize: 16 }
                    : { color: "black", fontSize: 16 }
                }
              >
                Teeth Brushing
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={earCleaning ? styles.buttonTrue : styles.buttonFalse}
              onPress={() => setearCleaning(!earCleaning)}
            >
              <Text
                style={
                  earCleaning
                    ? { color: "white", fontSize: 16 }
                    : { color: "black", fontSize: 16 }
                }
              >
                Ear Cleaning
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (service === "Pooper Scooper") {
      return (
        <View>
          <Text style={styles.heading}>Type Of Removal</Text>
          <Text style={styles.h2}>Type of removal?</Text>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={commercialPet ? styles.buttonTrue : styles.buttonFalse}
              onPress={() => setcommercialPet(!commercialPet)}
            >
              <Text
                style={
                  commercialPet
                    ? { color: "white", fontSize: 16 }
                    : { color: "black", fontSize: 16 }
                }
              >
                Commercial Pet Waste Removal
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={residentialPet ? styles.buttonTrue : styles.buttonFalse}
              onPress={() => setresidentialPet(!residentialPet)}
            >
              <Text
                style={
                  residentialPet
                    ? { color: "white", fontSize: 16 }
                    : { color: "black", fontSize: 16 }
                }
              >
                Residential Pet Waste Removal
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return <View></View>;
    }
  };

  const [activate, setactivate] = useState();

  let [fontsLoaded] = useFonts({
    oswald: require("../../assets/oswald/Oswald_Stencil/Oswald-Stencil.otf"),
    MontserratBold: require("../../assets/Montserrat/Montserrat-Bold.ttf"),
    Montserrat: require("../../assets/Montserrat/Montserrat-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <ImageBackground style={{ flex: 1 }} source={Background} blurRadius={4}>
        <SafeAreaView>
          <ScrollView>
            <View style={styles.banner}>
              <Text
                style={{ fontFamily: "oswald", fontSize: 40, color: "white" }}
              >
                {service}
              </Text>
            </View>
            <View style={{ marginBottom: 100 }}>
              <View style={{ alignItems: "center" }}>
                <Picker
                  style={styles.picker}
                  selectedValue={activate}
                  onValueChange={(itemValue, itemIndex) =>
                    setactivate(itemValue)
                  }
                >
                  <Picker.Item label="Active" value="Active" />
                  <Picker.Item label="Deactive" value="Deactive" />
                </Picker>
              </View>
              <View style={{ marginTop: 20, marginHorizontal: 5 }}>
                {ServiceInfo()}
              </View>
              <View style={{ marginTop: 20, marginLeft: 5 }}>
                <Text style={styles.heading}>Service charges</Text>

                <Text style={styles.h2}>
                  What you want clients to pay per visit:
                </Text>
                <TextInput style={styles.input} />

                <Text style={styles.h2}>Sitter Pick-Up and Drop-Off</Text>
                <TextInput style={styles.input} />
              </View>
              <View style={{ marginTop: 20, marginLeft: 5 }}>
                <Text style={styles.heading}>Availabilty:</Text>
                <View style={styles.calender}>
                  <Calendar
                    markedDates={{
                      "2022-03-16": {
                        selected: true,
                        marked: true,
                        selectedColor: "blue",
                      },
                      "2022-03-17": {
                        selected: true,
                        marked: true,
                        selectedColor: "blue",
                      },
                      "2022-03-18": {
                        selected: true,
                        marked: true,
                        selectedColor: "blue",
                      },
                      "2022-03-19": { disabled: true, disableTouchEvent: true },
                    }}
                  />
                </View>
                <DateTime />
              </View>

              <View style={{ marginTop: 20, marginHorizontal: 5 }}>
                <Text style={styles.heading}>Dog Preferences</Text>
                <Text style={styles.h2}>
                  What size pet can you host in your home?
                </Text>
                <View style={{ alignItems: "center" }}>
                  <TouchableOpacity
                    style={smallDog ? styles.buttonTrue : styles.buttonFalse}
                    onPress={() => setsmallDog(!smallDog)}
                  >
                    <Text
                      style={
                        smallDog
                          ? { color: "white", fontSize: 16 }
                          : { color: "black", fontSize: 16 }
                      }
                    >
                      Small dog (0-15 lbs)
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={mediumDog ? styles.buttonTrue : styles.buttonFalse}
                    onPress={() => setmediumDog(!mediumDog)}
                  >
                    <Text
                      style={
                        mediumDog
                          ? { color: "white", fontSize: 16 }
                          : { color: "black", fontSize: 16 }
                      }
                    >
                      Medium dog (16-40 lbs)
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={largeDog ? styles.buttonTrue : styles.buttonFalse}
                    onPress={() => setlargeDog(!largeDog)}
                  >
                    <Text
                      style={
                        largeDog
                          ? { color: "white", fontSize: 16 }
                          : { color: "black", fontSize: 16 }
                      }
                    >
                      Large dog (41-100 lbs)
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={giantDog ? styles.buttonTrue : styles.buttonFalse}
                    onPress={() => setgiantDog(!giantDog)}
                  >
                    <Text
                      style={
                        giantDog
                          ? { color: "white", fontSize: 16 }
                          : { color: "black", fontSize: 16 }
                      }
                    >
                      Giant dog (100+ lbs)
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{ marginTop: 20, marginHorizontal: 5 }}>
                <Text style={styles.heading}>Cancellation Policy</Text>
                <Text style={styles.h2}>What is your cancellation policy?</Text>
                <View style={{ alignItems: "center" }}>
                  <TouchableOpacity
                    style={sameDay ? styles.buttonTrue : styles.buttonFalse}
                    onPress={() => setsameDay(!sameDay)}
                  >
                    <Text
                      style={
                        sameDay
                          ? { color: "white", fontSize: 16 }
                          : { color: "black", fontSize: 16 }
                      }
                    >
                      Same Day
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={oneDay ? styles.buttonTrue : styles.buttonFalse}
                    onPress={() => setoneDay(!oneDay)}
                  >
                    <Text
                      style={
                        oneDay
                          ? { color: "white", fontSize: 16 }
                          : { color: "black", fontSize: 16 }
                      }
                    >
                      One Day
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={threeDay ? styles.buttonTrue : styles.buttonFalse}
                    onPress={() => setthreeDay(!threeDay)}
                  >
                    <Text
                      style={
                        threeDay
                          ? { color: "white", fontSize: 16 }
                          : { color: "black", fontSize: 16 }
                      }
                    >
                      Three Day
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={sevenDay ? styles.buttonTrue : styles.buttonFalse}
                    onPress={() => setsevenDay(!sevenDay)}
                  >
                    <Text
                      style={
                        sevenDay
                          ? { color: "white", fontSize: 16 }
                          : { color: "black", fontSize: 16 }
                      }
                    >
                      Seven Day
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ alignItems: "center", marginTop: 50 }}>
                <TouchableOpacity
                  // onPress={ServiceInfoApi}
                  style={{
                    backgroundColor: "#22224A",
                    height: 60,
                    width: "90%",
                    borderRadius: 30,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{ color: "white", fontSize: 26, fontWeight: "bold" }}
                  >
                    Save
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    );
  }
};

export default ServiceSettings;

const styles = StyleSheet.create({
  banner: {
    width: "100%",
    height: 100,
    backgroundColor: "#22224A",
    marginVertical: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  calender: {
    marginVertical: 10,
  },
  h2: { fontSize: 16, color: "gray", marginTop: 10 },
  heading: {
    fontFamily: "oswald",
    fontSize: 25,
    color: "black",
    marginLeft: 5,
  },
  picker: {
    marginVertical: 10,
    width: 200,
    height: 40,
    padding: 10,
    backgroundColor: "white",

    color: "black",
  },
  buttonTrue: {
    backgroundColor: "#22224A",
    width: "80%",
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  buttonFalse: {
    backgroundColor: "white",
    width: "80%",

    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  input: {
    width: "90%",
    height: 50,
    borderRadius: 25,
    marginVertical: 10,
    backgroundColor: "white",
    marginHorizontal: 10,
    paddingHorizontal: 20,
  },
});
