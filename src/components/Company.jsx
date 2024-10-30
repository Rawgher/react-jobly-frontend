import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../helpers/api";
import JobCard from "./JobCard";
import "./Company.css";

function Company() {
  const [companyD, setCompanyD] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { handle } = useParams();

  useEffect(
    function fetchCompaniesWhenMounted() {
      async function fetchCompany() {
        try {
          setCompanyD(await JoblyApi.getCompany(handle));
          setIsLoading(false);
        } catch {
          setIsLoading(false);
          <Navigate to="/companies" />;
        }
      }
      fetchCompany();
    },
    [handle]
  );

  if (isLoading) return <p>Loading company....</p>;

  const { name, description, jobs } = companyD;
  console.log(jobs);
  return (
    <div className="Company">
      <h2>{name}</h2>
      <p>{description}</p>
      {jobs.map(({ id, equity, salary, title }) => (
        <JobCard key={id} data={{ id, equity, salary, title }} />
      ))}
    </div>
  );
}

export default Company;
