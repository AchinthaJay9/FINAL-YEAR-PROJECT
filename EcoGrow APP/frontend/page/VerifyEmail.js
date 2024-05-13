import React from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  ToastAndroid,
  Alert,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from '@react-navigation/native';

const VerifyEmail = () => {

  const navigation = useNavigation();

  function onChange(){
    navigation.navigate('ChangePassword');
  }
  return (

    <View style={styles.safeArea}>
      <View style={styles.safebox}></View>
      <ScrollView>
        <LinearGradient
          colors={['#0EAB73', '#19825C']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.TBgreen}
        >
          <View style={styles.rowcen}>
            <Text style={styles.signUpText}>Verify Your Email</Text>
            <Text style={styles.signUpText2}>onfirm Your Identity: Quick Email Verification for Added Security.</Text>
          </View>
          <View style={styles.rowsafe}>
            <View style={styles.rowinput}>
              <View style={styles.boxicon}>
                <Icon name="lastpass" size={20} color="#FFF" />
              </View>
              <View style={styles.boxinput}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Code"
                  placeholderTextColor="#FFF"
                />
              </View>
            </View>
          </View>
        
        </LinearGradient>

        <View style={styles.whiteBackground}>

          <View style={styles.whiteBackground2}>
            <TouchableOpacity style={styles.signUpButton} onPress={onChange}>
              <Text style={styles.signUpButtonText}>Verify</Text>
            </TouchableOpacity>
          </View>

        </View>

      </ScrollView>

    </View>

  );
};

const styles = StyleSheet.create({
  // safeArea: {
  //   flex: 1,
  //   // backgroundColor: "#0EAB73",
  //   paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  // },
  safebox: {
    width: "100%",
    height: 30,
    backgroundColor: "#0EAB73",
  },
  TBgreen: {
    width: "100%",
    borderBottomLeftRadius: 48,
    borderBottomRightRadius: 48,
    overflow: 'hidden',
    paddingBottom: 50,
  },
  rowsafe: {
    width: "100%",
    paddingHorizontal: 30,
    marginTop: 40,
    paddingBottom:"20%",
  },
  Rightrowsafe: {
    width: "100%",
    paddingHorizontal: 30,
    alignItems: "flex-end",
  },
  rowinput: {
    borderBottomWidth: 1,
    borderBottomColor: "#DFDFDF",
    width: "100%",
    flexDirection: "row",
    paddingBottom: 4,
    marginTop: 25,
    paddingHorizontal: 2,
  },
  boxicon: {
    width: "10%",
    justifyContent: "center",
  },
  boxinput: {
    width: "90%",
    justifyContent: "center",
  },
  boxinput2: {
    width: "80%",
    justifyContent: "center",
  },
  boxicon2: {
    width: "10%",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  whiteBackground: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 25,
    paddingRight: 25,
  },
  whiteBackground2: {
    backgroundColor: "#fff",
    alignItems: "center",
  },
  rowcen: {
    alignItems: "center",
  },
  signUpText: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 5,
    marginTop: 45,
  },
  signUpText2: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: "400",
    // marginBottom: 305,
    textAlign: "center",
    width: "70%",
  },
  labelInputContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  fogtx: {
    color: "#5E6164",
    fontWeight: "400",
    textAlign: "center",
    fontSize: 14,
    marginBottom: 10,
  },
  fogtx2: {
    color: "#6E6E6E",
    fontWeight: "400",
    textAlign: "center",
    fontSize: 15,
  },
  label: {
    color: "#000",
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    color: "#FFF",
  },
  signUpButton: {
    width: "100%",
    height: 60,
    backgroundColor: "#19825C",
    borderRadius: 16,
    paddingVertical: 17,
    paddingHorizontal: 28,
    marginTop: 20,
  },
  signUpButtonText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 16,
  },
  checboxtx01log: {
    color: "#9B9EAD",
    fontSize: 14,
    fontWeight: "400",
  },
  checboxtx01log2: {
    color: "#0EAB73",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
  },
  labelInputContainer3: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    flexDirection: "row",
  },
  orbox: {
    width: "100%",
    flexDirection: "row",
  },
  orbox1: {
    width: "40%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  orbox2: {
    width: "20%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    width: "100%",
    height: 2,
    backgroundColor: "#ECECEC",
  },
  facebookImage: {
    width: 16, // Set the width as needed
    height: 16, // Set the height as needed
    marginRight: 10, // Adjust margin as needed
  },
  txlog: {
    color: "#9B9EAD",
    fontSize: 14,
    fontWeight: "400",
  },
  txlogbox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 9,
    padding: 10,
    marginTop: 10,
    marginBottom: 2,
  },
  fogotbox: {
    width: "100%",
    alignItems: "flex-end",
  },
  fogottx: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "400",
    marginTop: 12,
  },
});

export default VerifyEmail;