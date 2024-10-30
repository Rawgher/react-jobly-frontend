import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import CompaniesList from "./components/CompaniesList";
import Company from "./components/Company";
import JobsList from "./components/JobsList";
import { useContext } from "react";
import userContext from "./helpers/userContext";
import SignUp from "./components/SignUp";
import Login from "./components/Login";

function RouteList({ signup, login, updateUser }) {
  const { currentUser } = useContext(userContext);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/profile"
        element={
          currentUser ? (
            <Profile updateUser={updateUser} />
          ) : (
            <Navigate to={"/"} />
          )
        }
      />
      <Route
        path="/companies"
        element={currentUser ? <CompaniesList /> : <Navigate to={"/"} />}
      />
      <Route
        path="/companies/:handle"
        element={currentUser ? <Company /> : <Navigate to={"/"} />}
      />
      <Route
        path="/jobs"
        element={currentUser ? <JobsList /> : <Navigate to={"/"} />}
      />
      <Route path="/signup" element={<SignUp signup={signup} />} />
      <Route path="/login" element={<Login login={login} />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default RouteList;
