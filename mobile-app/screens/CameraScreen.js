import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ActivityIndicator,
    Alert
} from 'react-native';
import { Camera } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';

const CameraScreen = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    const [isCapturing, setIsCapturing] = useState(false);
    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
            if (status !== 'granted') {
                Alert.alert(
                    'Camera permission needed',
                    'Please allow camera permissions to use this feature',
                    [{ text: 'OK', onPress: () => navigation.goBack() }]
                );
            }
        })();
    }, []);

    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                setIsCapturing(true);
                const photo = await cameraRef.current.takePictureAsync({
                    quality: 0.8,
                    base64: true,
                    skipProcessing: false,
                });
                setIsCapturing(false);
                navigation.navigate('Results', { photoUri: photo.uri, photoBase64: photo.base64 });
            } catch (error) {
                setIsCapturing(false);
                console.error('Error taking picture:', error);
                Alert.alert('Error', 'Failed to capture image. Please try again.');
            }
        }
    };

    const flipCamera = () => {
        setCameraType(
            cameraType === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
        );
    };

    if (hasPermission === null) {
        return <View style={styles.container}><ActivityIndicator size="large" color="#4285F4" /></View>;
    }

    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>No access to camera</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Camera
                style={styles.camera}
                type={cameraType}
                ref={cameraRef}
                ratio="16:9"
            >
                <View style={styles.overlay}>
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => navigation.goBack()}
                        >
                            <MaterialIcons name="arrow-back" size={28} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.guideFrame}>
                        {/* Optional guide frame UI elements */}
                    </View>

                    <View style={styles.controlsContainer}>
                        <TouchableOpacity
                            style={styles.flipButton}
                            onPress={flipCamera}
                        >
                            <MaterialIcons name="flip-camera-ios" size={28} color="#fff" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.captureButton}
                            onPress={takePicture}
                            disabled={isCapturing}
                        >
                            {isCapturing ? (
                                <ActivityIndicator size="small" color="#fff" />
                            ) : (
                                <View style={styles.captureButtonInner} />
                            )}
                        </TouchableOpacity>

                        <View style={styles.placeholderButton} />
                    </View>
                </View>
            </Camera>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    camera: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingHorizontal: 16,
    },
    backButton: {
        padding: 8,
    },
    guideFrame: {
        flex: 1,
        // Optional guide frame styling
    },
    controlsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 30,
        paddingHorizontal: 30,
    },
    captureButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    captureButtonInner: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#fff',
    },
    flipButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderButton: {
        width: 44,
        height: 44,
    },
    text: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default CameraScreen;