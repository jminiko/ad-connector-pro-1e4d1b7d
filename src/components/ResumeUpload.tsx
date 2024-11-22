import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Upload Your Resume</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Paste your resume text here..."
            className="min-h-[200px]"
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
          />
          <Button type="submit" className="w-full">
            Find Matching Jobs
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ResumeUpload;