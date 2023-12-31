import React from "react"
import { useAppSelector, useAppDispatch } from "../../app/hooks"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay, faPause, faRefresh } from "@fortawesome/free-solid-svg-icons"

import {
  timerStatus,
  timerType,
  getTimerStatus,
  getTimerCountdown,
  getTimerCountdownType,
  toggleTimer,
  resetTimer,
  toggleAudio,
  countdown,
} from "./timerSlice"
import { ThunkDispatch } from "@reduxjs/toolkit"

let timeout: string | number | NodeJS.Timeout | undefined
const startCountdown = (dispatch: any) => {
  timeout = setTimeout(() => {
    dispatch(countdown())
    startCountdown(dispatch)
  }, 1000)
}

const stopCountdown = (dispatch: ThunkDispatch<any, any, any>) => {
  if (timeout) {
    clearTimeout(timeout)
  }

  dispatch(toggleTimer())
}

function StartStopButton(props: any) {
  const dispatch = useAppDispatch()
  const status = useAppSelector(getTimerStatus)

  if (status === timerStatus.playing) {
    return (
      <button
        id="start_stop"
        className="btn border-0 bg-transparent me-2"
        onClick={() => stopCountdown(dispatch)}
      >
        <FontAwesomeIcon icon={faPause} size="lg" />
      </button>
    )
  }

  return (
    <button
      id="start_stop"
      className="btn border-0 bg-transparent me-2"
      onClick={() => {
        dispatch(toggleTimer())
        startCountdown(dispatch)
      }}
    >
      <FontAwesomeIcon icon={faPlay} size="lg" />
    </button>
  )
}

function TimerControl(props: any) {
  const dispatch = useAppDispatch()
  const countdown = useAppSelector(getTimerCountdown)
  const countdownType = useAppSelector(getTimerCountdownType)

  return (
    <div className="text-center">
      <div>
        <div
          className="d-inline-block border border-1 border-secondary bg-dark text-white p-3 rounded-3 my-3"
          style={{ minWidth: 150 }}
        >
          <div id="timer-label" className="h3 mb-2">
            {countdownType}
          </div>
          <div id="time-left" className="h1 mb-0">
            {countdown}
          </div>
        </div>
      </div>

      <StartStopButton />

      <button
        id="reset"
        className="btn border-0 bg-transparent me-2"
        onClick={() => dispatch(resetTimer())}
      >
        <FontAwesomeIcon icon={faRefresh} size="lg" />
      </button>

      <audio
        id="beep"
        src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"
        preload="auto"
        className="d-none"
      ></audio>
    </div>
  )
}

export default TimerControl
