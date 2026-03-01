export default function AppLoading() {
  return (
    <div className="mx-auto max-w-6xl animate-pulse">
      <div className="bg-base-300 mb-6 h-9 w-48 rounded-lg" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="rounded-box bg-base-300 h-28" />
        ))}
      </div>
    </div>
  )
}
