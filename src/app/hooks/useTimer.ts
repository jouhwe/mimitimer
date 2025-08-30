"use client"

import { useState, useEffect, useCallback } from "react"

export type TimerMode = "work" | "shortBreak" | "longBreak"

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}


export interface TimerSettings {
  workTime: number
  shortBreakTime: number
  longBreakTime: number
  longBreakInterval: number
}

export function useTimer() {
  const [settings, setSettings] = useState<TimerSettings>({
    workTime: 25 * 60, // 25 minutes in seconds
    shortBreakTime: 5 * 60, // 5 minutes in seconds
    longBreakTime: 15 * 60, // 15 minutes in seconds
    longBreakInterval: 4, // Long break every 4 work sessions
  })

  const [mode, setMode] = useState<TimerMode>("work")
  const [timeLeft, setTimeLeft] = useState(settings.workTime)
  const [isRunning, setIsRunning] = useState(false)
  const [completedSessions, setCompletedSessions] = useState(0)

  // Update timeLeft when settings change
  useEffect(() => {
    if (!isRunning) {
      switch (mode) {
        case "work":
          setTimeLeft(settings.workTime)
          break
        case "shortBreak":
          setTimeLeft(settings.shortBreakTime)
          break
        case "longBreak":
          setTimeLeft(settings.longBreakTime)
          break
      }
    }
  }, [settings, mode, isRunning])

  // Timer countdown logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      // Timer finished
      setIsRunning(false)

      if (mode === "work") {
        const newCompletedSessions = completedSessions + 1
        setCompletedSessions(newCompletedSessions)

        // Determine next mode
        if (newCompletedSessions % settings.longBreakInterval === 0) {
          setMode("longBreak")
          setTimeLeft(settings.longBreakTime)
        } else {
          setMode("shortBreak")
          setTimeLeft(settings.shortBreakTime)
        }
      } else {
        // Break finished, back to work
        setMode("work")
        setTimeLeft(settings.workTime)
      }

      // Play notification sound
      playNotificationSound()
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, timeLeft, mode, completedSessions, settings])

  const playNotificationSound = () => {
    // Create a simple beep sound
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const createBirdChirp = (startTime: number, frequency: number, duration: number) => {
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.setValueAtTime(frequency, startTime)
    oscillator.frequency.exponentialRampToValueAtTime(frequency * 1.5, startTime + duration * 0.3)
    oscillator.frequency.exponentialRampToValueAtTime(frequency * 0.8, startTime + duration * 0.7)
    oscillator.frequency.exponentialRampToValueAtTime(frequency, startTime + duration)
    oscillator.type = "sine"

    gainNode.gain.setValueAtTime(0, startTime)
    gainNode.gain.exponentialRampToValueAtTime(0.3, startTime + 0.01)
    gainNode.gain.exponentialRampToValueAtTime(0.1, startTime + duration * 0.5)
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration)

    oscillator.start(startTime)
    oscillator.stop(startTime + duration)
    }

    const currentTime = audioContext.currentTime
    createBirdChirp(currentTime, 800, 0.15)
    createBirdChirp(currentTime + 0.2, 1000, 0.12)
    createBirdChirp(currentTime + 0.4, 900, 0.18)
    createBirdChirp(currentTime + 0.7, 1100, 0.1)
    
  }

  const startTimer = useCallback(() => {
    setIsRunning(true)
  }, [])

  const pauseTimer = useCallback(() => {
    setIsRunning(false)
  }, [])

  const resetTimer = useCallback(() => {
    setIsRunning(false)
    switch (mode) {
      case "work":
        setTimeLeft(settings.workTime)
        break
      case "shortBreak":
        setTimeLeft(settings.shortBreakTime)
        break
      case "longBreak":
        setTimeLeft(settings.longBreakTime)
        break
    }
  }, [mode, settings])

  const switchMode = useCallback(
    (newMode: TimerMode) => {
      setIsRunning(false)
      setMode(newMode)
      switch (newMode) {
        case "work":
          setTimeLeft(settings.workTime)
          break
        case "shortBreak":
          setTimeLeft(settings.shortBreakTime)
          break
        case "longBreak":
          setTimeLeft(settings.longBreakTime)
          break
      }
    },
    [settings],
  )

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }, [])

  return {
    mode,
    timeLeft,
    isRunning,
    completedSessions,
    settings,
    startTimer,
    pauseTimer,
    resetTimer,
    switchMode,
    formatTime,
    setSettings,
  }
}
