import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MentorProfile = () => {
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

  return (
    <ScrollView contentContainerStyle={[styles.container, isDarkTheme && styles.darkContainer]}>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }} // Replace with mentor's image URL
          style={styles.profileImage}
        />
        <Text style={[styles.name, isDarkTheme && styles.darkName]}>John Doe</Text>
        <Text style={[styles.industry, isDarkTheme && styles.darkIndustry]}>
          Industry: Software Engineering
        </Text>
        <Text style={[styles.experience, isDarkTheme && styles.darkExperience]}>
          Experience: 10+ years
        </Text>
        <Text style={[styles.bio, isDarkTheme && styles.darkBio]}>
          Passionate software engineer with over 10 years of experience in full-stack development and mentoring young professionals.
        </Text>
        <Button title="Schedule a Session" color={"#30e3ca"} onPress={() => {}} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  darkName: {
    color: '#fff',
  },
  industry: {
    fontSize: 18,
    marginBottom: 5,
  },
  darkIndustry: {
    color: '#ddd',
  },
  experience: {
    fontSize: 18,
    marginBottom: 10,
  },
  darkExperience: {
    color: '#ddd',
  },
  bio: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  darkBio: {
    color: '#ccc',
  },
});

export default MentorProfile;
