import React from "react"
import { useAppSelector, useAppDispatch } from "../../app/hooks"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons"

import {
  getTimerSessionLength,
  incrementSessionLength,
  decrementSessionLength,
} from "./timerSlice"

function SessionControl(props: any) {
  const dispatch = useAppDispatch()
  let sessionLength = useAppSelector(getTimerSessionLength)

  return (
    <div className="text-center">
      <div id="session-label">Session Length</div>

      <button
        id="session-decrement"
        className="btn border-0 bg-transparent me-2"
        value="-"
      >
        <FontAwesomeIcon
          icon={faMinus}
          size="lg"
          onClick={() => dispatch(decrementSessionLength())}
        />
      </button>
      <div id="session-length" className="d-inline-block me-2">
        {sessionLength}
      </div>
      <button
        id="session-increment"
        className="btn border-0 bg-transparent"
        value="+"
        onClick={() => dispatch(incrementSessionLength())}
      >
        <FontAwesomeIcon icon={faPlus} size="lg" />
      </button>
    </div>
  )
}

export default SessionControl
