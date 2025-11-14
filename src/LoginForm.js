import React, { useState, useEffect } from "react";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState({
    length: false,
    uppercase: false,
    number: false,
    special: false,
  });
  const [isFormValid, setIsFormValid] = useState(false);

  // 🔹 Handle password validation logic
  const validatePassword = (pwd) => {
    const rules = {
      length: pwd.length >= 8,
      uppercase: /[A-Z]/.test(pwd),
      number: /[0-9]/.test(pwd),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
    };
    setPasswordValid(rules);
  };

  // 🔹 Run validation when password changes
  useEffect(() => {
    validatePassword(password);
  }, [password]);

  // 🔹 Determine overall form validity
  useEffect(() => {
    const allValid = Object.values(passwordValid).every(Boolean);
    setIsFormValid(allValid && username.trim().length > 0);
  }, [passwordValid, username]);

  // 🔹 Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`✅ Login successful!\nUsername: ${username}`);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🔐 Login Form</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Username Field */}
        <label style={styles.label}>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          style={styles.input}
          required
        />

        {/* Password Field */}
        <label style={styles.label}>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          style={styles.input}
          required
        />

        {/* Live Password Validation Feedback */}
        <div style={styles.validationBox}>
          <p style={styles.validationText}>
            {passwordValid.length ? "✅" : "❌"} At least 8 characters
          </p>
          <p style={styles.validationText}>
            {passwordValid.uppercase ? "✅" : "❌"} Contains uppercase letter
          </p>
          <p style={styles.validationText}>
            {passwordValid.number ? "✅" : "❌"} Contains a number
          </p>
          <p style={styles.validationText}>
            {passwordValid.special ? "✅" : "❌"} Contains special character
          </p>
        </div>

        {/* Submit Button */}
        <button type="submit" style={isFormValid ? styles.button : styles.disabledButton} disabled={!isFormValid}>
          Login
        </button>
      </form>
    </div>
  );
};

// 🎨 Inline Styling
const styles = {
  container: {
    width: "420px",
    margin: "100px auto",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    padding: "25px",
    border: "2px solid #ddd",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
  },
  title: {
    marginBottom: "20px",
    fontSize: "24px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
  label: {
    textAlign: "left",
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#444",
  },
  input: {
    padding: "10px 12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    outline: "none",
  },
  validationBox: {
    textAlign: "left",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    padding: "10px",
    marginBottom: "15px",
  },
  validationText: {
    fontSize: "15px",
    margin: "3px 0",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "0.2s",
  },
  disabledButton: {
    backgroundColor: "#ccc",
    color: "#666",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "not-allowed",
  },
};

export default LoginForm;
