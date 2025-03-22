import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    ActivityIndicator,
    Share
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ResultsScreen = ({ route, navigation }) => {
    const { photoUri, photoBase64 } = route.params;
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Simulate analyzing the image
        const analyzeImage = async () => {
            try {
                // Here you would typically make an API call to analyze the image
                // For example:
                // const response = await fetch('https://your-api.com/analyze', {
                //   method: 'POST',
                //   headers: {
                //     'Content-Type': 'application/json',
                //   },
                //   body: JSON.stringify({ image: photoBase64 }),
                // });
                // const data = await response.json();

                // For demo purposes, we'll simulate a response after a delay
                setTimeout(() => {
                    const mockResults = {
                        mainCategory: 'Object',
                        confidence: 0.92,
                        details: [
                            { label: 'Item A', confidence: 0.92 },
                            { label: 'Item B', confidence: 0.85 },
                            { label: 'Item C', confidence: 0.76 },
                        ]
                    };
                    setResults(mockResults);
                    setLoading(false);
                }, 2000);
            } catch (error) {
                console.error('Error analyzing image:', error);
                setError('Failed to analyze image. Please try again.');
                setLoading(false);
            }
        };

        analyzeImage();
    }, [photoBase64]);

    const shareResults = async () => {
        try {
            await Share.share({
                message: `Check out my results: ${results.mainCategory} with ${(results.confidence * 100).toFixed(1)}% confidence!`,
                url: photoUri
            });
        } catch (error) {
            console.error('Error sharing results:', error);
        }
    };

    const retakePhoto = () => {
        navigation.navigate('Camera');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <MaterialIcons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.title}>Analysis Results</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: photoUri }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                </View>

                <View style={styles.resultsContainer}>
                    {loading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#4285F4" />
                            <Text style={styles.loadingText}>Analyzing image...</Text>
                        </View>
                    ) : error ? (
                        <View style={styles.errorContainer}>
                            <MaterialIcons name="error-outline" size={48} color="#E53935" />
                            <Text style={styles.errorText}>{error}</Text>
                            <TouchableOpacity
                                style={styles.retryButton}
                                onPress={retakePhoto}
                            >
                                <Text style={styles.retryButtonText}>Retake Photo</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <>
                            <View style={styles.resultHeaderContainer}>
                                <Text style={styles.resultMainLabel}>{results.mainCategory}</Text>
                                <Text style={styles.confidenceText}>
                                    {(results.confidence * 100).toFixed(1)}% confidence
                                </Text>
                            </View>

                            <View style={styles.divider} />

                            <Text style={styles.detailsTitle}>Details:</Text>
                            {results.details.map((item, index) => (
                                <View key={index} style={styles.detailItem}>
                                    <Text style={styles.detailLabel}>{item.label}</Text>
                                    <View style={styles.confidenceBarContainer}>
                                        <View
                                            style={[
                                                styles.confidenceBar,
                                                {width: `${item.confidence * 100}%`}
                                            ]}
                                        />
                                    </View>
                                    <Text style={styles.detailConfidence}>
                                        {(item.confidence * 100).toFixed(1)}%
                                    </Text>
                                </View>
                            ))}
                        </>
                    )}
                </View>
            </ScrollView>

            {!loading && !error && (
                <View style={styles.actionsContainer}>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.secondaryButton]}
                        onPress={retakePhoto}
                    >
                        <MaterialIcons name="camera-alt" size={20} color="#4285F4" />
                        <Text style={styles.secondaryButtonText}>Retake</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={shareResults}
                    >
                        <MaterialIcons name="share" size={20} color="#fff" />
                        <Text style={styles.buttonText}>Share Results</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    backButton: {
        padding: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    placeholder: {
        width: 40,
    },
    scrollContent: {
        flexGrow: 1,
    },
    imageContainer: {
        width: '100%',
        height: 250,
        backgroundColor: '#f5f5f5',
        marginBottom: 16,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    resultsContainer: {
        flex: 1,
        padding: 16,
    },
    loadingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
    },
    errorContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    errorText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    retryButton: {
        backgroundColor: '#E53935',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    retryButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    resultHeaderContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    resultMainLabel: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    confidenceText: {
        fontSize: 18,
        color: '#4285F4',
        fontWeight: '600',
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 16,
    },
    detailsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    detailLabel: {
        width: '30%',
        fontSize: 16,
        color: '#333',
    },
    confidenceBarContainer: {
        flex: 1,
        height: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        marginRight: 10,
    },
    confidenceBar: {
        height: 10,
        backgroundColor: '#4285F4',
        borderRadius: 5,
    },
    detailConfidence: {
        width: 50,
        fontSize: 14,
        color: '#666',
        textAlign: 'right',
    },
    actionsContainer: {
        flexDirection: 'row',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    actionButton: {
        flex: 1,
        backgroundColor: '#4285F4',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 5,
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#4285F4',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
    secondaryButtonText: {
        color: '#4285F4',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
});

export default ResultsScreen;