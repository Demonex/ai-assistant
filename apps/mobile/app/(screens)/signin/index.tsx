import { Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import RefifyLogo from "../../../assets/SVG/RefifyLogo";
import Checkbox from "expo-checkbox";
import SecondaryButton from "../../components/SecondaryButton/SecondaryButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import { Controller, useForm } from "react-hook-form";
import { useLazyFetch } from "../../hooks/useFetch";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import HiddenPaaswordIcon from "../../../assets/SVG/HiddenPaaswordIcon";
import YandexLogo from "../../../assets/SVG/YandexLogo";
import VKLogo from "../../../assets/SVG/VKLogo";
import GoogleLogoColored from "../../../assets/SVG/GoogleLogoColored";
import SberLogo from "../../../assets/SVG/SberLogo";
import TIDLogo from "../../../assets/SVG/TIDLogo";
import AlfaLogo from "../../../assets/SVG/AlfaLogo";
import { FlatGrid } from "react-native-super-grid";
import get from "lodash.get";

const socialsOptions = [
  {
    title: "yandex",
    color: "#FC3F1D",
    icon: <YandexLogo />
  },
  {
    title: "vk",
    color: "#4B729F",
    icon: <VKLogo />
  },
  {
    title: "vk",
    color: "#fff",
    icon: <GoogleLogoColored />
  },
  {
    title: "sber",
    color: "#25B840",
    icon: <SberLogo />
  },
  {
    title: "vk",
    color: "#fff",
    icon: <TIDLogo />
  },
  {
    title: "vk",
    color: "#EE2A23",
    icon: <AlfaLogo />
  }
];
const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm({
    defaultValues: {
      password: "",
      email: ""
    }
  });
  const router = useRouter();
  const [isChecked, setChecked] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [signInType, setSignInType] = useState("email");
  const [{ data, loading, error }, fetchSignIn] = useLazyFetch({
    url: `${process.env.EXPO_PUBLIC_API_URL}/api/rest/auth/email/sign-in`,
    method: "post",
    cache: false
  });
  const onSubmit = (data) => {
    fetchSignIn({ data });
    router.replace("/home")
  };
  useEffect(() => {
    if (get(error, "response.status") !== 401) {
      return;
    }
    error?.response.data.messages.forEach((item, index) => {
      setError(`email`, {
        message: "Учётная запись не найдена"
      }, {
        shouldFocus: index === 0
      });
    });

  }, [error]);
  return (
    <SafeAreaView className="w-full h-full bg-background p-4">
      <RefifyLogo />
      <View className="w-full h-full flex flex-col gap-4">
        <View className="w-full flex gap-4 items-center flex-row mt-4 pb-2">
          <Text
            className="text-t1Semi_mob text-white">
            Вход в аккаунт
          </Text>
        </View>
        <View className="w-full border border-secondary_dark_gray rounded-[30px] p-1 flex flex-row items-center">
          <TouchableOpacity
            onPress={() => setSignInType("email")}
            className={`py-2 px-10 rounded-[22px] w-1/2  ${signInType === "email" ? "bg-primary_blue" : ""}`}>
            <Text className={`text-btnText text-center ${signInType === "email" ? "text-white " : "text-medium_grey"}`}>По
              email</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSignInType("socials")}
            className={`py-2 px-10 rounded-[22px] w-1/2 ${signInType === "socials" ? "bg-primary_blue" : ""}`}>
            <Text
              className={`text-white text-btnText text-center ${signInType === "socials" ? "text-white " : "text-medium_grey"}`}>Через
              соцсети</Text>
          </TouchableOpacity>
        </View>
        {
          signInType === "email"
            ? <View className="w-full flex flex-col gap-4 items-center justify-center">
              <View className="flex w-full gap-5">
                <View>
                  <Controller
                    rules={{
                      required: true
                    }}
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <CustomInput
                        inputMode={"text"}
                        keyboardType={"email-address"}
                        title="Email или логин *"
                        value={value}
                        onChange={onChange}
                        placeholder="Введите email или логин"
                      />
                    )}
                    name="email" />
                  {errors.email && <Text className="capitalize text-red-800">required</Text>}
                </View>
                <View>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <CustomInput
                        inputMode={"text"}
                        keyboardType={"visible-password"}
                        title="Пароль *"
                        value={value}
                        onChange={onChange}
                        anotherChild={<HiddenPaaswordIcon />}
                        secureTextEntry={true}
                      />
                    )}
                    rules={{
                      required: true
                    }}
                    name="password" />
                  {errors.password && <Text className="capitalize text-red-800">required</Text>}
                </View>
              </View>
              <View className="flex w-full justify-between py-4 gap-4">
                <View className="flex flex-row gap-x-3 items-center">
                  <Checkbox
                    value={isChecked}
                    onValueChange={setChecked}
                    color={isChecked ? "#2067FF" : undefined}
                    className={`border rounded-md w-6 h-6  ${isChecked ? "" : "border-secondary_dark_gray"}`}
                  />
                  <Text className="text-medium_grey text-caption_r_desk">Запомнить меня</Text>
                </View>
                <TouchableOpacity>
                  <Text className="text-caption_m_desk text-white">Восстановить пароль</Text>
                </TouchableOpacity>
              </View>
            </View>
            : <View className="py-4 mt-4">
              <FlatGrid
                style={{ margin: -16 }}
                itemDimension={98}
                spacing={16}
                data={socialsOptions}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{
                      backgroundColor: `${item.color}`
                    }}
                    className="p-2.5 rounded-xl flex justify-center items-center h-16 ">
                    {item.icon}
                  </TouchableOpacity>)}
              />
            </View>
        }
        <View className="flex gap-4">
          <SecondaryButton title="Отмена" onPress={() => router.back()} />
          {
            signInType === "email" && (
              <PrimaryButton
                type='submit'
                title="Войти"
                onPress={handleSubmit(onSubmit)}>
              </PrimaryButton>
            )
          }
        </View>
      </View>
    </SafeAreaView>
  );
};
export default SignIn;
