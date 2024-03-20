import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
  Alert,
  SafeAreaView,
} from "react-native";
import React, { useRef, useState } from "react";
import Background from "../../assets/background.png";
import AnimatedHeader from "../reusableComponents/AnimatedHeader";
import AppLoading from "expo-app-loading";
import { useFonts, oswald, Montserrat } from "@expo-google-fonts/inter";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
const AddDog = ({ navigation }) => {
  var [_image, setImage] = useState(null); //set image here
  var [_imagebase64, setImagebase64] = useState(null); //set image here
  const [Sex, setSex] = useState("M");
  const [DogFriendly, setDogFriendly] = useState("yes");
  const [ChildrenFriendly, setChildrenFriendly] = useState("yes");
  const [Sprayed, setSprayed] = useState("yes");
  const [HouseTrained, setHouseTrained] = useState("yes");
  const [MicroChipped, setMicroChipped] = useState("yes");
  const [Mediacted, setMediacted] = useState("yes");
  const [BirthMonth, setBirthMonth] = useState();
  const [BirthYear, setBirthYear] = useState();
  const [Breed, setBreed] = useState();
  const [Weight, setWeight] = useState();
  const [Description, setDescription] = useState();
  const [PetName, setPetName] = useState();

  const offset = useRef(new Animated.Value(0)).current;

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      // console.log(result.uri.base64)
      var base64 = await FileSystem.readAsStringAsync(result.uri, {
        encoding: "base64",
      });
      setImagebase64(base64);
    }
  };

  // console.log(_imagebase64)

  //       RNFetchBlob.fs.readFile(image, 'base64')
  // .then((data) => {
  //   // handle the data ..
  // })

  // console.log(_image)

  const data = {
    pet_name: PetName,
    description: Description,
    sex: Sex,
    weight: Weight,
    breed: Breed,
    age_year: BirthYear,
    age_month: BirthMonth,
    medication: Mediacted,
    micro_chipped: MicroChipped,
    house_trained: HouseTrained,
    spayed: Sprayed,
    children_friendly: ChildrenFriendly,
    dog_friendly: DogFriendly,
    file_dog_profile_image: _imagebase64,
  };
  var acces_token = useSelector((state) => state.cart.acces_token);

  const AddDogButton = () => {
    axios
      .post("https://doggywawky.com/api/dog/add", data, {
        headers: { Authorization: `Bearer ${acces_token}` },
      })
      .then((response) => {
        Alert.alert("Your Dog details have been saved");
        navigation.navigate("ProviderSetup");
      })
      .catch((error) => {
        // console.log(error)
        Alert.alert("Some fields have invalid information");
      });
  };

  let [fontsLoaded] = useFonts({
    oswald: require("../../assets/oswald/Oswald_Stencil/Oswald-Stencil.otf"),
    Montserrat: require("../../assets/Montserrat/Montserrat-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <ImageBackground
        style={{ flex: 1 }}
        source={Background}
        blurRadius={4}
        resizeMode={"cover"}
      >
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: offset } } }],
            { useNativeDriver: false }
          )}
        >
          <SafeAreaView>
            <AnimatedHeader animatedValue={offset} />

            <View
              style={{
                alignItems: "center",
                marginBottom: 100,
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.heading}>Add you're dog's details</Text>

              <View>
                <Text style={styles.inputHeader}>Pet Name</Text>
                <TextInput
                  placeholder="enter pet name"
                  style={styles.input}
                  value={PetName}
                  onChangeText={setPetName}
                />
              </View>

              <View>
                <Text style={styles.inputHeader}>Description</Text>
                <TextInput
                  placeholder="enter your dogs description"
                  style={styles.input}
                  value={Description}
                  onChangeText={setDescription}
                />
              </View>

              <View>
                <Text style={styles.inputHeader}>Sex</Text>
                <Picker
                  style={styles.picker}
                  selectedValue={Sex}
                  onValueChange={(itemValue, itemIndex) => setSex(itemValue)}
                >
                  <Picker.Item label="Male" value="M" />
                  <Picker.Item label="Female" value="F" />
                </Picker>
              </View>

              <View>
                <Text style={styles.inputHeader}>Weight</Text>
                <TextInput
                  placeholder="enter pet weight"
                  style={styles.input}
                  value={Weight}
                  onChangeText={setWeight}
                />
              </View>

              <View>
                <Text style={styles.inputHeader}>Breed</Text>
                <TextInput
                  placeholder="enter you pet`s breed"
                  style={styles.input}
                  value={Breed}
                  onChangeText={setBreed}
                />
              </View>

              <View>
                <Text style={styles.inputHeader}>Year of birth</Text>
                <TextInput
                  placeholder="enter you`re dogs birth year"
                  style={styles.input}
                  value={BirthYear}
                  onChangeText={setBirthYear}
                />
              </View>

              <View>
                <Text style={styles.inputHeader}>Month of birth</Text>
                <TextInput
                  placeholder="enter you`re dogs birth month"
                  style={styles.input}
                  value={BirthMonth}
                  onChangeText={setBirthMonth}
                />
              </View>

              <View>
                <Text style={styles.inputHeader}>Mediacted?</Text>
                <Picker
                  style={styles.picker}
                  selectedValue={Mediacted}
                  onValueChange={(itemValue, itemIndex) =>
                    setMediacted(itemValue)
                  }
                >
                  <Picker.Item label="Yes" value="yes" />
                  <Picker.Item label="No" value="no" />
                </Picker>
              </View>

              <View>
                <Text style={styles.inputHeader}>MicroChipped?</Text>
                <Picker
                  style={styles.picker}
                  selectedValue={MicroChipped}
                  onValueChange={(itemValue, itemIndex) =>
                    setMicroChipped(itemValue)
                  }
                >
                  <Picker.Item label="Yes" value="yes" />
                  <Picker.Item label="No" value="no" />
                </Picker>
              </View>

              <View>
                <Text style={styles.inputHeader}>House Trained?</Text>
                <Picker
                  style={styles.picker}
                  selectedValue={HouseTrained}
                  onValueChange={(itemValue, itemIndex) =>
                    setHouseTrained(itemValue)
                  }
                >
                  <Picker.Item label="Yes" value="yes" />
                  <Picker.Item label="No" value="no" />
                </Picker>
              </View>

              <View>
                <Text style={styles.inputHeader}>Sprayed?</Text>
                <Picker
                  style={styles.picker}
                  selectedValue={Sprayed}
                  onValueChange={(itemValue, itemIndex) =>
                    setSprayed(itemValue)
                  }
                >
                  <Picker.Item label="Yes" value="yes" />
                  <Picker.Item label="No" value="no" />
                </Picker>
              </View>

              <View>
                <Text style={styles.inputHeader}>Children Friendly?</Text>
                <Picker
                  style={styles.picker}
                  selectedValue={ChildrenFriendly}
                  onValueChange={(itemValue, itemIndex) =>
                    setChildrenFriendly(itemValue)
                  }
                >
                  <Picker.Item label="Yes" value="yes" />
                  <Picker.Item label="No" value="no" />
                </Picker>
              </View>

              <View>
                <Text style={styles.inputHeader}>Dog Friendly?</Text>
                <Picker
                  style={styles.picker}
                  selectedValue={DogFriendly}
                  onValueChange={(itemValue, itemIndex) =>
                    setDogFriendly(itemValue)
                  }
                >
                  <Picker.Item label="Yes" value="yes" />
                  <Picker.Item label="No" value="no" />
                </Picker>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={styles.inputHeader}>
                  Add you dogs profile picture
                </Text>
                {_image && (
                  <Image
                    source={{ uri: _image }}
                    style={{
                      width: 100,
                      height: 100,
                      marginLeft: 10,
                      borderWidth: 2,
                      marginVertical: 10,
                    }}
                  />
                )}
                <TouchableOpacity style={styles.button} onPress={pickImage}>
                  <Text style={styles.buttontext}>Add Picture</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={AddDogButton}
                style={{
                  backgroundColor: "#c0145d",
                  marginHorizontal: 5,
                  marginVertical: 20,
                  width: 240,
                  height: 60,
                  borderRadius: 30,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 25,
                    fontWeight: "bold",
                  }}
                >
                  Add Dog
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </ScrollView>
      </ImageBackground>
    );
  }
};

export default AddDog;

const styles = StyleSheet.create({
  heading: {
    fontSize: 22,
    color: "gray",
    marginVertical: 15,
    fontFamily: "Montserrat",
  },
  inputHeader: {
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 17,
  },
  input: {
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
    marginVertical: 15,
    borderColor: "gray",
  },
  button: {
    backgroundColor: "#22224A",
    marginHorizontal: 5,
    marginVertical: 20,
    width: 140,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttontext: {
    color: "white",
    fontSize: 16,
  },
});
