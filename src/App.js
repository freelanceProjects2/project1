import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/home";
import Contact from "./pages/contact/contact";
import Enter from "./pages/Enterypage/enter";
import Buttons from "./compopnents/buttons/buttons";
import login from "./pages/login/login";

function App() {
  return (
    <div className="App">
      <Buttons/>
      <Routes>
        <Route path="/Home" Component={Home} />
        <Route path="/contact-us" Component={Contact} />
        <Route path="/" Component={Enter} />
        <Route path="/login" Component={login} />

      </Routes>
    </div>
  );
}

export default App;
