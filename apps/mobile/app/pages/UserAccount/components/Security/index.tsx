import {Controller, useForm} from "react-hook-form";
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import ArrowBack from "../../../../../assets/SVG/ArrowBack";
import {useRouter} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";

const Security = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      password: "",
      repeatPassword: "",

    },
  })
  const onSubmit = (data) => console.log(data)
  const router = useRouter()
  return (
    <View className='bg-gray-900 w-full h-full'>
      <SafeAreaView>
        <View className='w-full h-full flex gap-y-6 pt-12 p-4'>
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowBack/>
          </TouchableOpacity>
          <Text className='text-2xl font-extrabold tracking-tight text-slate-200'>Change Password</Text>
          <View className='pt-10 flex gap-y-3'>
            <Text className='block text-sm font-medium leading-6 text-white'>Previous Password</Text>
            <Controller
              control={control}
              rules={{}}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  className='block w-full rounded-md  bg-white/5 py-2 px-3 text-white  border border-white/10  focus:border-indigo-500'
                />
              )}
              name="password"
            />

            <Text className='block text-sm font-medium leading-6 text-white'>New Password</Text>
            <Controller
              control={control}
              rules={{
                maxLength: 100,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  className='block w-full rounded-md  bg-white/5 py-2 px-3 text-white  border border-white/10  focus:border-indigo-500'
                />
              )}
              name="repeatPassword"
            />
            {errors.repeatPassword && <Text>required</Text>}
            <TouchableOpacity onPress={handleSubmit(onSubmit)} className='rounded-md bg-indigo-500 px-3 py-2 '>
              <Text className='text-sm font-semibold text-white text-center'>Submit</Text>
            </TouchableOpacity>
          </View>
          <View className='pt-8'>
            <Text className='text-base font-semibold leading-7 text-white'>Delete account</Text>
            <Text className='mt-1 text-sm leading-6 text-gray-400'>No longer want to use our service? You can delete
              your account here. This action is not reversible. All information related to this account will be deleted
              permanently.</Text>
            <TouchableOpacity className='rounded-md bg-red-500 px-3 py-2  mt-6'>
              <Text className='text-sm font-semibold text-white text-center'>Yes, delete my account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  )
}
export default Security
