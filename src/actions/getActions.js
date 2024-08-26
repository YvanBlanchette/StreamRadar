import { fetchAPIData } from "./fetchAPIData";

//! Display the 20 most trending Streams
export async function fetchTrendingStreams(endpoint) {
  try {
    // Fetch data from the API using the endpoint
    const data = await fetchAPIData(endpoint);

    // Filter out the trending items, keeping only movies and TV shows
    const filteredResults = data.results.filter(item => item.media_type === 'movie' || item.media_type === 'tv');

    // Return the filtered results
    return filteredResults;
  } catch (error) {
    // Throw a new error with a specific message and the original error object
    throw new Error(`Error filtering movies and TV shows: ${error.message}`, error);
  }
}

//! Fetch most popular streams
export async function fetchMostPopulars(endpoint) {
  try {
    // Fetch data from the API using the endpoint
    const data = await fetchAPIData(endpoint);

    // Return the results from the data
    const results = data.results;

    return results;
  } catch (error) {
    // Throw a new error with a specific message and the original error object
    throw new Error(`Error: ${error.message}`, error);
  }
}

//! Display stream details
export async function fetchDetails(endpoint) {
  try {
    // Fetch data from the API using the endpoint
    const data = await fetchAPIData(endpoint);

    // Return the data (details of the stream)
    return data;
  } catch (error) {
    // Throw a new error with a specific message and the original error object
    throw new Error(`Error: ${error.message}`, error);
  }
}

//! Search for a stream
export async function searchStreams(endpoint) {
  try {
    // Fetch data from the API using the endpoint
    const data = await fetchAPIData(endpoint);

    // Ensure that the data has results and is an array
    if (data && Array.isArray(data.results)) {
      // Filter out streams where media_type is 'person' and that don't have a poster
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
    // Log the full error for debugging purposes
    console.error("SearchStreams Error:", error);

    // Re-throw a more user-friendly error message
    throw new Error(`Failed to fetch stream data: ${error.message}`);
  }
}

//! Fetch the Now Playing streams
export async function fetchNowPlaying(endpoint) {
  try {
    // Fetch data from the API using the endpoint
    const data = await fetchAPIData(endpoint);

    // Return the data (now playing streams)
    return data;
  } catch (error) {
    // Throw a new error with a specific message and the original error object
    throw new Error(`Error fetching now playing streams: ${error.message}`, error);
  }
}

//! Fetch watch providers
export async function fetchWatchProviders(endpoint) {
  try {
    // Fetch data from the API using the endpoint
    const data = await fetchAPIData(endpoint);

    // Return the data (watch providers)
    return data;
  } catch (error) {
    // Throw a new error with a specific message and the original error object
    throw new Error(`Error fetching watch providers: ${error.message}`, error);
  }
}
