import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

import LoginForm from "./LoginForm";
import LoginCreate from "./LoginCreate";
import LoginPasswordLost from "./LoginPasswordLost";
import LoginPasswordReset from "./LoginPasswordLost";
import { UserContext } from "../../context/userContext";

const Login = () => {
  const { login } = useContext(UserContext);

  if (login === true) return <Navigate to="/account" />;
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="create" element={<LoginCreate />} />
        <Route path="lost" element={<LoginPasswordLost />} />
        <Route path="reset" element={<LoginPasswordReset />} />
      </Routes>
    </div>
  );
};

export default Login;
