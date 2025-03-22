import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Function to save scan result to MongoDB
export const saveScanResult = async (scanData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/scan-results`, scanData);
        return response.data;
    } catch (error) {
        console.error('Error saving scan result:', error);
        throw error;
    }
};

// Function to get scan history
export const getScanHistory = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/scan-results`);
        return response.data;
    } catch (error) {
        console.error('Error fetching scan history:', error);
        throw error;
    }
};

//ChatGPT API functions