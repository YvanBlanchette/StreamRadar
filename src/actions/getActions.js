import { fetchAPIData } from "./fetchAPIData";

//! Display the 20 most trending movies and tv shows
export async function fetchTrendingMoviesAndTvShows(endpoint) {
  try {
    const data = await fetchAPIData(endpoint);
    // Filter out the trending peoples, keeping only movies and TV shows
    const filteredResults = data.results.filter(item => item.media_type === 'movie' || item.media_type === 'tv');

    return filteredResults;
  } catch (error) {
    throw new Error(`Error filtering movies and TV shows: ${error.message}`, error);
  }
}

//! Display the 10 most popular
export async function fetchTenPopulars(endpoint) {
  try {
    const data = await fetchAPIData(endpoint);
    // Filter out the trending peoples, keeping only movies and TV shows
    const filteredResults = data.results.slice(0, 10);

    return filteredResults;
  } catch (error) {
    throw new Error(`Error: ${error.message}`, error);
  }
}

//! Display stream details
export async function fetchStreamDetails(endpoint) {
  try {
    const data = await fetchAPIData(endpoint);
    return data;
  } catch (error) {
    throw new Error(`Error: ${error.message}`, error);
  }
}