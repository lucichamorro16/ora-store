export default function Loading() {
  return (
    <div className="min-h-screen bg-parchment">
      <div className="h-20 border-b border-ink/10" />
      <div className="max-w-5xl mx-auto px-5 md:px-8 py-10 md:py-16">
        <div className="h-3 w-40 bg-ink/10 rounded-full animate-pulse mb-6" />
        <div className="grid md:grid-cols-2 gap-10 md:gap-14">
          <div className="aspect-square rounded-xl bg-ink/5 animate-pulse" />
          <div className="space-y-4">
            <div className="h-3 w-20 bg-ink/10 rounded-full animate-pulse" />
            <div className="h-8 w-3/4 bg-ink/10 rounded-full animate-pulse" />
            <div className="h-6 w-24 bg-ink/10 rounded-full animate-pulse" />
            <div className="h-3 w-full bg-ink/10 rounded-full animate-pulse" />
            <div className="h-3 w-2/3 bg-ink/10 rounded-full animate-pulse" />
            <div className="h-12 w-full bg-ink/10 rounded-full animate-pulse mt-6" />
          </div>
        </div>
      </div>
    </div>
  );
}
