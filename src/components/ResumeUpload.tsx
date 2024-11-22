import { useState } from "react";

interface ResumeUploadProps {
  onResumeSubmit: (text: string) => void;
}

const ResumeUpload = ({ onResumeSubmit }: ResumeUploadProps) => {
  const [resumeText, setResumeText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onResumeSubmit(resumeText);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="h5 mb-0">Upload Your Resume</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Paste your resume text here..."
              style={{ minHeight: "200px" }}
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Find Matching Jobs
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResumeUpload;