import { useState } from "react";
import JobCard from "@/components/JobCard";
import ResumeUpload from "@/components/ResumeUpload";
import { calculateMatch, mockJobs, type Job } from "@/lib/matchingAlgorithm";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { generateBootstrapHtml, downloadHtmlFile } from "@/lib/exportUtils";
import { Download } from "lucide-react";

const Index = () => {
  const [matches, setMatches] = useState<Array<{ job: Job; match: number }>>([]);
  const [resumeText, setResumeText] = useState("");
  const { toast } = useToast();

  const handleResumeSubmit = (text: string) => {
    if (text.trim().length < 50) {
      toast({
        title: "Resume too short",
        description: "Please provide more details in your resume for better matching.",
        variant: "destructive",
      });
      return;
    }

    setResumeText(text);
    const jobMatches = mockJobs
      .map((job) => ({
        job,
        match: calculateMatch(text, job),
      }))
      .sort((a, b) => b.match - a.match);

    setMatches(jobMatches);

    toast({
      title: "Resume analyzed!",
      description: "We've found some matching jobs for you.",
    });
  };

  const handleExport = () => {
    if (matches.length === 0) {
      toast({
        title: "No matches to export",
        description: "Please upload your resume first to find matching jobs.",
        variant: "destructive",
      });
      return;
    }

    const htmlContent = generateBootstrapHtml(matches, resumeText);
    downloadHtmlFile(htmlContent);

    toast({
      title: "Export successful",
      description: "Your job matches have been exported to HTML.",
    });
  };

  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-primary">Resume Job Matcher</h1>
          <p className="text-muted">
            Find the perfect job match for your skills and experience
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <ResumeUpload onResumeSubmit={handleResumeSubmit} />

            {matches.length > 0 && (
              <div className="mt-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2 className="h3 mb-0">Matching Jobs</h2>
                  <Button onClick={handleExport} className="d-flex align-items-center gap-2">
                    <Download className="w-4 h-4" />
                    Export to HTML
                  </Button>
                </div>
                <div className="d-flex flex-column gap-4">
                  {matches.map(({ job, match }) => (
                    <JobCard key={job.id} job={job} matchPercentage={match} />
                  ))}
                </div>
              </div>
            )}

            {matches.length === 0 && (
              <div className="mt-5">
                <h2 className="h3 mb-4">Available Jobs</h2>
                <div className="d-flex flex-column gap-4">
                  {mockJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;