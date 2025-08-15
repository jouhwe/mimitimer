"use client"

interface SessionInfoProps {
  completedSessions: number
  longBreakInterval: number
}

export default function SessionInfo({ completedSessions, longBreakInterval }: SessionInfoProps) {
  const sessionsUntilLongBreak = longBreakInterval - (completedSessions % longBreakInterval)

  return (
    <div className="mb-6 space-y-2">
      <div className="text-sm text-gray-600">
        Completed Sessions: <span className="font-semibold text-gray-800">{completedSessions}</span>
      </div>
      <div className="text-sm text-gray-600">
        Sessions until long break:{" "}
        <span className="font-semibold text-gray-800">
          {sessionsUntilLongBreak === longBreakInterval ? longBreakInterval : sessionsUntilLongBreak}
        </span>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center space-x-2 mt-3">
        {Array.from({ length: longBreakInterval }).map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index < (completedSessions % longBreakInterval) ? "bg-red-500" : "bg-gray-200"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
