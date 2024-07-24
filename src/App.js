import "./App.css";
import { Routes, Route } from "react-router-dom";
import Main from "./components/main/main";
import Search from "./components/search/search";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;
