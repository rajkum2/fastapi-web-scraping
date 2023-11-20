import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000'; // Replace with your FastAPI server URL

export const fetchNews = async (page = 'world', category = 'africa') => {
    try {
        const response = await axios.get(`${API_URL}/news?page=${page}&category=${category}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching news data:", error);
        throw error;
    }
};