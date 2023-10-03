import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [signup, setSignup] = useState(false);
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [error, setError] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    credentials: "",
  });

  const backgroundImageStyle = {
    backgroundImage: `url('https://img5.goodfon.com/wallpaper/nbig/6/e6/pchioly-ulei-priroda.jpg')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    minHeight: "100vh",
    position: "relative",
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  };

  const handleSignupClick = () => {
    setSignup(true);
  };

  const handleLoginClick = () => {
    setSignup(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));

    setError((prevState) => ({ ...prevState, [name]: "" }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const emptyFields = [];

    if (data.first_name.length === 0) {
      setError((prevData) => ({
        ...prevData,
        first_name: "Please enter a first name",
      }));
      emptyFields.push("first_name");
    } else if (data.first_name.length < 3) {
      setError((prevData) => ({
        ...prevData,
        first_name: "First name should be at least 3 characters",
      }));
      emptyFields.push("first_name");
    } else if (typeof data.first_name === "number") {
      setError((prevData) => ({
        ...prevData,
        first_name: "First name should be a string",
      }));
      emptyFields.push("first_name");
    }

    if (data.last_name.length === 0) {
      setError((prevData) => ({
        ...prevData,
        last_name: "Please enter a last name",
      }));
      emptyFields.push("last_name");
    } else if (data.last_name.length < 3) {
      setError((prevData) => ({
        ...prevData,
        last_name: "Last name should be at least 3 characters",
      }));
      emptyFields.push("last_name");
    } else if (typeof data.last_name === "number") {
      setError((prevData) => ({
        ...prevData,
        last_name: "Last name should be a string",
      }));
      emptyFields.push("last_name");
    }

    if (data.email.length === 0) {
      setError((prevData) => ({
        ...prevData,
        email: "Please enter an email",
      }));
      emptyFields.push("email");
    } else if (typeof data.email === "number") {
      setError((prevData) => ({
        ...prevData,
        email: "Email should be a string",
      }));
      emptyFields.push("email");
    } else if (data.email) {
      const emailRegex = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(data.email)) {
        setError((prevData) => ({
          ...prevData,
          email: "Enter a valid email address",
        }));
        emptyFields.push("email");
      }
    }

    if (data.password.length === 0) {
      setError((prevData) => ({
        ...prevData,
        password: "Please enter a password",
      }));
      emptyFields.push("password");
    } else if (data.password) {
      const passwordRegex = /^(?=.*[A-Za-z\d]).{8,}$/;
      if (!passwordRegex.test(data.password)) {
        setError((prevData) => ({
          ...prevData,
          password: "Password should be at least 8 characters",
        }));
        emptyFields.push("password");
      }
    }

    if (data.password !== data.confirm_password) {
      setError((prevData) => ({
        ...prevData,
        confirm_password: "Password not match",
      }));
      emptyFields.push("confirm_password");
    }

    if (emptyFields.length > 0) {
      return;
    }

    try {
      await axios.post("http://localhost:8000/user", {
        first_name: data?.first_name,
        last_name: data?.last_name,
        email: data?.email,
        password: data?.password,
      });

      setSignup(false);
    } catch (error) {
      console.error("Axios error:", error);
    }
  };

  const handleLogin = async () => {
    try {
      const resp = await axios.post("http://localhost:8000/user/login", {
        email: data?.email,
        password: data?.password,
      });

      localStorage.setItem("userInfo", JSON.stringify(resp.data));
      navigate("/home");
    } catch (error) {
      console.log("Login error", error);

      if (error) {
        setError((prevData) => ({
          ...prevData,
          credentials: "Invalid credentials",
        }));
        console.log("Invalid credentials error:", error.credentials);
      }
    }
  };

  return (
    <div style={backgroundImageStyle}>
      <div style={overlayStyle}></div>
      <div className="container-log">
        <input type="checkbox" id="check" />
        {signup ? (
          // Render the Signup form when signup state is true
          <div className="registration-log form-log">
            <header>Signup</header>
            <form action="#">
              <div className="loginLabel">
                <input
                  type="text"
                  name="first_name"
                  placeholder="Enter your first name"
                  onChange={handleFormChange}
                  value={data.first_name}
                />
                {error.first_name && (
                  <div className="error">{error.first_name}</div>
                )}
              </div>
              <div className="loginLabel">
                <input
                  type="text"
                  placeholder="Enter your last name"
                  name="last_name"
                  value={data.last_name}
                  onChange={handleFormChange}
                />
                {error.last_name && (
                  <div className="error">{error.last_name}</div>
                )}
              </div>
              <div className="loginLabel">
                <input
                  type="text"
                  placeholder="Enter your email"
                  name="email"
                  value={data.email}
                  onChange={handleFormChange}
                />
                {error.email && <div className="error">{error.email}</div>}
              </div>
              <div className="loginLabel">
                <input
                  type="password"
                  placeholder="Create a password"
                  name="password"
                  value={data.password}
                  onChange={handleFormChange}
                />
                {error.password && (
                  <div className="error">{error.password}</div>
                )}
              </div>
              <div className="loginLabel">
                <input
                  type="password"
                  placeholder="Confirm your password"
                  name="confirm_password"
                  value={data.confirm_password}
                  onChange={handleFormChange}
                />
                {error.confirm_password && (
                  <div className="error">{error.confirm_password}</div>
                )}
              </div>
              <div className="loginLabel">
                <input
                  type="button"
                  className="button"
                  value="Signup"
                  onClick={handleSignUp}
                />
              </div>
            </form>
            <div className="signup-log">
              <span className="signup-log">
                Already have an account?
                <label htmlFor="check" onClick={handleLoginClick}>
                  Login
                </label>
              </span>
            </div>
          </div>
        ) : (
          // Render the Login form when signup state is false
          <div className="login-log form-log">
            <header>Login</header>
            <form action="#">
              <div className="loginLabel">
                <input
                  type="text"
                  placeholder="Enter your email"
                  name="email"
                  value={data.email}
                  onChange={handleFormChange}
                />
              </div>
              <div className="loginLabel">
                <input
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={data.password}
                  onChange={handleFormChange}
                />
                {error.credentials && (
                  <div className="error">{error.credentials}</div>
                )}
              </div>
              <input
                type="button"
                className="button"
                value="Login"
                onClick={handleLogin}
              />
            </form>
            <div className="signup-log">
              <span className="signup-log">
                Don't have an account?
                <label htmlFor="check" onClick={handleSignupClick}>
                  Signup
                </label>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
