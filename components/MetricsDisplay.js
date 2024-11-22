import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MetricsDisplay({ metrics }) {
  return (
    <View style={styles.container}>
      <Text style={styles.metric}>
        Max RAM Usage: {metrics.ramUsage ? `${metrics.ramUsage.toFixed(2)} MB` : 'N/A'}
      </Text>
      <Text style={styles.metric}>
        Latency: {metrics.latency ? `${metrics.latency.toFixed(2)} ms` : 'N/A'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  metric: {
    fontSize: 16,
    marginVertical: 5,
  },
});