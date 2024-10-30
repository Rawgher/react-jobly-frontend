import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import userContext from "../helpers/userContext";

function Profile({ updateUser }) {
  const { currentUser } = useContext(userContext);

  const INITIAL_STATE = {
    username: currentUser.username,
    password: currentUser.password,
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
  };

  const [formData, setFormData] = useState(INITIAL_STATE);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(formData);
      navigate("/");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="Profile">
      <h1>Join our Community</h1>
      {error && (
        <p className="Profile-error-txt">
          There has been an error with your submission. Please try again.
        </p>
      )}
      <form onSubmit={handleSubmit} className="Profile-form">
        <input
          id="username"
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <input
          id="password"
          type="text"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <input
          id="firstName"
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />

        <input
          id="lastName"
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />

        <input
          id="email"
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <button>Update Account</button>
      </form>
    </div>
  );
}

export default Profile;
