import React, { useState, useEffect } from "react";

// ✅ Move regex OUTSIDE the component to avoid re-creation and warnings
const urlPattern = new RegExp(
  "^(https?:\\/\\/)?" + // optional protocol
    "(([a-zA-Z0-9_-]+)\\.)+[a-zA-Z]{2,}" + // domain name
    "(\\/[a-zA-Z0-9@:%._+~#=/?&-]*)?$" // optional path/query
);

const UrlValidator = () => {
  const [inputValue, setInputValue] = useState("");
  const [isValid, setIsValid] = useState(null); // null = no input yet

  // 🔹 Live validation using useEffect
  useEffect(() => {
    if (inputValue.trim() === "") {
      setIsValid(null);
      return;
    }

    const isMatch = urlPattern.test(inputValue.trim());
    setIsValid(isMatch);
  }, [inputValue]); // ✅ only depends on inputValue now

  // 🔹 Input change handler
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🔗 URL Validator</h2>
      <input
        type="text"
        placeholder="Enter a URL (e.g., https://example.com)"
        value={inputValue}
        onChange={handleChange}
        style={{
          ...styles.input,
          borderColor:
            isValid === null
              ? "#ccc"
              : isValid
              ? "#2ecc71"
              : "#e74c3c",
        }}
      />

      {isValid !== null && (
        <p style={{ ...styles.message, color: isValid ? "#27ae60" : "#e74c3c" }}>
          {isValid ? "✅ Valid URL" : "❌ Invalid URL"}
        </p>
      )}
    </div>
  );
};

// 🎨 Styling
const styles = {
  container: {
    width: "450px",
    margin: "100px auto",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "2px solid #ccc",
    outline: "none",
    transition: "border-color 0.2s ease",
  },
  message: {
    marginTop: "15px",
    fontSize: "18px",
    fontWeight: "bold",
  },
};

export default UrlValidator;
