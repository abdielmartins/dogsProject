import { BrowserRouter, Route, Routes } from "react-router-dom";

import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import User from "./components/user/User";
import { UserStorage } from "./context/userContext";
import ProtectedRoute from "./helper/protectedRoute";

import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <UserStorage>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login/*" element={<Login />} />
            <ProtectedRoute path="account/*" element={<User />} />
          </Routes>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </div>
  );
}

export default App;
