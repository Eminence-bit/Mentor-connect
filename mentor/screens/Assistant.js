import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { fetchAIResponse } from '../utils/aiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Assistant = () => {
  const [query, setQuery] = useState('');
  const [responses, setResponses] = useState([]);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('isDarkTheme');
      setIsDarkTheme(savedTheme === 'true');
    } catch (error) {
      console.error('Failed to load theme:', error);
    }
  };

  useEffect(() => {
    loadTheme();
  }, []);

  const handleAskQuestion = async () => {
    if (query.trim() === '') {
      Alert.alert('Error', 'Please enter a question');
      return;
    }

    try {
      const response = await fetchAIResponse(query);
      setResponses([...responses, { query, response }]);
      setQuery('');
    } catch (error) {
      Alert.alert('Error', 'Failed to get response from AI');
    }
  };

  return (
    <View style={[styles.container, isDarkTheme && styles.darkContainer]}>
      <Text style={[styles.title, isDarkTheme && styles.darkTitle]}>AI Assistant</Text>
      
      <ScrollView style={styles.responsesContainer}>
        {responses.map((item, index) => (
          <View key={index} style={styles.responseItem}>
            <Text style={[styles.queryText, isDarkTheme && styles.darkQueryText]}>You: {item.query}</Text>
            <Text style={[styles.responseText, isDarkTheme && styles.darkResponseText]}>AI: {item.response}</Text>
          </View>
        ))}
      </ScrollView>

      <TextInput
        style={[styles.input, isDarkTheme && styles.darkInput]}
        placeholder="Ask a question..."
        placeholderTextColor={isDarkTheme ? '#aaa' : '#999'}
        value={query}
        onChangeText={setQuery}
      />
      
      <Button title="Send" color={"#30e3ca"} onPress={handleAskQuestion} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000',
  },
  darkTitle: {
    color: '#fff',
  },
  responsesContainer: {
    flex: 1,
    marginBottom: 16,
  },
  responseItem: {
    marginBottom: 10,
  },
  queryText: {
    fontWeight: 'bold',
    color: '#000',
  },
  darkQueryText: {
    color: '#fff',
  },
  responseText: {
    marginLeft: 10,
    color: 'gray',
  },
  darkResponseText: {
    color: '#ccc',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    color: '#000',
  },
  darkInput: {
    borderColor: '#555',
    backgroundColor: '#555',
    color: '#fff',
  },
});

export default Assistant;
