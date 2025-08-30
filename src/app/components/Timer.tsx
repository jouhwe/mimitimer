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
  const getPointerRotation = () => {
    let totalTime : number 
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
    const progressAngle = ((totalTime - timer.timeLeft) / totalTime * 360)
    return progressAngle 
  }

  const generateTickMarks = () => {
    let totalMinutes : number 
    switch (timer.mode) {
      case "work":
        totalMinutes = timer.settings.workTime / 60
        break
      case "shortBreak":
        totalMinutes = timer.settings.shortBreakTime / 60
        break
      case "longBreak":
        totalMinutes = timer.settings.longBreakTime / 60
        break
      default:
        totalMinutes = timer.settings.workTime / 60
    }
    const ticks = []
    const totalTicks = 60

    for (let i = 0; i < totalTicks; i++) {
      const angle = (i/totalTicks) * 360 - 90
      const minuteValue = (totalMinutes * i) / totalTicks
      const displayValue = Math.round(totalMinutes - minuteValue)

      const isMainTick = i % 5 === 0

      const showNumber = false

      ticks.push(
        <g key={i}>
          <line
          x1="50"
          y1={ isMainTick ? "8" : "10"}
          x2="50"
          y2={ isMainTick ? "15" : "12"}
          stroke="white"
          strokeWidth={ isMainTick ? "1.5" : "0.8"}
          transform={`rotate(${angle} 50 50)`}
          />

          {showNumber && (
            <text
            x="50"
            y="22"
            fill="white"
            fontSize="4"
            fontWeight="bold"
            textAnchor="middle"
            dominantBaseline="middle"
            transform={`rotate(${angle} 50 50) rotate(${-angle} 50 22)`}>
              {displayValue}

            </text>
          )}
        </g>
      )
    }
    return ticks 
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
      {/* Mode Indicator */}
      <div
        className={`inline-block px-6 py-2 rounded-full text-white font-semibold mb-6 bg-gradient-to-r ${getModeColor()}`}
      >
        {getModeText()}
      </div>

      {/* Tomato Timer Display */}
      <div className="relative mb-8">
        <div className="w-64 h-64 mx-auto relative">
          {/*Tomato Stem*/}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-10">
            <svg width="60" height="40" viewBox="0 0 60 40">
              {/*Tomato leaves*/}
              <path
                d="M15 35 Q10 25 5 15 Q8 10 15 12 Q20 8 25 12 Q30 8 35 12 Q40 8 45 12 Q50 10 55 15 Q50 25 45 35 Q40 30 35 28 Q30 32 25 28 Q20 32 15 35"
                fill="#22c55e"
                stroke="#16a34a"
                strokeWidth="1"
              />
              <path d="M20 30 Q25 20 30 25 Q35 20 40 30" fill="none" stroke="#16a34a"
              strokeWidth="1.5"/>
            </svg>
          </div>

        {/*Main Tomato Timer Circle with Analog Timer*/}
        <div className="relative w-full h-full">
         <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Tomato Shadow/depth */}
          <circle cx="52" cy="52" r="45" fill="#dc2626" opacity="0.3"/>
          
          {/* Main Tomato Body */}
          <circle cx="50" cy="50" r="45" fill="url(#tomatoGradient)" stroke="#dc2626"
          strokeWidth="2"/>

          {/* Tomato Highlight */}
          <ellipse cx="42" cy="40" rx="8" ry="12" fill="rgba(255,255,255,0.3)"/>

           {/* Progress Ring */}
           <circle
              cx="50"
              cy="50"
              r="42"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress() / 100)}`}
              className="transition-all duration-300 ease-out"
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
            {generateTickMarks()}

            {/* Center Triangle */}
            <polygon
            points="50,18 47,25 53,25"
            fill="white"
            stroke="#dc2626"
            strokeWidth="1"
            transform={`rotate(${getPointerRotation()} 50 50)`}
            className="transition-transform duration-300 ease-out"
          />

          {/* Gradient Definition */}
          <defs>
            <radialGradient id="tomatoGradient" cx="0.3" cy="0.3">
              <stop offset="0%" stopColor="#ef4444"/>
              <stop offset="100%" stopColor="#dc2626"/>
            </radialGradient>
          </defs>
          </svg>
        
        </div>



          {/* Time Display */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-white">{timer.formatTime(timer.timeLeft)}</span>
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
