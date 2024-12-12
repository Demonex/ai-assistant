import { Controller, useForm } from "react-hook-form";
import { Button, Text, TextInput, Touchable, TouchableOpacity, View } from "react-native";
import { useAccount } from "../../../hooks/useAccount";
import { useLazyFetch } from "../../../../../hooks/useFetch";
import { useEffect } from "react";

export const ChangeName = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email:""
    },
  })
  const {profile, setProfile} = useAccount();
  const [{data: dataUpdatedProfile}, fetchUpdate] = useLazyFetch({
    url: `https://backend.musicstats.ru/api/rest/profile`,
    method: 'put',
    cache: false
  });

  const onSubmitUpdate = (data, e) => {
    const formValues = data;
    console.log('formValues', formValues)

    const changedFields = {
      firstName: profile?.firstName !== formValues?.firstName ? formValues.firstName : undefined,
      lastName: profile?.lastName !== formValues?.lastName ? formValues.lastName : undefined,
      email: profile?.email !== formValues?.email ? formValues.email : undefined,
    }

    console.log('changedFields', changedFields)

    void fetchUpdate({
      data: changedFields
    })
  };
  useEffect(() => {
    if (!dataUpdatedProfile) {
      return;
    }
    setProfile(dataUpdatedProfile);
  }, [dataUpdatedProfile]);
  return (
    <View className='w-full h-full pt-10 flex gap-y-3'>
      <Text className='block text-sm font-medium leading-6 text-white'>First Name</Text>
      <Controller
        control={control}
        rules={{

        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            className='block w-full rounded-md  bg-white/5 py-2 px-3 text-white  border border-white/10  focus:border-indigo-500'
          />
        )}
        name="firstName"
      />
      {errors.firstName && <Text>required</Text>}

      <Text className='block text-sm font-medium leading-6 text-white'>Last Name</Text>
      <Controller
        control={control}
        rules={{
          maxLength: 100,

        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            className='block w-full rounded-md  bg-white/5 py-2 px-3 text-white  border border-white/10  focus:border-indigo-500'
          />
        )}
        name="lastName"
      />
      {errors.lastName && <Text>required</Text>}
      <Text className='block text-sm font-medium leading-6 text-white'>Email</Text>
      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            className='block w-full rounded-md  bg-white/5 py-2 px-3 text-white  border border-white/10  focus:border-indigo-500 mb-4'
          />
        )}
        name="email"
      />
      {errors.email && <Text>required</Text>}
      <TouchableOpacity  onPress={handleSubmit(onSubmitUpdate)} className='rounded-md bg-indigo-500 px-3 py-2 '>
        <Text className='text-sm font-semibold text-white text-center'>Submit</Text>
      </TouchableOpacity>
    </View>
  )
}

export default {ChangeName}