export default function AppLoading() {
  return (
    <div className="mx-auto max-w-6xl animate-pulse">
      <div className="mb-6 h-9 w-48 rounded-lg bg-base-300" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="h-28 rounded-box bg-base-300" />
        ))}
      </div>
    </div>
  )
}
