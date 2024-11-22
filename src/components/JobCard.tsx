import { Job } from "@/lib/matchingAlgorithm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface JobCardProps {
  job: Job;
  matchPercentage?: number;
}

const JobCard = ({ job, matchPercentage }: JobCardProps) => {
  return (
    <Card className="w-full transition-all hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold text-primary">{job.title}</CardTitle>
        {matchPercentage !== undefined && (
          <Badge variant="secondary" className="text-lg">
            {matchPercentage}% Match
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium">{job.company}</span>
            <span className="text-muted-foreground">{job.location}</span>
          </div>
          <p className="text-muted-foreground">{job.description}</p>
          <div className="flex flex-wrap gap-2">
            {job.requirements.map((req, index) => (
              <Badge key={index} variant="outline">
                {req}
              </Badge>
            ))}
          </div>
          <div className="text-right text-primary font-semibold">
            {job.salary}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;