import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { fetchAIResponse } from '../utils/aiService'; // Assuming you have a service to interact with the AI

const Assistant = () => {
  const [query, setQuery] = useState('');
  const [responses, setResponses] = useState([]);

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
    <View style={styles.container}>
      <Text style={styles.title}>AI Assistant</Text>
      
      <ScrollView style={styles.responsesContainer}>
        {responses.map((item, index) => (
          <View key={index} style={styles.responseItem}>
            <Text style={styles.queryText}>You: {item.query}</Text>
            <Text style={styles.responseText}>AI: {item.response}</Text>
          </View>
        ))}
      </ScrollView>

      <TextInput
        style={styles.input}
        placeholder="Ask a question..."
        value={query}
        onChangeText={setQuery}
      />
      
      <Button color={"#30e3ca"} title="Send" onPress={handleAskQuestion} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
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
  },
  responseText: {
    marginLeft: 10,
    color: 'gray',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
});

export default Assistant;
