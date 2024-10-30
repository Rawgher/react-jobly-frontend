import { useContext } from "react";
import userContext from "../helpers/userContext";
import JoblyApi from "../helpers/api";
import "./JobCard.css";

function JobCard({ data }) {
  const { currentUser, setCurrentUser } = useContext(userContext);

  // apply to this job on this user
  const apply = async () => {
    const { username } = currentUser;
    const appliedJob = await JoblyApi.applyToJob(data.id, username);
    currentUser.applications.add(appliedJob);
    setCurrentUser((currentUser) => ({ ...currentUser }));
  };

  return (
    <div className="JobCard">
      <div className="JobCard-body" key={data.id}>
        <h3>{data.title}</h3>
        <p>{data.salary}</p>
        <p>{data.equity}</p>
        {currentUser.applications.has(data.id) ? (
          <button disabled className="JobCard-applied">
            Applied
          </button>
        ) : (
          <button onClick={apply} className="JobCard-apply">
            Apply
          </button>
        )}
      </div>
    </div>
  );
}

export default JobCard;
