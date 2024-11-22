import { useState } from "react";
import JobCard from "@/components/JobCard";
import ResumeUpload from "@/components/ResumeUpload";
import { calculateMatch, mockJobs, type Job } from "@/lib/matchingAlgorithm";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [matches, setMatches] = useState<Array<{ job: Job; match: number }>>([]);
  const { toast } = useToast();

  const handleResumeSubmit = (resumeText: string) => {
    if (resumeText.trim().length < 50) {
      toast({
        title: "Resume too short",
        description: "Please provide more details in your resume for better matching.",
        variant: "destructive",
      });
      return;
    }

    const jobMatches = mockJobs.map(job => ({
      job,
      match: calculateMatch(resumeText, job)
    })).sort((a, b) => b.match - a.match);

    setMatches(jobMatches);
    
    toast({
      title: "Resume analyzed!",
      description: "We've found some matching jobs for you.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-primary">Resume Job Matcher</h1>
          <p className="text-muted-foreground">
            Find the perfect job match for your skills and experience
          </p>
        </div>

        <ResumeUpload onResumeSubmit={handleResumeSubmit} />

        {matches.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Matching Jobs</h2>
            <div className="space-y-4">
              {matches.map(({ job, match }) => (
                <JobCard key={job.id} job={job} matchPercentage={match} />
              ))}
            </div>
          </div>
        )}

        {matches.length === 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Available Jobs</h2>
            <div className="space-y-4">
              {mockJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;