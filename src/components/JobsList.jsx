import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import JoblyApi from "../helpers/api";
import SearchInput from "./SearchInput";
import JobCard from "./JobCard";
import "./JobsList.css";

function JobsList() {
  const [jobs, setJobs] = useState(null);
  const [filter, setFilter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const filterFunc = (search) => {
    if (!search) {
      setFilter(null);
      return <Navigate to="/jobs" />;
    } else {
      if (search !== filter) {
        setIsLoading(true);
        setFilter(search);
      }
    }
  };

  useEffect(
    function fetchJobsWhenMounted() {
      async function fetchJobs() {
        try {
          setJobs(await JoblyApi.getJobs({ title: filter }));
          setIsLoading(false);
        } catch {
          setIsLoading(false);
          <Navigate to="/" />;
        }
      }
      fetchJobs();
    },
    [filter]
  );

  if (isLoading) return <p>Loading results....</p>;

  return (
    <div className="JobsList">
      <h2>Here is a list of all jobs in our database</h2>

      <SearchInput filterFunc={filterFunc} search={filter} />

      {jobs.map(({ id, equity, salary, title }) => (
        <JobCard key={id} data={{ id, equity, salary, title }} />
      ))}
    </div>
  );
}

export default JobsList;
