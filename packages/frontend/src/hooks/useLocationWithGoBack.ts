import {useLocation} from "wouter";

export const useLocationWithGoBack = () => {
  const [location, setLocation] = useLocation();
  const goBack = () => {
    if (history.length > 1) {
      history.go(-1);
    } else {
      setLocation('/');
    }
  };


  return [location, setLocation, goBack] as [typeof location, typeof setLocation, typeof goBack];
}
