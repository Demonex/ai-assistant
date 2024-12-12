import {Stack} from "expo-router";

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name='welcome' options={{title: '', headerShown: false}}/>
      <Stack.Screen name='signin' options={{title: '', headerShown: false}}/>
      <Stack.Screen name='signup' options={{title: '', headerShown: false}}/>
      <Stack.Screen name='personalinformation' options={{title: '', headerShown: false}}/>
      <Stack.Screen name='security' options={{title: '', headerShown: false}}/>
    </Stack>
  )
}
