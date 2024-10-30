import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import userContext from "./helpers/userContext";
import JoblyApi from "./helpers/api";
import RouteList from "./RouteList";
import Nav from "./components/Nav";
import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    function fetchUserToken() {
      async function fetchUser() {
        if (token) {
          JoblyApi.token = token;
          localStorage.setItem("token", token);
          const decodedToken = jwtDecode(token);
          const username = decodedToken.username;
          const user = await JoblyApi.getUser(username);
          setCurrentUser({ ...user, applications: new Set(user.applications) });
        } else {
          localStorage.removeItem("token");
          setCurrentUser(null);
        }
        setIsLoading(false);
      }
      fetchUser();
    },
    [token]
  );

  // sign up user
  async function signup(formD) {
    const token = await JoblyApi.signup(formD);
    setToken(token);
  }

  // log in user
  async function login(formD) {
    const token = await JoblyApi.login(formD);
    setToken(token);
  }

  // update a user
  async function updateUser(formD) {
    const updatedUser = await JoblyApi.updateUser(formD);
    setCurrentUser((currentUser) => ({
      ...updatedUser,
      applications: currentUser.applications,
    }));
  }

  // logout user
  async function logout() {
    setToken(null);
  }

  if (isLoading) return <p>Loading results....</p>;

  return (
    <>
      <BrowserRouter>
        <userContext.Provider value={{ currentUser, setCurrentUser }}>
          <Nav logout={logout} />
          <RouteList login={login} signup={signup} updateUser={updateUser} />
        </userContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
