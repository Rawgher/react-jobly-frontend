import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import JoblyApi from "../helpers/api";
import SearchInput from "./SearchInput";
import CompanyCard from "./CompanyCard";
import "./CompaniesList.css";

function CompaniesList() {
  const [companies, setCompanies] = useState(null);
  const [filter, setFilter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const filterFunc = (search) => {
    if (!search) {
      setFilter(null);
      return <Navigate to="/companies" />;
    } else {
      if (search !== filter) {
        setIsLoading(true);
        setFilter(search);
      }
    }
  };

  useEffect(
    function fetchCompaniesWhenMounted() {
      async function fetchCompanies() {
        try {
          setCompanies(await JoblyApi.getCompanies({ name: filter }));
          setIsLoading(false);
        } catch {
          setIsLoading(false);
          <Navigate to="/" />;
        }
      }
      fetchCompanies();
    },
    [filter]
  );

  if (isLoading) return <p>Loading results....</p>;

  return (
    <div className="CompaniesList">
      <h2>Here is a list of all companies in our database</h2>

      <SearchInput filterFunc={filterFunc} search={filter} />

      {companies.map(({ name, description, handle }) => (
        <CompanyCard key={handle} companyD={{ name, description, handle }} />
      ))}
    </div>
  );
}

export default CompaniesList;
