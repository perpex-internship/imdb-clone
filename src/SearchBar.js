import React, { useState, useEffect } from "react";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Debounce mechanism (wait before fetching)
  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const delayDebounce = setTimeout(() => {
      fetchSuggestions(query);
    }, 400); // 400ms debounce delay

    return () => clearTimeout(delayDebounce);
  }, [query]);

  // Fetch from Datamuse API
  const fetchSuggestions = async (input) => {
    try {
      const response = await fetch(
        `https://api.datamuse.com/sug?s=${input}`
      );
      const data = await response.json();
      setSuggestions(data);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleSuggestionClick = (word) => {
    setQuery(word);
    setShowSuggestions(false);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🔍 Dynamic Search with Suggestions</h2>
      <input
        type="text"
        placeholder="Type something..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => query.length >= 2 && setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)} // small delay to allow click
        style={styles.input}
      />

      {showSuggestions && suggestions.length > 0 && (
        <ul style={styles.dropdown}>
          {suggestions.map((item) => (
            <li
              key={item.word}
              onClick={() => handleSuggestionClick(item.word)}
              style={styles.suggestionItem}
            >
              {item.word}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Inline CSS styling
const styles = {
  container: {
    width: "400px",
    margin: "80px auto",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    position: "relative",
  },
  title: {
    marginBottom: "20px",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "12px 15px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
  },
  dropdown: {
    listStyleType: "none",
    margin: 0,
    padding: 0,
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    width: "100%",
    position: "absolute",
    top: "90px",
    left: 0,
    maxHeight: "200px",
    overflowY: "auto",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    zIndex: 10,
  },
  suggestionItem: {
    padding: "10px 15px",
    cursor: "pointer",
    borderBottom: "1px solid #f0f0f0",
  },
};

// Add hover effect via JavaScript object style
styles.suggestionItem[':hover'] = {
  backgroundColor: "#f5f5f5",
};

export default SearchBar;
