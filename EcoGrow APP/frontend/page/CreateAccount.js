import React, { useState } from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon2 from "react-native-vector-icons/FontAwesome";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Feather } from '@expo/vector-icons';

const CreateAccount = () => {

  const navigation = useNavigation('');

  const [firstname, setFirstname] = useState('');
  const [firstnameVerify, setFirstNameVerify] = useState(false);
  const [lastname, setLastname] = useState('');
  const [lastnameVerify, setLastNameVerify] = useState(false);
  const [email, setEmail] = useState('');
  const [emailVerify, setEmailVerify] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function handleSubmit() {
    const userData = {
      firstname: firstname,
      lastname: lastname,
      email,
      password,
      confirmPassword,
    }

    // if(password != confirmPassword ){
    //   Alert.alert("Password and ConfirmPassword is not matched")
    // }

    if(firstnameVerify && lastnameVerify && emailVerify && passwordVerify){
      axios
        .post('http://192.168.43.87:5000/register', userData)
        .then(res => {
          if(res.data.status == 'ok'){
            console.log(res.data);
            Alert.alert("Registered Successfull");
            navigation.navigate('login');
          }else{
            Alert.alert(JSON.stringify(res.data));
          }
        })
        .catch(e => console.log(e));
    }else{
      Alert.alert('Fill mandatory details')
    }
  }

  function handleFirstName(e) {
    const nameVar = e.nativeEvent.text;
    setFirstname(nameVar);
    setFirstNameVerify(false);

    if (nameVar.length > 1) {
      setFirstNameVerify(true);
    }
  }

  function handleLastName(e) {
    const nameVar = e.nativeEvent.text;
    setLastname(nameVar);
    setLastNameVerify(false);

    if (nameVar.length > 1) {
      setLastNameVerify(true);
    }
  }

  function handleEmail(e) {
    const emailVar = e.nativeEvent.text;
    setEmail(emailVar);
    setEmailVerify(false);
    if (/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(emailVar)) {
      setEmail(emailVar);
      setEmailVerify(true);
    }
  }

  function handlePassword(e) {
    const passwordVar = e.nativeEvent.text;
    setPassword(passwordVar);
    setPasswordVerify(false);
    if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(passwordVar)) {
      setPassword(passwordVar);
      setPasswordVerify(true);
    }
  }

  function onSignin(){
    navigation.navigate('login');
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
            <Text style={styles.signUpText}>Create Account</Text>
            <Text style={styles.signUpText2}>Start Your Farming Journey: Create Your Account and Join a Thriving Community.</Text>
          </View>
          <View style={styles.rowsafe}>

          <View style={styles.rowinput}>
              <View style={styles.boxicon}>
                <Icon2 name="user" size={20} color="#FFF" />
              </View>
              <View style={styles.boxinput}>
                <TextInput
                  style={styles.input}
                  placeholder="First Name"
                  placeholderTextColor="#FFF"
                  onChange={e => handleFirstName(e)}
                />
              </View>
            </View>
            {firstname.length < 1 ? null : firstnameVerify ? null : (
            <Text
              style={{
                marginLeft: 20,
                color: 'red',
              }}>
              Firstname sholud be more then 1 characters.
            </Text>
            )}
            <View style={styles.rowinput}>
              <View style={styles.boxicon}>
                <Icon2 name="user" size={20} color="#FFF" />
              </View>
              <View style={styles.boxinput}>
                <TextInput
                  style={styles.input}
                  placeholder="Last Name"
                  placeholderTextColor="#FFF"
                  onChange={e => handleLastName(e)}
                />
              </View>
              {lastname.length < 1 ? null : lastnameVerify ? null : (
            <Text
              style={{
                top: 40,
                marginLeft: -330,
                color: 'red'
              }}>
              Lastname sholud be more then 1 characters.
            </Text>
            )}
            </View>
            <View style={styles.rowinput}>
              <View style={styles.boxicon}>
                <Icon name="email" size={20} color="#FFF" />
              </View>
              <View style={styles.boxinput}>
                <TextInput
                  style={styles.input}
                  placeholder="Email Address"
                  placeholderTextColor="#FFF"
                  onChange={e => handleEmail(e)}
                />
              </View>
            </View>
              {email.length < 1 ? null : emailVerify ? null : (
              <Text
                style={{
                  marginLeft: 20,
                  color: 'red',
                }}>
                Enter Proper Email Address
              </Text>
            )}
            <View style={styles.rowinput}>
              <View style={styles.boxicon}>
                <Icon name="lock" size={20} color="#FFF" />
              </View>
              <View style={styles.boxinput2}>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#FFF"
                  secureTextEntry={!showPassword}  
                  onChange={e => handlePassword(e)}
                />
              </View>
              {password.length < 1 ? null : passwordVerify ? null : (
                <Text
                  style={{
                    marginLeft: -290,
                    color: 'red',
                    top: 38
                  }}>
                    Uppercase, Lowercase, Number and 6 or more.
                </Text>
               )}
              <View style={styles.boxicon2}>
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  {password.length < 1 ? null : !showPassword ? (
                    <Feather
                      name="eye-off"
                      size={20} 
                      color="#FFF"
                      style={{
                        right: 25,
                        position: "absolute",
                        top:-10
                      }}
                    />
                  ) : (
                    <Feather
                      name="eye"
                      color="#FFF"
                      size={20}
                      style={{
                        right: 25,
                        position: "absolute",
                        top:-10
                      }}
                    />
                  )}
                </TouchableOpacity>
              </View>
    
            </View>
            <View style={styles.rowinput}>
              <View style={styles.boxicon}>
                <Icon name="lock" size={20} color="#FFF" />
              </View>
              <View style={styles.boxinput2}>
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  placeholderTextColor="#FFF"
                  secureTextEntry={!showConfirmPassword}  
                  onChange={e => setConfirmPassword(e.nativeEvent.text)}
                />
              </View>
              {password != confirmPassword &&  (
                <Text
                  style={{
                    marginLeft: -290,
                    color: 'red',
                    top: 40
                  }}>
                 Password and ConfirmPassword are not matched
                </Text>
              )}
              <View style={styles.boxicon2}>
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                {confirmPassword.length < 1 ? null : !showConfirmPassword ? (
                    <Feather
                      name="eye-off"
                      size={20} 
                      color="#FFF"
                      style={{
                        right: 25,
                        top:-10,
                        position:"absolute"
                      }}
                    />
                    ) : (
                    <Feather
                      name="eye"
                      color="#FFF"
                      size={20}
                      style={{
                        right: 25,
                        top:-10,
                        position:"absolute"
                      }}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>

          </View>
         
        </LinearGradient>

        <View style={styles.whiteBackground}>

          <View style={styles.whiteBackground2}>
            <TouchableOpacity style={styles.signUpButton} onPress={() => handleSubmit()}>
              <Text style={styles.signUpButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.txlogbox}>
            <Image
              source={require("../assets/google.png")}
              style={styles.facebookImage}
            />
            <Text style={styles.txlog}>Sign-up with google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.labelInputContainer3} >
            <Text style={styles.checboxtx01log}>
            I have an account 
            </Text>
            <Text style={styles.checboxtx01log2} onPress={onSignin}>
            Sign in
            </Text>
          </TouchableOpacity>
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
    paddingBottom:15,
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
    paddingTop: 10,
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
    borderRadius:16,
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

export default CreateAccount;