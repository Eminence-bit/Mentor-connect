import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { auth, db } from '../utils/firebaseConfig'; // Your Firebase config
import { doc, setDoc } from 'firebase/firestore';

const MentorSetupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [specialization, setSpecialization] = useState('');

  const handleSetup = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        await setDoc(doc(db, 'users', user.uid), {
          name,
          email,
          specialization,
          type: 'mentor',
        });
        navigation.navigate('MentorProfile'); // Navigate to Mentor Profile
      } catch (error) {
        console.error('Error setting up mentor profile:', error);
        Alert.alert('Setup Error', 'Failed to set up profile. Please try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Complete Your Mentor Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Specialization"
        value={specialization}
        onChangeText={setSpecialization}
      />
      <Button title="Save" onPress={handleSetup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  Button:{
    color:"#30e3ca",
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default MentorSetupScreen;
