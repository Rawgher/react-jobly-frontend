import { Link } from "react-router-dom";
import "./CompanyCard.css";

function CompanyCard({ companyD }) {
  return (
    <div className="CompanyCard">
      <Link to={`/companies/${companyD.handle}`}>
        <div className="CompanyCard-body" key={companyD.handle}>
          <h3>{companyD.name}</h3>
          <p>{companyD.description}</p>
        </div>
      </Link>
    </div>
  );
}

export default CompanyCard;
