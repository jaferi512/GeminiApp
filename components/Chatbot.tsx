// screens/ChatScreen.tsx
import React, { useState } from 'react';
import {
  Button,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { sendMessageToGemini } from '../services/geminiApi';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
    };
    setMessages((prev) => [userMessage, ...prev]);

    setInput('');
    const geminiReply = await sendMessageToGemini(input);

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: geminiReply,
      isUser: false,
    };
    setMessages((prev) => [botMessage, ...prev]);
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View style={[styles.message, item.isUser ? styles.user : styles.bot]}>
      <Text>{item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.inner}
      >
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          inverted
          contentContainerStyle={styles.chatList}
        />
        <View style={styles.inputContainer}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Ask something..."
            style={styles.input}
          />
          <Button title="Send" onPress={handleSend} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export { Chatbot };

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: { flex: 1 },
  chatList: { padding: 10 },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 4,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  message: {
    marginVertical: 4,
    padding: 10,
    borderRadius: 6,
    maxWidth: '80%',
  },
  user: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  bot: {
    alignSelf: 'flex-start',
    backgroundColor: '#F0F0F0',
  },
});
