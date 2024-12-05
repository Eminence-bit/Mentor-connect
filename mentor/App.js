import React, { useEffect, useState } from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PreSignInChoiceScreen from './screens/PreSignInChoiceScreen'
import StudentProfile from './screens/StudentProfile';
import MentorProfile from './screens/MentorProfile';
import { auth, db } from './utils/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import Appij from './Appij';

const Stack = createStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser(user);
          setUserType(userData.type);
        } else {
          setUser(user);
          setUserType(null); 
        }
      } else {
        setUser(null);
        setUserType(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
        {!user ? (
          <Appij/>
        ) : userType === null ? (
          <>
            <PreSignInChoiceScreen/>
          </>
        ) : userType === 'student' ? (
          <StudentProfile/>
        ) : (
          <MentorProfile/>
        )}
    </NavigationContainer>
  );
};

export default App;