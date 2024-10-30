import { Link } from "react-router-dom";
import "./Nav.css";
import { useContext } from "react";
import userContext from "../helpers/userContext";

function Nav({ logout }) {
  const { currentUser } = useContext(userContext);

  return (
    <div className="Nav">
      <div className="Nav-left">
        <Link to="/" className="Nav-link">
          Jobly Home
        </Link>
      </div>
      {currentUser ? (
        <div className="Nav-right">
          <Link to="/companies" className="Nav-link">
            Companies
          </Link>
          <Link to="/jobs" className="Nav-link">
            Jobs
          </Link>
          <Link to="/profile" className="Nav-link">
            View Profile
          </Link>
          <Link to="/" onClick={logout} className="Nav-link">
            Log out {currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="Nav-right">
          <Link to="/signUp" className="Nav-link">
            SignUp
          </Link>
          <Link to="/login" className="Nav-link">
            Log In
          </Link>
        </div>
      )}
    </div>
  );
}

export default Nav;
