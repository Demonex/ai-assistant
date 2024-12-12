import { Stack } from "expo-router";
import { useFonts } from "expo-font";
/*import {
  SofiaSansCondensed_300Light,
  SofiaSansCondensed_400Regular,
  SofiaSansCondensed_500Medium,
  SofiaSansCondensed_600SemiBold,
  SofiaSansCondensed_700Bold,
  SofiaSansCondensed_800ExtraBold
} from "@expo-google-fonts/sofia-sans-condensed";*/
import * as SplashScreen from "expo-splash-screen";
import {
  Platform,
  Keyboard,
  InputAccessoryView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert, TouchableOpacity
} from "react-native";
import KeyboardIcon from "../assets/SVG/KeyboardDismissIcon";
import KeyboardDismissIcon from "../assets/SVG/KeyboardDismissIcon";
import { useEffect } from "react";

import "../global.css";

SplashScreen.preventAutoHideAsync();

 const  HomeLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "LabGrotesqueBlack": require("./../assets/fonts/LabGrotesque/LabGrotesque-Black.ttf"),
    "LabGrotesqueBold": require("./../assets/fonts/LabGrotesque/LabGrotesque-Bold.ttf"),
    "LabGrotesqueLight": require("./../assets/fonts/LabGrotesque/LabGrotesque-Light.ttf"),
    "LabGrotesqueMedium": require("./../assets/fonts/LabGrotesque/LabGrotesque-Medium.ttf"),
    "LabGrotesqueRegular": require("./../assets/fonts/LabGrotesque/LabGrotesque-Regular.ttf")
    /*    SofiaSansCondensed_600SemiBold,
        SofiaSansCondensed_400Regular,
        SofiaSansCondensed_500Medium,
        SofiaSansCondensed_700Bold,
        SofiaSansCondensed_800ExtraBold,
        SofiaSansCondensed_300Light*/
  });
  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && error) {
    return null;
  }
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          gestureEnabled: false

        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false, gestureEnabled: false }} />
      </Stack>
      {Platform.OS === "ios" ? (
        <>
          <InputAccessoryView nativeID="Dismiss" className="w-full">
            <View
              className="bg-white p-2 flex flex-col w-full h-full justify-end items-end"
              // style={{styles.accessory}}
            >
              <TouchableOpacity onPress={() => Keyboard.dismiss()}>
                <KeyboardDismissIcon height={32} width={32} />
              </TouchableOpacity>
            </View>
          </InputAccessoryView>
        </>
      ) : null}
    </>
  );
}
export default HomeLayout