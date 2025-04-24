import React, { useState, useEffect } from "react";
import { Services } from "../services/Services";
import styles from "./RegisterForm.module.css";
import { Link } from "react-router-dom"; // Import Link for navigation

const Register = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    gender: "",
  });

  const [check, setCheck] = useState([]);
  const [existingUsers, setExistingUsers] = useState([]);
  const [error, setError] = useState("");
  const [userExists, setUserExists] = useState(false); // To check if the user should sign in

  // Fetch existing users when the component loads
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await Services.getUsers(); // Fetch registered users
        setExistingUsers(users);
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleCheck = (e) => {
    let { checked, value } = e.target;
    setCheck((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });

    if (name === "email") {
      // Check if email exists as the user types
      const exists = existingUsers.some((user) => user.email === value);
      setUserExists(exists);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, gender } = state;

    // Prevent registration if user already exists
    if (userExists) {
      setError("This email is already registered. Please sign in.");
      return;
    }

    setError(""); // Clear error if no duplicate

    try {
      let payload = { email, password, gender, skills: check };
      Services.registerUser(payload);
      alert("Registration successful!");
    } catch (error) {
      console.log("Registration failed", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.registerForm}>
        <h2 className={styles.title}>Register</h2>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Gender:</label>
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            onChange={handleChange}
            required
          />{" "}
          Male
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            onChange={handleChange}
            required
          />{" "}
          Female
        </div>
        <div>
          <label>Skills:</label>
          <div>
            <input
              type="checkbox"
              id="html"
              value="html"
              name="skills"
              onChange={handleCheck}
            />{" "}
            HTML
            <input
              type="checkbox"
              id="css"
              value="css"
              name="skills"
              onChange={handleCheck}
            />{" "}
            CSS
            <input
              type="checkbox"
              id="js"
              value="js"
              name="skills"
              onChange={handleCheck}
            />{" "}
            JavaScript
            <input
              type="checkbox"
              id="react"
              value="react"
              name="skills"
              onChange={handleCheck}
            />{" "}
            React
            <input
              type="checkbox"
              id="corejava"
              value="core java"
              name="skills"
              onChange={handleCheck}
            />{" "}
            Core Java
          </div>
        </div>
        {error && (
          <p style={{ color: "red" }}>
            {error}{" "}
            <Link to="/login">
              <button
                type="button"
                style={{
                  background: "blue",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  cursor: "pointer",
                  marginLeft: "10px",
                }}
              >
                Sign In
              </button>
            </Link>
          </p>
        )}
        {!userExists && (
          <div>
            <input type="submit" value="Register" />
          </div>
        )}

        {/* Sign In Button if Registration is Disabled */}
        {userExists && (
          <div>
            <Link to="/">
              <button className={styles.signInBtn}> Sign In</button>
            </Link>
          </div>
        )}
      </form>
    </>
  );
};

export default Register;
