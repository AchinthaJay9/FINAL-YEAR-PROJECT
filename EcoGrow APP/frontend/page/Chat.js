import React, { useState, useEffect } from "react";
import {
  GiftedChat,
  InputToolbar,
  Composer,
  Send,
  Bubble ,
} from "react-native-gifted-chat";
import {
  View,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  StatusBar,
  Text,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Icon from "react-native-vector-icons/FontAwesome";
import Icon3 from "react-native-vector-icons/MaterialCommunityIcons";
import Icon4 from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const ChatScreen = () => {

  const [messages, setMessages] = useState([]);
  const onSend = async (newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );

    try {
      await axios.post("http://192.168.43.87:5000/chat", {text : newMessages});
    } catch (error) {
      console.error("Error sending message:", error);
    }

    try {
      const response = await axios.get("http://192.168.43.87:5000/chatdata");
      setData(response.data);
      for(let i=0 ;i<response.data.length;i++){

        if(response.data[i].userchat == newMessages[0].text){

          receivedMessage = {
            _id: Math.round(Math.random() * 1000000),
            text: response.data[i].response,
            createdAt: new Date(),
            user: {
              _id: 2,
              name: "React Native",
              avatar: "https://i.imgur.com/dhf1w4L.png",
            },
          }
          setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, [receivedMessage])
          
        );
        break; 
        }

      }
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const [data, setData] = useState([]);

  // useEffect(() => {
  //   const fetchChat = async () => {
  //     try {
  //       const response = await axios.get("http://192.168.43.87:5000/chatdata");
  //       setData(response.data);
  //       console.log(response.data)
        
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchChat();
  // }, []);

  // {data.map((item) => (
  //   receivedMessage = {
  //     _id: Math.round(Math.random() * 1000000),
  //     text: item.response,
  //     createdAt: new Date(),
  //     user: {
  //       _id: 2,
  //       name: "React Native",
  //       avatar: "https://i.imgur.com/dhf1w4L.png",
  //     },
  //   }
  //   setMessages((previousMessages) =>
  //   GiftedChat.append(previousMessages, [receivedMessage])
  // ); 
  // ))}


  const renderSend = (props) => {
    return (
      <Send {...props} containerStyle={styles.sendContainer}>
        <View style={styles.sendInnerContainer}>
          <Icon3 name="send" size={20} color="#fff" />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        textStyle={{
          left: {
            color: '#ffffff', // Text color for received messages
          },
          right: {
            color: '#ffffff', // Text color for sent messages
          },
        }}
        wrapperStyle={{
          left: {
            backgroundColor: '#414452', // Background color for received messages
          },
          right: {
            backgroundColor: '#415251', // Background color for sent messages
          },
        }}
      />
    );
  };


  const navigation = useNavigation();

  function onHome(){
    navigation.navigate('Home');
  }

  function onProfile(){
    navigation.navigate('Profile');
  }
  
  return (
    <View style={styles.safeArea}>
      <View style={styles.safebox}></View>
      <View style={styles.container}>

        <LinearGradient
          colors={['#0EAB73', '#19825C']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.TBgreen}
        >
          <View style={styles.rowcen}>
            <Icon3 name="chat-processing" size={20} color="#FFFFFF" />
            <Text style={styles.signUpText}>ChatBot</Text>
          </View>
        </LinearGradient>

        <GiftedChat
          messages={messages}
          onSend={(newMessages) => onSend(newMessages)}
          user={{
            _id: 1,
          }}
          renderInputToolbar={(props) => (
            <InputToolbar
              {...props}
              containerStyle={styles.inputContainer}
              primaryStyle={styles.inputPrimary}
            />
          )}
          renderComposer={(props) => (
            <Composer
              {...props}
              textInputStyle={styles.composerTextInput}
              placeholder="Type a message"
            />
          )}
          renderSend={renderSend}
          renderBubble={renderBubble}
        />

        {/* Bottom Toolbar */}
        <View style={styles.toolbar}>
          <TouchableOpacity style={styles.tab} onPress={onHome}>
            <Icon name="home" size={24} color="#9B9EAD" />
            <Text style={styles.toollabel}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Icon3 name="chat-processing" size={24} color="#0EAB73" />
            <Text style={styles.toollabelActive}>Chats</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab} onPress={onProfile}>
            <Icon4 name="user" size={24} color="#9B9EAD" />
            <Text style={styles.toollabel}>Profile</Text>
          </TouchableOpacity>
        </View>

        {Platform.OS === "android" && (
          <KeyboardAvoidingView behavior="height" />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0EAB73",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
    paddingTop: 10,
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

  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  inputContainer: {
    backgroundColor: "#fff",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#fff",
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  inputPrimary: {
    borderRadius: 20,
  },
  composerTextInput: {
    minHeight: 40,
    fontSize: 16,
    borderRadius: 16,
    paddingHorizontal: 10,
    backgroundColor: "#FAFAFA",
  },
  sendContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#0EAB73",
    borderRadius:8,
    width:40,
    height:40,
    marginLeft:5,
  },
  sendInnerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  hedbox: {
    flexDirection: "row",
    width: "100%",
    height: 60,
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: "#c5c5c5",
    alignItems: "center",
    paddingHorizontal: "5%",
  },
  profimg: {
    width: 40,
    height: 40,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
  },
  profimg2: {
    flex: 1,
    // width: null,
    // height: null,
  },
  onlinetx: {
    color: "#3ABF38",
    fontSize: 17,
    fontWeight: "500",
  },
  toolbar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    justifyContent: "space-around",
    alignItems: "center",
    // position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 3,
    borderColor: "rgba(0, 0, 0, 0.020)",
    marginTop:10,
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
  toollabel: {
    color: "#9B9EAD",
    fontSize: 12,
    fontWeight: "400",
  },
});

export default ChatScreen;
