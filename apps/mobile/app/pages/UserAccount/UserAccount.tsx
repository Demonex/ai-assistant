import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import AccountIcon from '../../../assets/SVG/AccountIcon';
import InfoIcon from '../../../assets/SVG/InfoIcon';
import ArrowUp from '../../../assets/SVG/ArrowUp';
import FavoriteIcon from '../../../assets/SVG/FavoriteIcon';
import BellIcon from '../../../assets/SVG/BellIcon';
import TeamIcon from '../../../assets/SVG/TeamIcon';
import MegaphoneIcon from '../../../assets/SVG/MegaphoneIcon';
import ChartIcon from '../../../assets/SVG/ChartIcon';
import SecurityIcon from '../../../assets/SVG/SecurityIcon';
import HeartIcon from '../../../assets/SVG/HeartIcon';
import {router, useRouter} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';

const accountSettings = [
  {
    title: 'Personal information',
    icon: <InfoIcon fillColor="white"/>,
    link: 'personalinformation'
  },
  {
    title: 'Professional Plan',
    icon: <ArrowUp/>
  },
  {
    title: 'Favorite Sources',
    icon: <HeartIcon/>
  },
  {
    title: 'Subscriptions',
    icon: <FavoriteIcon/>
  },
  {
    title: 'Notifications',
    icon: <BellIcon/>
  },
  {
    title: 'Teams',
    icon: <TeamIcon/>
  },
  {
    title: 'Integrations',
    icon: <MegaphoneIcon/>
  },
  {
    title: 'Activities',
    icon: <ChartIcon/>
  },
  {
    title: 'Security',
    icon: <SecurityIcon/>,
    link: 'security'
  }

];
const Item = ({title, icon, link}) => (
  <TouchableOpacity
    className="border-b border-white/5 flex flex-row items-center gap-x-3"
    onPress={() => router.push(`/${link}`)}
  >
    <View className="w-6 h-6">{icon}</View>
    <Text
      className="capitalize flex text-[16px] leading-6 font-semibold pt-3 pb-2.5 border-b-2 -mb-px  hover:border-slate-700 whitespace-nowrap border-transparent text-slate-200 ">{title}</Text>
  </TouchableOpacity>
);
export const UserAccount = () => {
  const router = useRouter();
  return (
    <View className="w-full h-full bg-gray-900">
      <SafeAreaView>
        <View className="p-4 flex gap-y-8">
          <View className="w-full flex flex-row gap-x-4 items-center px-4">
            <AccountIcon fillColor="white"/>
            <Text className="text-2xl font-extrabold tracking-tight text-slate-200">Account Settings</Text>
          </View>
          <View className="">
            <FlatList data={accountSettings}
                      renderItem={({item}) => <Item title={item.title} icon={item.icon} link={item.link}/>}/>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};
export default UserAccount;