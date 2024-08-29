import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { getMentors, bookSession } from '../utils/api';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const [mentors, setMentors] = useState([]);
  const [filters, setFilters] = useState({ field: '', experience: ''});
  const [loading, setLoading] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const navigation = useNavigation();

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

  // Handle filter change
  const handleFilterChange = (field, value) => {
    setFilters(prevFilters => ({ ...prevFilters, [field]: value }));
  };

  // Handle mentor selection
  const handleMentorSelect = (mentor) => {
    setSelectedMentor(mentor);
    // Navigate to MentorProfilePage or handle the booking
    navigation.navigate('MentorProfile', { mentorId: mentor.id });
  };

  // Handle session booking
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

  useEffect(() => {
    fetchMentors();
  }, [filters]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find a Mentor</Text>
      <TextInput
        style={styles.input}
        placeholder="Field"
        value={filters.field}
        onChangeText={(text) => handleFilterChange('field', text)}
      />
      <TextInput
        style={styles.input}
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
            <View style={styles.mentorCard}>
              <Text style={styles.mentorName}>{item.name}</Text>
              <Text>Field: {item.field}</Text>
              <Text>Experience: {item.experience} years</Text>
              <Button title="Select" color={"#30e3ca"} onPress={() => handleMentorSelect(item)} />
            </View>
          )}
        />
      )}

      {selectedMentor && (
        <View style={styles.bookingSection}>
          <Text style={styles.bookingTitle}>Book a Session with {selectedMentor.name}</Text>
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
  Button:{
    color:"#30e3ca",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  mentorCard: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  mentorName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bookingSection: {
    marginTop: 16,
  },
  bookingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default Home;