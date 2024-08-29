import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Switch, Alert } from 'react-native';
import { auth } from '../utils/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const Settings = ({ navigation }) => {
  const [displayName, setDisplayName] = useState(auth.currentUser?.displayName || '');
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('isDarkTheme');
        setIsDarkTheme(savedTheme === 'true');
      } catch (error) {
        console.error('Failed to load theme:', error);
      }
    };

    loadTheme();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await user.updateProfile({
          displayName,
        });
        Alert.alert('Success', 'Profile updated successfully');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleThemeChange = async (value) => {
    setIsDarkTheme(value);
    try {
      await AsyncStorage.setItem('isDarkTheme', value.toString());
       
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  };

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        navigation.navigate('SignIn'); // Navigate to SignIn screen after logging out
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
  };

  return (
    <View style={[styles.container, isDarkTheme && styles.darkContainer]}>
      <Text style={[styles.title, isDarkTheme && styles.darkTitle]}>Settings</Text>

      <TextInput
        style={[styles.input, isDarkTheme && styles.darkInput]}
        placeholder="Display Name"
        value={displayName}
        onChangeText={setDisplayName}
      />

      <Button color={"#30e3ca"} title="Update Profile" onPress={handleUpdateProfile} />

      <View style={styles.themeSwitchContainer}>
        <Text style={[styles.themeLabel, isDarkTheme && styles.darkThemeLabel]}>Dark Theme</Text>
        <Switch
          value={isDarkTheme}
          onValueChange={handleThemeChange}
        />
      </View>

      <Button  color={"#30e3ca"} title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  darkTitle: {
    color: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  darkInput: {
    backgroundColor: '#555',
    color: '#fff',
  },
  themeSwitchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  themeLabel: {
    flex: 1,
  },
  darkThemeLabel: {
    color: '#fff',
  },
});

export default Settings;
