export default function Loading() {
  return (
    <main className="container" style={{ padding: "50px 0" }}>
      <div className="skeleton" style={{ height: "42px", width: "45%", marginBottom: "20px" }} />
      <div className="skeleton" style={{ height: "18px", width: "70%", marginBottom: "35px" }} />
      <div className="product-grid">
        {Array.from({ length: 8 }).map((_, index) => (
          <div className="skeleton" key={index} style={{ height: "260px", borderRadius: "14px" }} />
        ))}
      </div>
    </main>
  );
}