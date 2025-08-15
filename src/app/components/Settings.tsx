"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { TimerSettings } from "../hooks/useTimer"

interface SettingsProps {
  settings: TimerSettings
  onSave: (settings: TimerSettings) => void
  onClose: () => void
}

export default function Settings({ settings, onSave, onClose }: SettingsProps) {
  const [workMinutes, setWorkMinutes] = useState(Math.floor(settings.workTime / 60))
  const [shortBreakMinutes, setShortBreakMinutes] = useState(Math.floor(settings.shortBreakTime / 60))
  const [longBreakMinutes, setLongBreakMinutes] = useState(Math.floor(settings.longBreakTime / 60))
  const [longBreakInterval, setLongBreakInterval] = useState(settings.longBreakInterval)

  const handleSave = () => {
    onSave({
      workTime: workMinutes * 60,
      shortBreakTime: shortBreakMinutes * 60,
      longBreakTime: longBreakMinutes * 60,
      longBreakInterval,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Work Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Work Time (minutes)</label>
            <input
              type="number"
              min="1"
              max="60"
              value={workMinutes}
              onChange={(e) => setWorkMinutes(Number.parseInt(e.target.value) || 25)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          {/* Short Break Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Short Break (minutes)</label>
            <input
              type="number"
              min="1"
              max="30"
              value={shortBreakMinutes}
              onChange={(e) => setShortBreakMinutes(Number.parseInt(e.target.value) || 5)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Long Break Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Long Break (minutes)</label>
            <input
              type="number"
              min="1"
              max="60"
              value={longBreakMinutes}
              onChange={(e) => setLongBreakMinutes(Number.parseInt(e.target.value) || 15)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Long Break Interval */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Long Break Interval (sessions)</label>
            <input
              type="number"
              min="2"
              max="10"
              value={longBreakInterval}
              onChange={(e) => setLongBreakInterval(Number.parseInt(e.target.value) || 4)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex space-x-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
