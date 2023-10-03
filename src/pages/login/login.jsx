import React from 'react';
import './login.css';

function Login() {
    const backgroundImageStyle = {
        backgroundImage: `url('https://img5.goodfon.com/wallpaper/nbig/6/e6/pchioly-ulei-priroda.jpg')`, // Replace with the actual path to your background image
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight: '100vh', // Ensure the background covers the entire viewport height
        position: 'relative', // Make sure the overlay div is positioned relative to this container
      };
    
      const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the opacity here (0.5 for 50% opacity)
      };
    
      return (
        <div style={backgroundImageStyle}>
          <div style={overlayStyle}></div> {/* Overlay */}
      <div className="container">
        <input type="checkbox" id="check" />
        <div className="login form">
          <header>Login</header>
          <form action="#">
            <input type="text" placeholder="Enter your email" />
            <input type="password" placeholder="Enter your password" />
            <a href="#">Forgot password?</a>
            <input type="button" className="button" value="Login" />
          </form>
          <div className="signup">
            <span className="signup">
              Don't have an account?
              <label htmlFor="check">Signup</label>
            </span>
          </div>
        </div>
        <div className="registration form">
          <header>Signup</header>
          <form action="#">
            <input type="text" placeholder="Enter your email" />
            <input type="password" placeholder="Create a password" />
            <input type="password" placeholder="Confirm your password" />
            <input type="button" className="button" value="Signup" />
          </form>
          <div className="signup">
            <span className="signup">
              Already have an account?
              <label htmlFor="check">Login</label>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
