export default function Loading() {
  return (
    <div className="min-h-screen bg-parchment">
      {/* header fantasma */}
      <div className="h-20 border-b border-ink/10" />

      {/* hero fantasma */}
      <div className="flex flex-col items-center pt-24 pb-28 px-5">
        <div className="w-28 h-28 rounded-full bg-ink/5 animate-pulse mb-8" />
        <div className="h-4 w-40 bg-ink/10 rounded-full animate-pulse mb-6" />
        <div className="h-10 w-72 bg-ink/10 rounded-full animate-pulse mb-3" />
        <div className="h-10 w-56 bg-ink/10 rounded-full animate-pulse" />
      </div>

      {/* catálogo fantasma */}
      <div className="max-w-6xl mx-auto px-5 md:px-8 pb-24">
        <div className="h-3 w-24 bg-ink/10 rounded-full animate-pulse mb-8" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-xl overflow-hidden border border-ink/10">
              <div className="aspect-square bg-ink/5 animate-pulse" />
              <div className="p-4 space-y-2">
                <div className="h-3 w-1/2 bg-ink/10 rounded-full animate-pulse" />
                <div className="h-4 w-3/4 bg-ink/10 rounded-full animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
