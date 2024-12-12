import {router} from 'expo-router';
import {useEffect} from 'react';

const Account = () => {

  useEffect(() => {
    router.replace('/user');
  }, []);


  return null;
};

export default Account;

