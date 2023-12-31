import React from "react"
import { useAppSelector, useAppDispatch } from "../../app/hooks"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons"

import {
  getTimerBreakLength,
  incrementBreakLength,
  decrementBreakLength,
} from "./timerSlice"

function BreakControl(props: any) {
  const dispatch = useAppDispatch()
  let breakLength = useAppSelector(getTimerBreakLength)

  return (
    <div className="text-warning text-center">
      <div id="break-label">Break Length</div>

      <button
        id="break-decrement"
        className="btn border-0 bg-transparent me-2"
        value="-"
        onClick={() => dispatch(decrementBreakLength())}
      >
        <FontAwesomeIcon icon={faMinus} size="lg" />
      </button>
      <div id="break-length" className="d-inline-block me-2">
        {breakLength}
      </div>
      <button
        id="break-increment"
        className="btn border-0 bg-transparent"
        value="+"
        onClick={() => dispatch(incrementBreakLength())}
      >
        <FontAwesomeIcon icon={faPlus} size="lg" />
      </button>
    </div>
  )
}

export default BreakControl
