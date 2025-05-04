"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";
import {
  doCreateUserWithEmailAndPassword,
  doSendEmailVerification,
} from "../../firebase/Auth";
import styles from "./signup.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [htno, setHtno] = useState("");
  const [year, setYear] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const email = htno ? `${htno.trim().toLowerCase()}@sru.edu.in` : "";

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const calculateYear = (htno) => {
    if (htno.length >= 2) {
      const firstTwoDigits = parseInt(htno.substring(0, 2), 10);
      const thirdLastChar = htno.charAt(htno.length - 3).toLowerCase();

      if (thirdLastChar === "l") {
        return 26 - firstTwoDigits;
      } else {
        return 25 - firstTwoDigits;
      }
    }
    return "";
  };

  const handleHtnoChange = (e) => {
    const value = e.target.value.toLowerCase();
    setHtno(value);
    setYear(calculateYear(value));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!name || !htno || !password || !confirmPassword || year === "") {
      setErrorMessage("All fields are required.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      setIsRegistering(true);

      const userCredential = await doCreateUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      await doSendEmailVerification(user);

      const response = await fetch("/api/adduser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, year, htno, email }),
      });

      if (!response.ok) {
        throw new Error("Failed to save user data to Firestore");
      }

      const auth = getAuth();
      await signOut(auth);

      setSuccessMessage(
        "✅ Account created! A verification email has been sent to your college address. Please verify before logging in, it may take 3-5 mins. Don't forget to check your spam folder"
      );

      // Optionally clear the form
      setName("");
      setHtno("");
      setYear("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Registration Error:", error);
      if (error.code === "auth/email-already-in-use") {
        setErrorMessage("Account already exists! Please log in.");
      } else if (error.code === "auth/weak-password") {
        setErrorMessage("Password should be at least 6 characters.");
      } else {
        setErrorMessage(error.message || "An unknown error occurred.");
      }
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h4>Register Here</h4>

        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        {successMessage ? (
          <p className={styles.success}>
            {successMessage}{" "}
            <a href="/SignIn" className={styles.loginLink}>Go to Login</a>
          </p>
        ) : (
          <form className={styles.form} onSubmit={onSubmit}>
            <div className={styles.inputOuterDiv}>
              <input
                className={styles.inputField}
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className={styles.inputOuterDiv}>
              <input
                className={styles.inputField}
                type="text"
                placeholder="SRU Hall Ticket Number"
                value={htno}
                onChange={handleHtnoChange}
                required
              />
            </div>

            <div className={styles.inputOuterDiv}>
              <input
                className={styles.inputField}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className={styles.iconDiv} onClick={togglePasswordVisibility}>
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className={styles.icon}
                />
              </div>
            </div>

            <div className={styles.inputOuterDiv}>
              <input
                className={styles.inputField}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <div
                className={styles.iconDiv}
                onClick={toggleConfirmPasswordVisibility}
              >
                <FontAwesomeIcon
                  icon={showConfirmPassword ? faEyeSlash : faEye}
                  className={styles.icon}
                />
              </div>
            </div>

            <button type="submit" className={styles.btn} disabled={isRegistering}>
              {isRegistering ? "Registering..." : "Register"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;