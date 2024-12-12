import {useRouter} from 'expo-router';
import {Text, TouchableOpacity, View } from "react-native";
import React from 'react';
import RefifyLogo from '../../../assets/SVG/RefifyLogo';
import  PrimaryButton  from "../../components/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../components/SecondaryButton/SecondaryButton";
import { SafeAreaView } from "react-native-safe-area-context";

const WelcomePage = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="w-full h-full bg-background">
      <View className="w-full h-full flex items-center justify-between pt-[230px] px-4">
        <RefifyLogo/>
        <View className="w-full h-[50%] flex flex-col items-center justify-end ">
          <View className="flex items-center w-full  justify-end mb-10">
            <Text className="text-[32px] text-white mb-2 font-semibold">Давай начнём!</Text>
            <Text className="text-white text-[14px]">Начни свое путешествие</Text>
          </View>
          <View className="w-full  flex flex-col gap-4">
           <PrimaryButton title='Войти' onPress={() => router.push('/signin')}/>
           <SecondaryButton title='Зарегистрироваться' onPress={ () => router.push('/signup')}/>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomePage;
