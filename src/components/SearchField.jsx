import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { cn } from "@/lib/utils"; // Utility function for conditional class names

const SearchField = () => {
	// State to manage the visibility of the search field
	const [isOpened, setIsOpened] = useState(false);

	// State to store the current input value
	const [inputValue, setInputValue] = useState("");

	// Hook to get the navigate function from React Router
	const navigate = useNavigate();

	// Refs for the input field and form to handle focus and outside clicks
	const inputRef = useRef(null);
	const formRef = useRef(null);

	// Function to sanitize input to prevent XSS attacks
	const sanitizeInput = (input) => {
		return input.replace(/[^a-zA-Z0-9\s]/g, "").trim();
	};

	// Handle button click to either open/close the search field or perform the search
	const handleButtonClick = (e) => {
		// Prevent default form submission
		e.preventDefault();

		// Sanitize the input to prevent XSS attacks
		const sanitizedValue = sanitizeInput(inputValue);

		if (isOpened && sanitizedValue) {
			// If the search field is opened and input is not empty, navigate to search results page
			navigate(`/search-results/${encodeURIComponent(sanitizedValue)}`);
			// Clear the input field
			setInputValue("");
			// Close the search field
			setIsOpened(false);
		} else {
			// Otherwise, toggle the visibility of the search field
			setIsOpened(!isOpened);
		}
	};

	// Function to focus on the input field when the search field is opened
	useEffect(() => {
		if (isOpened && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isOpened]);

	// Close the search field if the user clicks outside of it
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (formRef.current && !formRef.current.contains(event.target)) {
				setIsOpened(false);
			}
		};

		// Add an event listener for outside clicks
		document.addEventListener("mousedown", handleClickOutside);

		// Cleanup the event listener on component unmount
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<form ref={formRef} className="flex" onSubmit={handleButtonClick}>
			<input
				type="text"
				ref={inputRef}
				className={cn(
					"flex h-10 rounded-none bg-[#A2C900]/15 px-3 py-1 text-md ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 w-[350px] transition-all duration-500",
					!isOpened && "bg-transparent w-0"
				)}
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
			/>
			<button
				type="submit"
				title="Recherche"
				className={cn(
					"flex items-center justify-center rounded-none bg-[#A2C900]/20 hover:opacity-70 px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300",
					!isOpened && "bg-transparent"
				)}
			>
				<FaMagnifyingGlass className="text-xl text-[#A2C900]" />
			</button>
		</form>
	);
};

export default SearchField;
