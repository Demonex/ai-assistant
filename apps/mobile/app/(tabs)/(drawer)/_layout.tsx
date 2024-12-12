import {Drawer} from "expo-router/drawer";
import {backgroundColor} from "react-native-calendars/src/style";


export default function RootLayoutDrawer() {

  return (
    <Drawer screenOptions={{
      drawerActiveTintColor: '#6366f1',
      drawerInactiveTintColor: '#e5e7eb',
      drawerStyle: {backgroundColor: 'rgba(17,24,39,0.9)'}
    }}>
      <Drawer.Screen name='home'
                     options={{headerShown: false, title: 'Analytics'}}
      />
      <Drawer.Screen name='audience'
                     options={{headerShown: false, title: 'Audience'}}
      />
      <Drawer.Screen name='feed'
                     options={{headerShown: false, title: 'Feed'}}
      />
    </Drawer>
  );
}
