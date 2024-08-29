// MentorProfile.js
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button } from 'react-native';

const MentorProfile = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }} // Replace with mentor's image URL
          style={styles.profileImage}
        />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.industry}>Industry: Software Engineering</Text>
        <Text style={styles.experience}>Experience: 10+ years</Text>
        <Text style={styles.bio}>
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
  industry: {
    fontSize: 18,
    marginBottom: 5,
  },
  experience: {
    fontSize: 18,
    marginBottom: 10,
  },
  Button:{
    color:"#30e3ca",
  },
  bio: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default MentorProfile;
