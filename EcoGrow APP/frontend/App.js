
import * as React from "react";


import Onboarding1 from "./page/Onboarding1";
import Onboarding2 from "./page/Onboarding2";
import Onboarding3 from "./page/Onboarding3";
import SignIn from "./page/SignIn";
import CreateAccount from "./page/CreateAccount";
import ForgetPassword from "./page/ForgetPassword";
import VerifyEmail from "./page/VerifyEmail";
import NewPassword from "./page/NewPassword";
import Home from "./page/Home";
import Home2 from "./page/Home2";
import Chat from "./page/Chat";
import Profile from "./page/Profile";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ClerkProvider } from "@clerk/clerk-expo";

export default function App() {

  const Stack = createNativeStackNavigator();
  const CustomHeader = () => null;

  return (
    <ClerkProvider publishableKey={"pk_test_ZWxlY3RyaWMtd3Jlbi0zOS5jbGVyay5hY2NvdW50cy5kZXYk"}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="onboarding1" component={Onboarding1} options={{ header: CustomHeader }}/>
          <Stack.Screen name="onboarding2" component={Onboarding2} options={{ header: CustomHeader }}/>
          <Stack.Screen name="onboarding3" component={Onboarding3} options={{ header: CustomHeader }}/>
          <Stack.Screen name="login" component={SignIn} options={{ header: CustomHeader }}/>
          <Stack.Screen name="Register" component={CreateAccount} options={{ header: CustomHeader }}/>
          <Stack.Screen name="Home" component={Home} options={{ header: CustomHeader }}/>
          <Stack.Screen name="Chat" component={Chat} options={{ header: CustomHeader }}/>
          <Stack.Screen name="Profile" component={Profile} options={{ header: CustomHeader }}/>
          <Stack.Screen name="Home2" component={Home2} options={{ header: CustomHeader }}/>
          <Stack.Screen name="ChangePassword" component={NewPassword} options={{ header: CustomHeader }}/>
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{ header: CustomHeader }}/>
          <Stack.Screen name="VerifyEmail" component={VerifyEmail} options={{ header: CustomHeader }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </ClerkProvider>
  );
}