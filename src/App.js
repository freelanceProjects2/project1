import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/home";
import Contact from "./pages/contact/contact";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/contact-us" Component={Contact} />
      </Routes>
    </div>
  );
}

export default App;
