export interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  requirements: string[];
  location: string;
  salary: string;
}

export const calculateMatch = (resumeText: string, job: Job): number => {
  const resumeWords = resumeText.toLowerCase().split(/\W+/);
  const jobWords = [...job.requirements, job.description]
    .join(" ")
    .toLowerCase()
    .split(/\W+/);

  const matchingWords = resumeWords.filter(word => 
    jobWords.includes(word) && word.length > 3
  );

  return Math.min(100, Math.round((matchingWords.length / jobWords.length) * 100));
};

export const mockJobs: Job[] = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "TechCorp",
    description: "We are looking for a skilled Frontend Developer to join our team.",
    requirements: ["React", "TypeScript", "CSS", "HTML", "JavaScript"],
    location: "Remote",
    salary: "$80,000 - $120,000"
  },
  {
    id: "2",
    title: "Full Stack Engineer",
    company: "Innovation Labs",
    description: "Join our dynamic team as a Full Stack Engineer.",
    requirements: ["Node.js", "React", "MongoDB", "AWS", "TypeScript"],
    location: "New York, NY",
    salary: "$100,000 - $150,000"
  },
  {
    id: "3",
    title: "UI/UX Developer",
    company: "Design Masters",
    description: "Create beautiful and functional user interfaces.",
    requirements: ["Figma", "React", "CSS", "User Experience", "Design Systems"],
    location: "San Francisco, CA",
    salary: "$90,000 - $130,000"
  }
];