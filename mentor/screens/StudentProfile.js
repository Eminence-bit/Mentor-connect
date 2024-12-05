import React,{useState,useEffect} from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StudentProfile = () => {
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
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: isDarkTheme ? '#333' : '#fff' }]}>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }}
          style={styles.profileImage}
        />
        <Text style={[styles.name, { color: isDarkTheme ? '#fff' : '#000' }]}>Jane Smith</Text>
        <Text style={[styles.year, { color: isDarkTheme ? '#ccc' : '#000' }]}>Year: 3rd Year, B.Tech</Text>
        <Text style={[styles.interests, { color: isDarkTheme ? '#ccc' : '#000' }]}>Interests: AI, Web Development</Text>
        <Text style={[styles.goals, { color: isDarkTheme ? '#ccc' : '#000' }]}>
          Aspiring to become a full-stack developer with a focus on AI-driven applications.
        </Text>
        <Button 
          title="Connect with a Mentor" 
          color={isDarkTheme ? '#30e3ca' : '#30e3ca'}
          onPress={() => {}}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
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
  year: {
    fontSize: 18,
    marginBottom: 5,
  },
  interests: {
    fontSize: 18,
    marginBottom: 10,
  },
  goals: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default StudentProfile;
