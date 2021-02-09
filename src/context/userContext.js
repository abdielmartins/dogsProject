import { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { TOKEN_POST, TOKEN_VALIDADE_POST, USER_GET } from "../api/api";

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = useState(null);
  const [login, setLogin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const userLogout = useCallback(async function userLogout() {
    setData(null);
    setError(null);
    setLoading(false);
    setLogin(false);
    window.localStorage.removeItem("token");
  }, []);

  async function getUser(token) {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    console.log(json);
    setData(json);
    setLogin(true);
  }

  async function userLogin(username, password) {
    try {
      setError(null);
      setLoading(true);

      const { url, options } = TOKEN_POST({ username, password });
      const response = await fetch(url, options);
      console.log(response);
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);

      const { token } = await response.json();
      window.localStorage.setItem("token", token);

      await getUser(token);

      navigate("/account");
    } catch (error) {
      setError(error.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem("token");
      if (token) {
        try {
          setError(null);
          setLoading(true);

          const { url, options } = TOKEN_VALIDADE_POST(token);
          const response = await fetch(url, options);

          if (!response.ok) throw new Error("Token Inválido");

          await getUser(token);
        } catch (error) {
          userLogout();
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
      }
    }
    autoLogin();
  }, [userLogout]);

  return (
    <UserContext.Provider
      value={{ userLogin, userLogout, data, error, loading, login }}
    >
      {children}
    </UserContext.Provider>
  );
};
