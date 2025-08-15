"use client"

import { Play, Pause, RotateCcw, Settings } from "lucide-react"

interface ControlsProps {
  isRunning: boolean
  onStart: () => void
  onPause: () => void
  onReset: () => void
  onSettings: () => void
}

export default function Controls({ isRunning, onStart, onPause, onReset, onSettings }: ControlsProps) {
  return (
    <div className="flex justify-center space-x-4">
      {/* Play/Pause Button */}
      <button
        onClick={isRunning ? onPause : onStart}
        className={`flex items-center justify-center w-16 h-16 rounded-full text-white font-semibold transition-all transform hover:scale-105 ${
          isRunning
            ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
            : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
        }`}
      >
        {isRunning ? <Pause size={24} /> : <Play size={24} />}
      </button>

      {/* Reset Button */}
      <button
        onClick={onReset}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition-all transform hover:scale-105"
      >
        <RotateCcw size={20} />
      </button>

      {/* Settings Button */}
      <button
        onClick={onSettings}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition-all transform hover:scale-105"
      >
        <Settings size={20} />
      </button>
    </div>
  )
}
