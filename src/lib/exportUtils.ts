export const generateBootstrapHtml = (matches: Array<{ job: any; match: number }>, resumeText: string) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Job Matches Export</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container py-5">
        <h1 class="mb-4">Resume Job Matches</h1>
        
        <div class="card mb-4">
            <div class="card-header">
                <h2 class="h5 mb-0">Your Resume</h2>
            </div>
            <div class="card-body">
                <pre class="mb-0">${resumeText}</pre>
            </div>
        </div>

        <h2 class="h3 mb-4">Matching Jobs</h2>
        ${matches
          .map(
            ({ job, match }) => `
            <div class="card mb-3">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h3 class="h5 mb-0">${job.title}</h3>
                    <span class="badge bg-primary">${match}% Match</span>
                </div>
                <div class="card-body">
                    <div class="d-flex justify-content-between mb-3">
                        <strong>${job.company}</strong>
                        <span class="text-muted">${job.location}</span>
                    </div>
                    <p>${job.description}</p>
                    <div class="mb-3">
                        ${job.requirements
                          .map((req: string) => `<span class="badge bg-secondary me-2">${req}</span>`)
                          .join("")}
                    </div>
                    <div class="text-end">
                        <strong>${job.salary}</strong>
                    </div>
                </div>
            </div>`
          )
          .join("")}
    </div>
</body>
</html>`;
};

export const downloadHtmlFile = (htmlContent: string) => {
  const blob = new Blob([htmlContent], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "job-matches.html";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};