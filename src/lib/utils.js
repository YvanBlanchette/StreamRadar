import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Function to format movie runtimes
export function runtimeFormatted(duration) {
  const hours = Math.floor(duration / 60)
  const minutes = duration % 60
  return `${hours}h ${minutes}min`
}


// Function to convert dates
export function dateFormatted(dateStr) {
  // Convert the date string to a Date object
  const date = new Date(dateStr);

  // List of months in french
  const months = [
    "janvier", "février", "mars", "avril", "mai", "juin",
    "juillet", "août", "septembre", "octobre", "novembre", "décembre"
  ];

  // Extract the day, month, and year from the Date object
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  // Return the formatted date string
  return `${day} ${month} ${year}`;
}