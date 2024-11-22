import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native'; // Ensure TensorFlow.js backend for React Native is loaded
import * as ImagePicker from 'expo-image-picker';
import DropdownMenu from '../components/DropdownMenu';
import MetricsDisplay from '../components/MetricsDisplay';
import { models } from '../models/ModelManifest'; // Import the model manifest

export default function MainView() {
  const [selectedModel, setSelectedModel] = useState(null); // Selected model object
  const [image, setImage] = useState(null); // Selected image URI
  const [metrics, setMetrics] = useState({ ramUsage: null, latency: null }); // Performance metrics

  const handleSelectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleIdentify = async () => {
    if (!selectedModel || !image) {
      alert('Please select a model and an image first!');
      return;
    }

    try {
      // Initialize TensorFlow.js
      await tf.ready();

      // Load the selected model
      const model = await tf.loadGraphModel(selectedModel.architecture);

      // Mock input tensor (replace with actual preprocessing)
      const inputTensor = tf.zeros([1, 224, 224, 3]); // Example input tensor shape

      // Measure performance
      const startTime = performance.now();
      const prediction = model.predict(inputTensor); // Perform inference
      const endTime = performance.now();

      const ramUsage = Math.random() * 100; // Replace with actual RAM usage data
      const latency = endTime - startTime;

      setMetrics({ ramUsage, latency });
      alert('Classification Complete');
    } catch (error) {
      console.error('Error during inference:', error);
      alert('Failed to classify the image.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Model selection dropdown */}
      <DropdownMenu
        options={models.map((model) => model.name)} // Extract model names
        selectedOption={selectedModel?.name || null} // Display selected model name
        onSelect={(modelName) =>
          setSelectedModel(models.find((model) => model.name === modelName))
        }
      />

      {/* Image placeholder */}
      <View style={styles.imagePlaceholder}>
        {image ? <Image source={{ uri: image }} style={styles.image} /> : <Text>No image selected</Text>}
      </View>

      {/* Select Photo Button */}
      <TouchableOpacity style={styles.button} onPress={handleSelectImage}>
        <Text style={styles.buttonText}>Select Photo</Text>
      </TouchableOpacity>

      {/* Identify Button */}
      <TouchableOpacity style={styles.button} onPress={handleIdentify}>
        <Text style={styles.buttonText}>Identify</Text>
      </TouchableOpacity>

      {/* Performance metrics display */}
      <MetricsDisplay metrics={metrics} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  imagePlaceholder: {
    width: 200,
    height: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
