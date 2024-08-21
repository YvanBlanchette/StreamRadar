import { fetchAPIData } from "./fetchAPIData";

//! Display 20 most popular movies
export const getPopularMovies = async () => {
  try {
    const data = await fetchAPIData('movie/popular');
    // Log the data to the console
    console.log(data);
    // Return the data
    return data;
    // Log any errors that occur
  } catch (error) {
    console.error(error);
    // Return null to indicate an error occurred
    return null;
  }
};
