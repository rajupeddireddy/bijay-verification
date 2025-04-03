import "./App.css";
import Form from "./pages/Form/Form";
import Login from "./pages/Login/Login.tsx";
import { Routes, Route } from "react-router-dom";
import UserSearch from "./pages/UserSearch/UserSearch.tsx";
import PrivateRoute from "./helpers/privateRoute.tsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/form" element={<PrivateRoute element={<Form />} />} />
        <Route
          path="/userSearch"
          element={<PrivateRoute element={<UserSearch />} />}
        />
      </Routes>
    </div>
  );
}

export default App;
