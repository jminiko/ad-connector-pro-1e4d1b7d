import { Job } from "@/lib/matchingAlgorithm";

interface JobCardProps {
  job: Job;
  matchPercentage?: number;
}

const JobCard = ({ job, matchPercentage }: JobCardProps) => {
  return (
    <div className="card shadow-sm">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h3 className="h5 mb-0 text-primary">{job.title}</h3>
        {matchPercentage !== undefined && (
          <span className="badge bg-secondary fs-6">
            {matchPercentage}% Match
          </span>
        )}
      </div>
      <div className="card-body">
        <div className="mb-3">
          <div className="d-flex justify-content-between">
            <span className="fw-medium">{job.company}</span>
            <span className="text-muted">{job.location}</span>
          </div>
          <p className="text-muted mt-2">{job.description}</p>
          <div className="d-flex flex-wrap gap-2 mb-3">
            {job.requirements.map((req, index) => (
              <span key={index} className="badge bg-light text-dark">
                {req}
              </span>
            ))}
          </div>
          <div className="text-end fw-bold text-primary">
            {job.salary}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;