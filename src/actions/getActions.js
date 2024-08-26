import { fetchAPIData } from "./fetchAPIData";

//! Display the 20 most trending Streams
export async function fetchTrendingStreams(endpoint) {
  try {
    const data = await fetchAPIData(endpoint);
    // Filter out the trending peoples, keeping only movies and TV shows
    const filteredResults = data.results.filter(item => item.media_type === 'movie' || item.media_type === 'tv');

    return filteredResults;
  } catch (error) {
    throw new Error(`Error filtering movies and TV shows: ${error.message}`, error);
  }
}

//! Fetch most popular streams
export async function fetchMostPopulars(endpoint) {
  try {
    const data = await fetchAPIData(endpoint);
    const results = data.results

    return results;
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


//! Search for a stream
export async function searchStreams(endpoint) {
  try {
    // Fetch the data from the API
    const data = await fetchAPIData(endpoint);

    // Ensure that data has results and is an array
    if (data && Array.isArray(data.results)) {
      // Filter out streams where media_type is a person and that don't have a poster
      const filteredResults = data.results.filter(
        (stream) => stream.media_type !== 'person' && stream.poster_path
      );

      // Return the filtered results
      return filteredResults;
    } else {
      // Throw an error if the response is not in the expected format
      throw new Error("Unexpected API response format");
    }
  } catch (error) {
    // Log the full error for debugging
    console.error("SearchStreams Error:", error);

    // Re-throw a more user-friendly error message
    throw new Error(`Failed to fetch stream data: ${error.message}`);
  }
}

//! fetch the Now Playing streams
export async function fetchNowPlaying(endpoint) {
  try {
    const data = await fetchAPIData(endpoint);

    return data;
  } catch (error) {
    throw new Error(`Error filtering movies and TV shows: ${error.message}`, error);
  }
}

//! fetch watch providers
export async function fetchWatchProviders(endpoint) {
  try {
    const data = await fetchAPIData(endpoint);

    return data;
  } catch (error) {
    throw new Error(`Error filtering movies and TV shows: ${error.message}`, error);
  }
}
