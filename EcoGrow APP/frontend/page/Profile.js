import React, { useEffect, useState } from 'react';
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
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

import Icon from "react-native-vector-icons/FontAwesome";
import Icon3 from "react-native-vector-icons/MaterialCommunityIcons";
import Icon4 from "react-native-vector-icons/AntDesign";
import Icon5 from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const Profile = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');

  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  function onChat(){
    navigation.navigate('Chat');
  }

  function onHome(){
    navigation.navigate('Home');
  }

  function onChangePassword(){
    navigation.navigate('ChangePassword', {email});
  }

  function onLogout(){
    navigation.navigate('login');
  }
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('token')
      .then(token => {
        if (token) {
          setDecodedToken(JSON.parse(token));
          setEmail(JSON.parse(token).email);
        }
      })
      .catch(error => {
        console.error("AsyncStorage error:", error);
        Alert.alert("Error", "An error occurred while retrieving token.");
      });
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.safebox}></View>
      <ScrollView style={styles.content}>

        <LinearGradient
          colors={['#0EAB73', '#19825C']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.TBgreen}
        >
          <View style={styles.rowcen}>
            <Icon4 name="user" size={20} color="#FFFFFF" />
            <Text style={styles.signUpText}>Profile</Text>
          </View>
        </LinearGradient>

        <View style={styles.marbox}>
          <View style={styles.profimgbox}>
            <TouchableOpacity style={styles.profimgminibox}>
              <Image
                source={require("../assets/profile.png")} // Replace with the path to your image
                style={styles.profileimg}
              />
            </TouchableOpacity>
          </View>
          {decodedToken && (
            <>
              <View style={styles.labelInputContainer}>
                <Text style={styles.label}>First Name</Text>
                  <Text style={styles.uptx02}>{decodedToken.firstname}</Text>
              </View>
              <View style={styles.labelInputContainer}>
                <Text style={styles.label}>Last Name</Text>
                <Text style={styles.uptx02}>{decodedToken.lastname}</Text>
              </View>
              <View style={styles.labelInputContainer}>
                <Text style={styles.label}>Email Address</Text>
                <Text style={styles.uptx02}>{decodedToken.email}</Text> 
              </View>
            </>
          )} 
          <View style={styles.labelInputContainer}>
            <TouchableOpacity onPress={onChangePassword}>
              <Text style={styles.fogottx}>Change Password</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.logoutbox}>
            <TouchableOpacity style={styles.logoutbox2} onPress={openModal}>
              <Icon5 style={styles.rotaticon} name="logout" size={20} color="#414452" />
              <Text style={styles.logout}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Toolbar */}
      <View style={styles.toolbar}>
        <TouchableOpacity style={styles.tab} onPress={onHome}>
          <Icon name="home" size={24} color="#9B9EAD" />
          <Text style={styles.toollabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={onChat}>
          <Icon3 name="chat-processing" size={24} color="#9B9EAD" />
          <Text style={styles.toollabel}>Chats</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Icon4 name="user" size={24} color="#0EAB73" />
          <Text style={styles.toollabelActive}>Profile</Text>
        </TouchableOpacity>
      </View>


      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.popupBox}>
          <View style={styles.rowpop}>
            <Text style={styles.poptx01}>Logout</Text>
          </View>
          <View style={styles.rowpop}>
            <Text style={styles.poptx02}>Are you sure to logout Now?</Text>
          </View>
          <TouchableOpacity style={styles.popbtn} onPress={onLogout}>
            <Text style={styles.popbtntx}>Yes, Logout</Text>
          </TouchableOpacity>
          <View style={styles.rowpop}>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.poptx03}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // backgroundColor: "#F2F2F2",
  },
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
    paddingBottom: 25,
    paddingTop: 25,
  },
  rowcen: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  signUpText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 8,
  },
  label: {
    color: "#000",
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 5,
  },
  toollabel: {
    color: "#9B9EAD",
    fontSize: 12,
    fontWeight: "400",
  },
  input: {
    width: "100%",
    height: 51,
    borderColor: "#FAFAFA",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#FAFAFA",
    color: "#000",
  },
  blueRow: {
    backgroundColor: "#00A0E3",
    alignItems: "center",
    justifyContent: "flex-end",
    height: 95,
    marginBottom: 30,
  },
  profileicon: {
    width: 65,
    height: 65,
    borderRadius: 15,
  },
  toolbox: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1EEEE",
    borderRadius: 30,
    margin: 10,
  },
  marrow4: {
    marginTop: 20,
    width: "100%",
    flex: 1,
    resizeMode: "cover",
    borderRadius: 30,
    flexDirection: "row",
  },
  labelInputContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  mapBox: {
    flexDirection: "row",
    width: 251,
    height: 100,
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  mapBoxrow01: {
    flexDirection: "row",
    width: "85%",
  },
  mapBoxrow01row1: {
    width: "40%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  mapBoxrow01row2: {
    width: "60%",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 10,
  },
  daytx: {
    width: 55,
    minHeight: 70,
    borderRadius: 10,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  daytxtext: {
    fontSize: 13,
    color: "#FFF",
    fontWeight: "900",
  },
  daytxtext1: {
    fontSize: 12,
    color: "#FFF",
    fontWeight: "400",
    marginTop: 3,
  },
  daytxtext2: {
    fontSize: 14,
    color: "#FFF",
    fontWeight: "700",
    marginTop: 3,
  },
  daytxtext3: {
    fontSize: 12,
    color: "#FFF",
    fontWeight: "400",
    marginTop: 3,
  },
  mapBoxrow02: {
    width: "15%",
    alignItems: "center",
  },
  marrow4row1: {
    width: "70%",
    padding: 10,
  },
  manimg: {
    width: "100%",
  },
  marrow4row2: {
    width: "30%",
    justifyContent: "center",
    alignContent: "center",
  },
  marbox: {
    margin: 10,
    marginHorizontal: 20,
  },
  boxtx01: {
    fontSize: 24,
    color: "#282C3F",
    fontWeight: "900",
    marginTop: 4,
  },
  boxtx02: {
    fontSize: 13,
    color: "#000",
    fontWeight: "400",
    marginTop: 4,
  },
  marrow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  scroltool: {
    width: "100%",
    flexDirection: "row",
  },
  marrow2: {
    flexDirection: "row",
    width: "100%",
    padding: 10,
    backgroundColor: "#F1EEEE",
    borderRadius: 30,
    marginTop: 20,
  },
  marrow3: {
    marginTop: 20,
  },
  marrow2row1: {
    width: "15%",
    alignItems: "center",
    justifyContent: "center",
  },
  marrow2row2: {
    width: "70%",
  },
  marrow2row3: {
    width: "15%",
    alignItems: "center",
    justifyContent: "center",
  },
  whiteBox2: {
    borderRadius: 12,
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginVertical: 10,
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderColor: "#E0DDDD",
    borderStyle: "solid",
    borderWidth: 1,
  },
  toolbar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 3,
    borderColor: "rgba(0, 0, 0, 0.020)",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  toollabelActive: {
    fontSize: 12,
    color: "#0EAB73",
    fontWeight: "600",
  },
  titletx: {
    fontSize: 32,
    color: "#282C3F",
    fontWeight: "700",
  },
  titletx2: {
    fontSize: 32,
    color: "#282C3F",
    fontWeight: "700",
    marginLeft: 25,
  },
  titletx3: {
    fontSize: 24,
    color: "#282C3F",
    fontWeight: "600",
  },
  titlebox: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 20,
  },
  titlebox2: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleboxtx: {
    fontSize: 20,
    color: "#000",
    fontWeight: "700",
  }, titleboxlogout: {
    fontSize: 14,
    color: "#6E6E6E",
    fontWeight: "400",
    marginLeft: 10,
  },
  fogottx: {
    color: "#000",
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 5,
    marginTop: 10,
  },
  profimgbox: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  profileimg: {
    width: 116,
    height: 116,
    borderRadius: 116,
  },
  proficonadd: {
    backgroundColor: "#F98B4E",
    width: 40,
    height: 40,
    borderColor: "#FFF",
    borderRadius: 115,
    borderStyle: "solid",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    right: 15,
  },
  profimgminibox: {
    position: "relative",
  },
  logobot: {
    marginBottom: 60,
  },
  logoutbox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "8%",
  },
  logoutbox2: {
    flexDirection: "row",
  },
  logout: {
    color: "#414452",
    fontSize: 14,
    fontWeight: "400",
    marginLeft: 10,
  },
  rotaticon: {
    transform: [{ rotate: '180deg' }],
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    overflow: "scroll",
  },
  popupBox: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    top: '35%',
    left: '50%',
    transform: [{ translateX: -Dimensions.get('window').width / 2.6 }],
    width: Dimensions.get('window').width / 1.3,
    elevation: 5,
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  rowpop: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  poptx01: {
    color: "#383233",
    fontSize: 14,
    fontWeight: "300",
    marginTop: 5,
  },
  poptx02: {
    color: "#383233",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 5,
  },
  poptx03: {
    color: "#6E6E6E",
    fontSize: 16,
    fontWeight: "500",
  },
  popbtn: {
    backgroundColor: "#19825C",
    height:50,
    borderRadius:12,
    marginHorizontal:5,
    marginVertical:15,
    justifyContent:"center",
    alignItems:"center",
  },
  popbtntx: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default Profile;
