"use client"

import { useTimer } from "../hooks/useTimer"
import Controls from "./Controls"
import Settings from "./Settings"
import SessionInfo from "./SessionInfo"
import { useState } from "react"

export default function Timer() {
  const timer = useTimer()
  const [showSettings, setShowSettings] = useState(false)

  const getModeColor = () => {
    switch (timer.mode) {
      case "work":
        return "from-red-500 to-red-600"
      case "shortBreak":
        return "from-green-500 to-green-600"
      case "longBreak":
        return "from-blue-500 to-blue-600"
      default:
        return "from-red-500 to-red-600"
    }
  }

  const getModeText = () => {
    switch (timer.mode) {
      case "work":
        return "Work Time"
      case "shortBreak":
        return "Short Break"
      case "longBreak":
        return "Long Break"
      default:
        return "Work Time"
    }
  }

  const progress = () => {
    let totalTime: number
    switch (timer.mode) {
      case "work":
        totalTime = timer.settings.workTime
        break
      case "shortBreak":
        totalTime = timer.settings.shortBreakTime
        break
      case "longBreak":
        totalTime = timer.settings.longBreakTime
        break
      default:
        totalTime = timer.settings.workTime
    }
    return ((totalTime - timer.timeLeft) / totalTime) * 100
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
      {/* Mode Indicator */}
      <div
        className={`inline-block px-6 py-2 rounded-full text-white font-semibold mb-6 bg-gradient-to-r ${getModeColor()}`}
      >
        {getModeText()}
      </div>

      {/* Timer Display */}
      <div className="relative mb-8">
        <div className="w-64 h-64 mx-auto relative">
          {/* Progress Ring */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-gray-200"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress() / 100)}`}
              className={`text-red-500 transition-all duration-1000 ease-linear ${
                timer.mode === "shortBreak"
                  ? "text-green-500"
                  : timer.mode === "longBreak"
                    ? "text-blue-500"
                    : "text-red-500"
              }`}
              strokeLinecap="round"
            />
          </svg>

          {/* Time Display */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl font-bold text-gray-800">{timer.formatTime(timer.timeLeft)}</span>
          </div>
        </div>
      </div>

      {/* Session Info */}
      <SessionInfo completedSessions={timer.completedSessions} longBreakInterval={timer.settings.longBreakInterval} />

      {/* Controls */}
      <Controls
        isRunning={timer.isRunning}
        onStart={timer.startTimer}
        onPause={timer.pauseTimer}
        onReset={timer.resetTimer}
        onSettings={() => setShowSettings(true)}
      />

      {/* Mode Switcher */}
      <div className="flex justify-center space-x-2 mt-6">
        <button
          onClick={() => timer.switchMode("work")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            timer.mode === "work" ? "bg-red-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Work
        </button>
        <button
          onClick={() => timer.switchMode("shortBreak")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            timer.mode === "shortBreak" ? "bg-green-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Short Break
        </button>
        <button
          onClick={() => timer.switchMode("longBreak")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            timer.mode === "longBreak" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Long Break
        </button>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <Settings settings={timer.settings} onSave={timer.setSettings} onClose={() => setShowSettings(false)} />
      )}
    </div>
  )
}
