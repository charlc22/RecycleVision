import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    SafeAreaView,
    ScrollView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';

export default function App() {
    const [image, setImage] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera permissions to make this work!');
            }
        })();
    }, []);

    const takePicture = async () => {
        try {
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.8,
            });

            if (!result.canceled) {
                setImage(result.assets[0].uri);
                setResult(null);
                setError(null);
            }
        } catch (e) {
            console.error(e);
            setError('Failed to take picture');
        }
    };

    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.8,
            });

            if (!result.canceled) {
                setImage(result.assets[0].uri);
                setResult(null);
                setError(null);
            }
        } catch (e) {
            console.error(e);
            setError('Failed to pick image');
        }
    };

    const analyzeImage = async () => {
        if (!image) return;

        setAnalyzing(true);
        setResult(null);
        setError(null);

        try {
            // Create form data for the image
            const formData = new FormData();
            const fileInfo = await FileSystem.getInfoAsync(image);

            formData.append('image', {
                uri: image,
                name: 'upload.jpg',
                type: 'image/jpeg',
            });

            // Send to backend
            const response = await axios.post('http://YOUR_SERVER_IP:3000/analyze', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setResult(response.data.analysis);
        } catch (e) {
            console.error('Error analyzing image:', e);
            setError('Failed to analyze image. Please try again.');
        } finally {
            setAnalyzing(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>RecycleVision</Text>

            <View style={styles.imageContainer}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.imagePreview} />
                ) : (
                    <View style={styles.placeholderImage}>
                        <Text style={styles.placeholderText}>No image selected</Text>
                    </View>
                )}
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={takePicture}>
                    <Text style={styles.buttonText}>Camera</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={pickImage}>
                    <Text style={styles.buttonText}>Gallery</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, (!image || analyzing) && styles.buttonDisabled]}
                    onPress={analyzeImage}
                    disabled={!image || analyzing}
                >
                    <Text style={styles.buttonText}>
                        {analyzing ? 'Analyzing...' : 'Analyze'}
                    </Text>
                </TouchableOpacity>
            </View>

            {analyzing && (
                <ActivityIndicator size="large" color="#4CAF50" />
            )}

            {error && (
                <Text style={styles.errorText}>{error}</Text>
            )}

            {result && (
                <ScrollView style={styles.resultContainer}>
                    <Text style={styles.resultText}>{result}</Text>
                </ScrollView>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
        color: '#4CAF50',
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
        marginBottom: 20,
    },
    imagePreview: {
        width: '100%',
        height: '100%',
    },
    placeholderImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        color: '#888',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        minWidth: 100,
        alignItems: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#A5D6A7',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    resultContainer: {
        maxHeight: 200,
        width: '100%',
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
    },
    resultText: {
        fontSize: 16,
        lineHeight: 24,
    },
    errorText: {
        color: 'red',
        marginVertical: 10,
    },
});