import React from 'react';
import { View, Button, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignInScreen from './SigninScreen';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const PreSignInChoiceScreen = ({ navigation }) => {
  const handleChoice = async (userType) => {
    try {
      // Store choice in AsyncStorage
      await AsyncStorage.setItem('userType', userType);
      console.log(userType);
      <Stack.Navigator>
          <Stack.Screen name="SigninScreen" component={SignInScreen} initialParams={{ userType }} />
        </Stack.Navigator>
    } catch (error) {
      console.error('Error storing user choice:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Sign in as Student" onPress={() => handleChoice('student')} />
      <Button title="Sign in as Mentor" onPress={() => handleChoice('mentor')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Button:{
    color:"#30e3ca",
  },
});

export default PreSignInChoiceScreen;
