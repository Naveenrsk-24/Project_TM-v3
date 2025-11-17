export const metadata = {
  title: "Website Under Construction | TM Studios",
  description: "TM Studios Photography — New website launching soon.",
  robots: "noindex, nofollow",
};

export default function ComingSoon() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "2rem",
        background: "#f8f8f8",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
        🚧 Website Under Construction
      </h1>
      <p style={{ fontSize: "1.2rem", color: "#555" }}>
        We’re working on something amazing. Please check back soon.
      </p>
    </div>
  );
}
