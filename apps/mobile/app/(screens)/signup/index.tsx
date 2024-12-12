import { Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import RefifyLogo from "../../../assets/SVG/RefifyLogo";
import Checkbox from "expo-checkbox";
import SecondaryButton from "../../components/SecondaryButton/SecondaryButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import { Controller, useForm } from "react-hook-form";
import { useLazyFetch } from "../../hooks/useFetch";
import { useAccount } from "../../pages/UserAccount/hooks/useAccount";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";


const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm({
    defaultValues: {
      password: "",
      email: "",
      name: ""
    }
  });
  const [{ data: dataResponse, loading, error }, fetchSignUp] = useLazyFetch({
    url: `${process.env.EXPO_PUBLIC_API_URL}/api/rest/auth/email/sign-up`,
    method: "post",
    cache: false
  });
  console.log("dataResponse", dataResponse);
  const { profile, setProfile } = useAccount();
  const router = useRouter();
  const [isChecked, setChecked] = useState(true);

  const onSubmit = (data) => {
    fetchSignUp({ data });
  };

  useEffect(() => {
    if (!dataResponse) {
      return;
    }
    setProfile(dataResponse);
    router.push("/home");
  }, [dataResponse]);
  useEffect(() => {
    if (!profile) {
      return;
    }
    router.push("/home");
  }, [profile]);
  return profile
    ? null
    : (
      <SafeAreaView className="w-full h-full bg-background flex flex-col justify-center p-4">
        <View className="w-full h-full flex gap-4">
          <RefifyLogo />
          <KeyboardAwareScrollView>
            <View className="w-full h-full flex gap-6">
              <Text
                className=" text-t1Semi_mob text-white">
                Создание аккаунта
              </Text>
              <View className="flex gap-5">
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
                        title="Логин"
                        value={value}
                        onChange={onChange} />
                    )}
                    name="name" />
                  {errors.name && <Text className="mt-1.5 capitalize text-secondary_red">required</Text>}
                </View>
                <View>
                  <Controller
                    rules={{ required: true }}
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <CustomInput
                        inputMode={"text"}
                        keyboardType={"email-address"}
                        title="Email"
                        value={value}
                        onChange={onChange} />
                    )}
                    name="email" />
                  {errors.email && <Text className="mt-1.5 capitalize text-secondary_red">required</Text>}
                </View>
                <View>
                  <Controller
                    rules={{
                        required: true
                      }}
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <CustomInput
                        inputMode={"text"}
                        keyboardType={"visible-password"}
                        title="Пароль *"
                        value={value}
                        onChange={onChange}
                        secureTextEntry={true} />
                    )}
                    name="password" />
                </View>
                <View>
                  <Controller
                    /*  rules={{
                        required: true
                      }}*/
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <CustomInput
                        inputMode={"text"}
                        keyboardType={"visible-password"}
                        title="Пароль еще раз *"
                        value={value}
                        onChange={onChange}
                        secureTextEntry={true} />
                    )}
                    name="password" />
                  {errors.password && <Text className="mt-1.5 capitalize text-secondary_red">required</Text>}
                </View>

              </View>
              <View className="flex flex-row w-full justify-start py-4 gap-x-3">
                <Checkbox
                  value={isChecked}
                  onValueChange={setChecked}
                  color={isChecked ? "#125BFF" : undefined}
                  className={`border-1 rounded-md mt-2 ${isChecked ? "" : "border-secondary_dark_gray"}`}
                />
                <View className="flex flex-col flex-wrap gap-1">
                  <Text className="text-medium_grey text-caption_r_desk">Согласен с условиями</Text>
                  <TouchableOpacity><Text className="text-white text-caption_r_desk">Пользовательского соглашения</Text></TouchableOpacity>
                  <TouchableOpacity><Text className="text-white text-caption_r_desk">и Политики
                    конфиденциальности</Text></TouchableOpacity>
                </View>
              </View>
              <View className="flex gap-4">
                <SecondaryButton title="Отмена" onPress={() => router.back()} />
                <PrimaryButton title="Войти" onPress={handleSubmit(onSubmit)} type='submit'/>
              </View>
            </View>

          </KeyboardAwareScrollView>
          <View className="flex-row flex gap-x-2 justify-center">
            <Text className="text-caption_r_desk text-medium_grey">Есть аккаунт?</Text>
            <TouchableOpacity onPress={() => {
              router.replace("/signin");
            }
            }>
              <Text className=" text-caption_r_desk text-white">Войти</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
};
export default SignUp;
