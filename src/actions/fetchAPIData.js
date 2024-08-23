import axios from 'axios';
const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = import.meta.env.VITE_API_URL;

//! -----> Fetch my data from TMDB API <-----//
export async function fetchAPIData(endpoint) {
  try {
    // Use Axios to make a GET request to the specified endpoint
    const response = await axios.get(`${API_URL}${endpoint}`, {
      params: {
        api_key: API_KEY,
        language: 'fr-FR'
      }
    });

    // Return the response data
    return response.data;
  } catch (error) {
    // Throw an error 
    throw new Error(`Error fetching data from TMDB API: ${error.message}`, error);
  }
}