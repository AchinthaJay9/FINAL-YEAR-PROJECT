import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
  TextInput,
  ImageBackground,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const Onboarding3 = () => {

  const navigation = useNavigation();

  function onNext(){
    navigation.navigate('login');
  }

  return (
    // <SafeAreaView style={styles.safeArea}>
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Image
        source={require("../assets/onbo1.png")}
        style={styles.upimg}
      />
      <View style={styles.dvbox}>
        <Text style={styles.maintext}>Bridging Farmers to Modern Agriculture </Text>
        <Text style={styles.maintext3}>Empower yourself with the tools and knowledge for agricultural success</Text>
        <TouchableOpacity style={styles.textbtn} onPress={onNext}>
          <Text style={styles.textbtn2}>Next</Text>
          <Icon style={styles.iconleft} name="arrow-right" size={16} color="#0EAB73" />
        </TouchableOpacity>
      </View>
    </ScrollView>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  backgroundImage: {
    resizeMode: 'cover',
  },
  upimg: {
    width: "100%",
  },
  upbox: {
    height: "60%",
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dvbox: {
    height: "40%",
    resizeMode: 'cover',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textbtn: {
    // backgroundColor: "#FF7A2F",
    width: 150,
    height: 45,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: "row",
    marginTop:"5%",
  },
  textbtn2: {
    color: '#0EAB73',
    fontSize: 16,
    fontWeight: '600',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconleft: {
    marginLeft: 12,
    marginTop: 2,
  },
  dots: {
    flexDirection: "row",
    marginTop: "8%",
    marginBottom: 15, // Adjust the margin as a percentage of the screen height
  },
  dot: {
    width: 10,
    height: 5,
    borderRadius: 5,
    backgroundColor: "#6E6E6E",
    marginHorizontal: "1%", // Adjust the margin as a percentage of the screen width
  },
  dotActive: {
    width: 25,
    height: 5,
    borderRadius: 5,
    backgroundColor: "#FF7A2F",
    marginHorizontal: "1%", // Adjust the margin as a percentage of the screen width
  },
  maintext: {
    width: "80%",
    color: '#000',
    fontSize: 24,
    fontWeight: '700',
    textAlign: "center",
  },
  maintext2: {
    color: '#FF7A2F',
  },
  maintext3: {
    width: "80%",
    color: '#9B9EAD',
    fontSize: 16,
    fontWeight: '400',
    textAlign: "center",
    marginTop: 15,
    marginBottom: 20,
  },
});

export default Onboarding3;
