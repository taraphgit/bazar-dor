export default function CategoryLoading() {
  return (
    <main className="min-h-screen animate-pulse bg-gray-50">
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-6 h-4 w-32 rounded bg-gray-200" />
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-gray-200" />
            <div>
              <div className="mb-3 h-7 w-36 rounded bg-gray-200" />
              <div className="h-4 w-56 rounded bg-gray-100" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between">
          <div className="h-6 w-40 rounded bg-gray-200" />
          <div className="h-10 w-48 rounded-lg bg-gray-200" />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="rounded-2xl border border-gray-100 bg-white p-5">
              <div className="mb-5 h-32 rounded-xl bg-gray-100" />
              <div className="mb-3 h-5 w-3/4 rounded bg-gray-200" />
              <div className="mb-5 h-4 w-1/2 rounded bg-gray-100" />
              <div className="h-9 rounded-lg bg-gray-100" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}