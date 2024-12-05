import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Notification = () => {
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

  const renderItem = ({ item }) => (
    <View style={[styles.notificationContainer, isDarkTheme && styles.darknotificationContainer]}>
      <Text style={[styles.notificationTitle, isDarkTheme && styles.darknotificationTitle]}>{item.title}</Text>
      <Text style={[styles.notificationContent, isDarkTheme && styles.darknotificationContent]}>{item.content}</Text>
      <Text style={[styles.notificationTime, isDarkTheme && styles.darknotificationTime]}>{item.time}</Text>
    </View>
  );

  const [notifications] = useState([
    {
      id: '1',
      type: 'message',
      title: 'New Message from Mentor',
      content: 'Your mentor has sent you a message.',
      time: '2 hours ago',
    },
    {
      id: '2',
      type: 'reminder',
      title: 'Session Reminder',
      content: 'Your session is scheduled for tomorrow at 10:00 AM.',
      time: '1 day ago',
    },
    {
      id: '3',
      type: 'update',
      title: 'Profile Update Required',
      content: 'Please update your profile to improve recommendations.',
      time: '3 days ago',
    },
    {
      id: '4',
      type: 'message',
      title: 'New Message from Student',
      content: 'A student has sent you a message regarding their project.',
      time: '4 days ago',
    },
  ]);

  return (
    <View style={[styles.container, isDarkTheme && styles.darkContainer]}>
      <Text style={[styles.header, isDarkTheme && styles.darkheader]}>Notifications</Text>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  darkheader: {
    color: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  notificationContainer: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  darknotificationContainer: {
    backgroundColor: '#444',
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  darknotificationTitle: {
    color: '#fff',
  },
  notificationContent: {
    fontSize: 16,
    marginVertical: 5,
  },
  darknotificationContent: {
    color: '#fff',
  },
  notificationTime: {
    fontSize: 14,
  },
  darknotificationTime: {
    color: '#bbb',
  },
});

export default Notification;
