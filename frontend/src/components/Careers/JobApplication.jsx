const API_URL = process.env.NEXT_PUBLIC_WP_API; // e.g., http://weboincms.local/wp-json/wp/v2

export default async function CareersPage() {
  const res = await fetch(`${API_URL}/jobs`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch jobs");

  const jobs = await res.json();

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Careers / Job Openings</h1>
      <div
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        }}
      >
        {jobs.map((job) => (
          <div
            key={job.id}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              borderRadius: "8px",
            }}
          >
            {/* Job Title */}
            <h2 dangerouslySetInnerHTML={{ __html: job.title.rendered }} />

            {/* ACF Fields */}
            <p>
              <strong>First Name:</strong> {job.acf?.first_name || "N/A"}
            </p>
            <p>
              <strong>Last Name:</strong> {job.acf?.last_name || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {job.acf?.email || "N/A"}
            </p>
            <p>
              <strong>Phone Number:</strong> {job.acf?.phone_number || "N/A"}
            </p>
            <p>
              <strong>Year of Graduation:</strong>{" "}
              {job.acf?.year_of_graduation || "N/A"}
            </p>
            <p>
              <strong>Gender:</strong> {job.acf?.gender || "N/A"}
            </p>
            <p>
              <strong>Experience:</strong> {job.acf?.experience || "N/A"}
            </p>

            {/* Content fallback */}
            <div
              dangerouslySetInnerHTML={{
                __html: job.content.rendered || "",
              }}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
