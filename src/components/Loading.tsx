import React from 'react';
import { View, ActivityIndicator, StyleSheet, Modal } from 'react-native';

export default function Loading() {
  return (
    <Modal transparent animationType="fade">
      <View style={styles.overlay} />
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
