import axios from 'axios';
const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = import.meta.env.VITE_API_URL;
const API_BEARER_TOKEN = import.meta.env.VITE_API_BEARER_TOKEN;

//! -----> Fetch my data from TMDB API <-----//
export async function fetchAPIData(endpoint) {
  try {


    const response = await axios.get(`${API_URL}${endpoint}`, {
      params: {
        api_key: API_KEY,
        language: 'fr-FR'
      }
    });

    return response.data;
  } catch (error) {
    console.error(`Error fetching data from TMDB API: ${error.message}`);
    throw new Error(`Error fetching data from TMDB API: ${error.message}`, error);
  }
}