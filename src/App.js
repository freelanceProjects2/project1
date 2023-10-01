import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/home";
import Contact from "./pages/contact/contact";
import Enter from "./pages/Enterypage/enter";
import Buttons from "./compopnents/buttons/buttons";

function App() {
  return (
    <div className="App">
      <Buttons/>
      <Routes>
        <Route path="/Home" Component={Home} />
        <Route path="/contact-us" Component={Contact} />
        <Route path="/" Component={Enter} />

      </Routes>
    </div>
  );
}

export default App;
