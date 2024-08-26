import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router
import { FaMagnifyingGlass } from "react-icons/fa6";
import { cn } from "@/lib/utils";

const SearchField = () => {
	const [isOpened, setIsOpened] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const navigate = useNavigate();

	// Create a ref for the input field
	const inputRef = useRef(null);

	// Function to sanitize the input to prevent XSS attacks
	const sanitizeInput = (input) => {
		return input.replace(/[^a-zA-Z0-9\s]/g, "").trim();
	};

	// Function to handle the button click
	const handleButtonClick = (e) => {
		// Prevent default form submission
		e.preventDefault();

		// Sanitize the input
		const sanitizedValue = sanitizeInput(inputValue);

		// Check if the input is not empty and redirect to the search results page
		if (isOpened && sanitizedValue) {
			// Navigate to the search results page with the value
			navigate(`/search-results/${encodeURIComponent(sanitizedValue)}`);
			setInputValue("");
			setIsOpened(false);
		} else {
			setIsOpened(!isOpened);
		}
	};

	// Focus on the input field when the button is clicked
	useEffect(() => {
		if (isOpened && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isOpened]);

	return (
		<form className="flex" onSubmit={handleButtonClick}>
			<input
				type="text"
				ref={inputRef} // Attach the ref to the input field
				className={cn(
					"flex h-10 rounded-none bg-[#A2C900]/15 px-3 py-1 text-md ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 w-[350px] transition-all duration-500",
					!isOpened && "bg-transparent w-0"
				)}
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
			/>
			<button
				type="submit"
				className={cn(
					"flex items-center justify-center rounded-none bg-[#A2C900]/20 hover:bg-[#A2C900]/30 px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300",
					!isOpened && "bg-transparent"
				)}
			>
				<FaMagnifyingGlass className="text-xl text-[#A2C900]" />
			</button>
		</form>
	);
};

export default SearchField;
