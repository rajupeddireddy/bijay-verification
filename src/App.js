import "./App.css";
import Form from "./pages/Form/Form";
import Login from "./pages/Login/Login.tsx";
import { Routes, Route } from "react-router-dom";
import UserSearch from "./pages/UserSearch/UserSearch.tsx";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/form" element={<Form />} />
        <Route path="/userSearch" element={<UserSearch />} />
      </Routes>
    </div>
  );
}

export default App;
