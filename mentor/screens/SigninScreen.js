import React, { useState } from 'react';
import { View, Button, StyleSheet, Alert, Platform } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, signInWithCredential, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../utils/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PreSignInChoiceScreen from './PreSignInChoiceScreen';
import StudentProfile from './StudentProfile';
import MentorProfile from './MentorProfile';
import MentorSetupScreen from './MentorSetupScreen';
import StudentSetupScreen from './StudentSetupScreen';

const SignInScreen = ({ navigation }) => {
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setIsSigningIn(true);

      let userCredential;
      if (Platform.OS === 'web') {
        console.log("User is trying to sign in on web");
        const provider = new GoogleAuthProvider();
        userCredential = await signInWithPopup(auth, provider);
      } else {
        console.log("User is trying to sign in on mobile");
        await GoogleSignin.hasPlayServices();
        const { idToken } = await GoogleSignin.signIn();
        const credential = GoogleAuthProvider.credential(idToken);
        userCredential = await signInWithCredential(auth, credential);
      }

      const user = userCredential.user;
      const userDoc = await getDoc(doc(db, 'users', user.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.type === 'student') {
          return <StudentProfile/>
        } else if (userData.type === 'mentor') {
          
          return <MentorProfile/>
        }
      } else {
        const userType = await AsyncStorage.getItem('userType');
        if (userType) {
          if (userType === 'student') {
            return <StudentSetupScreen/>
          } else if (userType === 'mentor') {
            return <MentorSetupScreen/>
          }
        } else {
          <PreSignInChoiceScreen/>
        }
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
      Alert.alert('Sign-In Error', error.message);
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title={isSigningIn ? 'Signing In...' : 'Sign In with Google'}
        onPress={handleGoogleSignIn}
        disabled={isSigningIn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignInScreen;