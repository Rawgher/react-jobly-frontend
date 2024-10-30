import { useState } from "react";
import "./SearchInput.css";

function SearchInput({ filterFunc, search = null }) {
  const [formData, setFormData] = useState({ search: search || "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    filterFunc(formData.search);
    setFormData({ search: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="SearchInput">
      <input
        id="search"
        type="text"
        name="search"
        placeholder="Search"
        value={formData.search}
        onChange={handleChange}
      />

      <button>Search</button>
    </form>
  );
}

export default SearchInput;
