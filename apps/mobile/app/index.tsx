import "react-native-url-polyfill/auto";
// import 'react-native-gesture-handler';
import { Redirect } from "expo-router";
import { useAccount } from "./pages/UserAccount/hooks/useAccount";


const Index = () => {
  const { profile, loading } = useAccount();
  if (loading) {
    return null;
  }
  return (
    <Redirect href={profile ? "/home" : "/welcome"} />
  );

};
export default Index;
