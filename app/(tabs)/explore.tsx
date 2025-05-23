import { StyleSheet } from 'react-native';

import { Chatbot } from '@/components/Chatbot';

export default function TabTwoScreen() {
  return (
    <Chatbot />
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
