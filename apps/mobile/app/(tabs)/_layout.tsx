import {Tabs} from 'expo-router';
import {Text} from 'react-native';
import HomeIcon from '../../assets/SVG/HomeIcon';
import AccountIcon from '../../assets/SVG/AccountIcon';


export default function AppLayoutTabs() {

  return (
    <Tabs screenOptions={{
      tabBarHideOnKeyboard: true,
      tabBarStyle: {
        backgroundColor: 'rgba(27,35,56,1)', borderTopColor: 'transparent', paddingVertical: 5
      },
      tabBarActiveTintColor: '#6366f1',
      tabBarInactiveTintColor: 'gray',
      headerShown: false,
      tabBarActiveBackgroundColor: 'rgba(27,35,56,0.9)',
      tabBarInactiveBackgroundColor: 'rgba(27,35,56,0.9)',
      tabBarItemStyle: {
        backgroundColor: 'rgba(27,35,56,0.9)'
      }


    }}
    >
      <Tabs.Screen
        name="(drawer)"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({focused, color}) => <HomeIcon fillColor={focused ? '#6366f1' : 'gray'}/>
        }}/>
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          headerShown: false,
          tabBarIcon: ({focused, color}) => <Text>:(</Text>
        }}/>
      <Tabs.Screen
        name="account"
        options={{
          // href: '/user',
          title: 'Account',
          headerShown: false,
          tabBarIcon: ({focused, color}) => <AccountIcon fillColor={focused ? '#6366f1' : 'gray'}/>
        }}/>
    </Tabs>
  );
}
