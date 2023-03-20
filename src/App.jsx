import "./App.css";

// Create routes between each section of the application via react-router-dom
import { Routes, Route } from "react-router-dom";

// Import the page components
import Header from "./components/Header";
import News from "./pages/News";
import Notes from "./pages/Notes";
import StackOverflow from "./pages/StackOverflow";
import Study from "./pages/Study";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/study" element={<Study />} />
        <Route path="/stack-overflow" element={<StackOverflow />} />
      </Routes>
    </div>
  );
}

export default App;
