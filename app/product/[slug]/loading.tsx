export default function Loading() {
  return (
    <div className="container product-details-page">
      <div className="skeleton skeleton-breadcrumb"></div>

      <section className="details-main">
        <div className="skeleton skeleton-visual"></div>

        <div className="skeleton-content">
          <div className="skeleton skeleton-line"></div>
          <div className="skeleton skeleton-title"></div>
          <div className="skeleton skeleton-line"></div>
          <div className="skeleton skeleton-price"></div>
        </div>
      </section>

      <div className="skeleton skeleton-section"></div>
      <div className="skeleton skeleton-section"></div>
    </div>
  );
}