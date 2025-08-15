import Timer from "./components/Timer"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Pomodoro Timer</h1>
          <p className="text-gray-600">Timer to stay productive by Kat, Jo, and Mimi</p>
        </div>
        <Timer />
      </div>
    </main>
  )
}
