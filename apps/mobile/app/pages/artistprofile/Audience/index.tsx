import {Text, View, StyleSheet} from "react-native";
import WebView from "react-native-webview";
import {SafeAreaView} from "react-native-safe-area-context";

export default function Audience() {

  return (
    <View className="w-full h-full bg-gray-900">
      <SafeAreaView className='flex-1'>
        <WebView source={{uri: 'https://musicstats.ru/artist/0lsqj7b2/Sia/audience'}}/>
      </SafeAreaView>
    </View>
  );
}
