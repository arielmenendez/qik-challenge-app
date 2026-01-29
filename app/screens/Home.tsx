import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { profileRequest } from '../services/authService';

const Home = () => {
  useEffect(() => {
    const testCall = async () => {
      const result = await profileRequest();
      console.log('result:', result.data);
    };

    testCall();
  }, []);

  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default Home;
