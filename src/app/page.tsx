import Timer from "./components/Timer"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-red-200 to-orange-200 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        {Array.from({ length: 12 }).map((_, row) => (
          <div key={row}>
            {Array.from({ length: 30 }).map((_, col) => {
              const paw = row % 2 === 0 ? (col + 1) % 2 === 1 : (col + 1) % 2 === 0

              if (!paw) return null

              return (
                <div
                  key={`${row}-${col}`}
                  className="absolute text-2xl"
                  style={{
                    top: `${row * 80 + 40}px`,
                    left: `${col * 80 + 40}px`,
                    transform: "rotate(30deg)",
                  }}
                >
                  🐾
                </div>
              )
            })}
          </div>
        ))}
      </div>

      <div className="w-full max-w-lg relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-700 mb-2">🍅 Pomodoro Timer</h1>
          <p className="text-gray-600">Stay focused and productive By Kat, Jo, and Mimi</p>
        </div>
        <Timer />
      </div>
    </main>
  )
}
