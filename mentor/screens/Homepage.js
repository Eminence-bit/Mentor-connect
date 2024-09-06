import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, ActivityIndicator} from 'react-native';
import { getMentors, bookSession } from '../utils/api';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Home = () => {
  const [mentors, setMentors] = useState([]);
  const [filters, setFilters] = useState({ field: '', experience: '' });
  const [loading, setLoading] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const navigation = useNavigation();

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
    fetchMentors();
  }, [filters]);

  const fetchMentors = async () => {
    setLoading(true);
    try {
      const mentorData = await getMentors(filters);
      setMentors(mentorData);
    } catch (error) {
      console.error('Error fetching mentors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters(prevFilters => ({ ...prevFilters, [field]: value }));
  };

  const handleMentorSelect = (mentor) => {
    setSelectedMentor(mentor);
    navigation.navigate('MentorProfile', { mentorId: mentor.id });
  };

  const handleBookSession = async () => {
    if (selectedMentor) {
      try {
        const userId = 'CURRENT_USER_ID'; // Replace with actual user ID
        const timeSlot = new Date().toISOString(); // Replace with actual time slot
        await bookSession(selectedMentor.id, userId, timeSlot);
        alert('Session booked successfully');
      } catch (error) {
        console.error('Error booking session:', error);
        alert('Error booking session');
      }
    }
  };

  return (
    <View style={[styles.container, isDarkTheme && styles.darkContainer]}>
      <Text style={[styles.title, isDarkTheme && styles.darkTitle]}>Find a Mentor</Text>
      <TextInput
        style={[styles.input, isDarkTheme && styles.darkInput]}
        placeholder="Field"
        value={filters.field}
        onChangeText={(text) => handleFilterChange('field', text)}
      />
      <TextInput
        style={[styles.input, isDarkTheme && styles.darkInput]}
        placeholder="Experience (years)"
        keyboardType="numeric"
        value={filters.experience}
        onChangeText={(text) => handleFilterChange('experience', text)}
      />
      <Button title="Search" color={"#30e3ca"} onPress={fetchMentors} />

      {loading ? (
        <ActivityIndicator size="large" color="#30e3ca" />
      ) : (
        <FlatList
          data={mentors}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[styles.mentorCard, isDarkTheme && styles.darkMentorCard]}>
              <Text style={[styles.mentorName, isDarkTheme && styles.darkMentorName]}>{item.name}</Text>
              <Text style={isDarkTheme && styles.darkText}>Field: {item.field}</Text>
              <Text style={isDarkTheme && styles.darkText}>Experience: {item.experience} years</Text>
              <Button title="Select" color={"#30e3ca"} onPress={() => handleMentorSelect(item)} />
            </View>
          )}
        />
      )}

      {selectedMentor && (
        <View style={[styles.bookingSection, isDarkTheme && styles.darkBookingSection]}>
          <Text style={[styles.bookingTitle, isDarkTheme && styles.darkBookingTitle]}>
            Book a Session with {selectedMentor.name}
          </Text>
          <Button title="Book Session" onPress={handleBookSession} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  darkTitle: {
    color: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  darkInput: {
    backgroundColor: '#555',
    color: '#fff',
  },
  mentorCard: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  darkMentorCard: {
    backgroundColor: '#444',
    borderColor: '#555',
  },
  mentorName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  darkMentorName: {
    color: '#fff',
  },
  darkText: {
    color: '#ccc',
  },
  bookingSection: {
    marginTop: 16,
  },
  darkBookingSection: {
    backgroundColor: '#444',
  },
  bookingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  darkBookingTitle: {
    color: '#fff',
  },
});

export default Home;
