import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Linking,
    Image
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const InfoScreen = ({ navigation }) => {
    // Demo version info
    const appVersion = '1.0.0';

    // Sample FAQ items
    const faqItems = [
        {
            question: 'How does the app work?',
            answer: 'Our app uses advanced computer vision algorithms to analyze images. Simply take a photo using the camera feature, and our system will process and provide detailed analysis results.'
        },
        {
            question: 'Is my data secure?',
            answer: 'Yes, we prioritize your privacy. All image processing happens on-device when possible, and any data sent to our servers is encrypted and not stored permanently.'
        },
        {
            question: 'Can I use this app offline?',
            answer: 'Basic features are available offline, but for full analysis capabilities, an internet connection is required.'
        },
        {
            question: 'How accurate are the results?',
            answer: 'Our technology provides high accuracy results, but accuracy may vary depending on image quality, lighting conditions, and the specific object being analyzed.'
        }
    ];

    const openPrivacyPolicy = () => {
        Linking.openURL('https://www.yourapp.com/privacy-policy');
    };

    const openTermsOfService = () => {
        Linking.openURL('https://www.yourapp.com/terms-of-service');
    };

    const contactSupport = () => {
        Linking.openURL('mailto:support@yourapp.com');
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
                <Text style={styles.title}>Information</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.aboutSection}>
                    <Image
                        source={require('../assets/logo.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <Text style={styles.appName}>MyApp</Text>
                    <Text style={styles.versionText}>Version {appVersion}</Text>
                    <Text style={styles.description}>
                        An intelligent image analysis application designed to help you identify and learn about objects around you.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>How to Use</Text>
                    <View style={styles.howToItem}>
                        <View style={styles.stepNumberContainer}>
                            <Text style={styles.stepNumber}>1</Text>
                        </View>
                        <View style={styles.stepContent}>
                            <Text style={styles.stepTitle}>Take a Photo</Text>
                            <Text style={styles.stepDescription}>
                                Open the camera screen and take a clear photo of the object you want to analyze.
                            </Text>
                        </View>
                    </View>

                    <View style={styles.howToItem}>
                        <View style={styles.stepNumberContainer}>
                            <Text style={styles.stepNumber}>2</Text>
                        </View>
                        <View style={styles.stepContent}>
                            <Text style={styles.stepTitle}>View Results</Text>
                            <Text style={styles.stepDescription}>
                                Wait a moment for the analysis to complete, then review the detailed results.
                            </Text>
                        </View>
                    </View>

                    <View style={styles.howToItem}>
                        <View style={styles.stepNumberContainer}>
                            <Text style={styles.stepNumber}>3</Text>
                        </View>
                        <View style={styles.stepContent}>
                            <Text style={styles.stepTitle}>Share Insights</Text>
                            <Text style={styles.stepDescription}>
                                Share your findings with friends or save them for future reference.
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>FAQ</Text>
                    {faqItems.map((item, index) => (
                        <View key={index} style={styles.faqItem}>
                            <Text style={styles.question}>{item.question}</Text>
                            <Text style={styles.answer}>{item.answer}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.linksSection}>
                    <TouchableOpacity style={styles.link} onPress={openPrivacyPolicy}>
                        <MaterialIcons name="privacy-tip" size={20} color="#4285F4" />
                        <Text style={styles.linkText}>Privacy Policy</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.link} onPress={openTermsOfService}>
                        <MaterialIcons name="description" size={20} color="#4285F4" />
                        <Text style={styles.linkText}>Terms of Service</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.link} onPress={contactSupport}>
                        <MaterialIcons name="help-outline" size={20} color="#4285F4" />
                        <Text style={styles.linkText}>Contact Support</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
        padding: 16,
    },
    aboutSection: {
        alignItems: 'center',
        marginBottom: 30,
    },
    logo: {
        width: 80,
        height: 80,
        marginBottom: 10,
    },
    appName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    versionText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 12,
    },
    description: {
        fontSize: 16,
        color: '#444',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
    },
    howToItem: {
        flexDirection: 'row',
        marginBottom: 16,
        alignItems: 'flex-start',
    },
    stepNumberContainer: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#4285F4',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        marginTop: 2,
    },
    stepNumber: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    stepContent: {
        flex: 1,
    },
    stepTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 4,
        color: '#333',
    },
    stepDescription: {
        fontSize: 16,
        color: '#666',
    },
    faqItem: {
        marginBottom: 16,
        backgroundColor: '#f8f8f8',
        padding: 16,
        borderRadius: 8,
    },
    question: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: '#333',
    },
    answer: {
        fontSize: 15,
        color: '#666',
        lineHeight: 22,
    },
    linksSection: {
        marginBottom: 30,
    },
    link: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    linkText: {
        fontSize: 16,
        color: '#4285F4',
        marginLeft: 10,
    },
});

export default InfoScreen;