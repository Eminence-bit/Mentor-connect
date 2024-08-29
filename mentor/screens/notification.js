import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const Notification = () => {
  // Sample notification data
  const [notifications, setNotifications] = useState([
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

  const renderItem = ({ item }) => (
    <View style={styles.notificationContainer}>
      <Text style={styles.notificationTitle}>{item.title}</Text>
      <Text style={styles.notificationContent}>{item.content}</Text>
      <Text style={styles.notificationTime}>{item.time}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>
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
    backgroundColor: '#f9f9f9',
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
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  notificationContent: {
    fontSize: 16,
    color: '#666',
    marginVertical: 5,
  },
  notificationTime: {
    fontSize: 14,
    color: '#aaa',
  },
});

export default Notification;
