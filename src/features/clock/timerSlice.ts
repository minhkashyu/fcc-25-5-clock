import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

export const timerType = {
  session: "session",
  break: "break",
}

export const timerStatus = {
  playing: "playing",
  paused: "paused",
}

// User Story #8: I can see an element with corresponding id="time-left". NOTE:
// Paused or running, the value in this field should always be displayed in
// mm:ss format (i.e. 25:00).
const displayCountdown = (timeLeft: number) => {
  if (timeLeft === 3600) {
    return "60:00"
  }

  let minutes = Math.floor((timeLeft % (60 * 60)) / 60)
  let seconds = Math.floor(timeLeft % 60)

  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`
}

export interface TimerState {
  sessionLength: number
  breakLength: number
  status: string
  type: string
  timeLeft: number
  timeOutput: string
}

export const initialState: TimerState = {
  // User Story #6: I can see an element with a corresponding id="session-length",
  // which by default displays a value of 25.
  sessionLength: 25,
  // User Story #5: I can see an element with a corresponding id="break-length",
  // which by default (on load) displays a value of 5.
  breakLength: 5,
  status: timerStatus.paused,
  type: timerType.session,
  timeLeft: 25 * 60,
  timeOutput: displayCountdown(25 * 60),
}

const resetTimerLength = (state: TimerState, type: string) => {
  if (state.type !== type) {
    return state
  }

  state.timeLeft =
    type === timerType.session
      ? state.sessionLength * 60
      : state.breakLength * 60
  state.timeOutput = displayCountdown(state.timeLeft)

  return state
}

export const toggleAudio = (status: string) => {
  const elAudio = document.getElementById("beep")
  if (elAudio) {
    if (status === timerStatus.playing) {
      // User Story #28: The audio element with id of beep must stop playing and be rewound
      // to the beginning when the element with the id of reset is clicked.
      // @ts-ignore
      elAudio.pause()
      // @ts-ignore
      elAudio.currentTime = 0
    } else {
      // @ts-ignore
      elAudio.play()
    }
  }
}

export const timerSlice = createSlice({
  name: "audio",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    decrementSessionLength: (state) => {
      if (state.status === timerStatus.playing) {
        return
      }

      // User Story #14: When I click the element with the id of session-decrement, the value
      // within id="session-length" decrements by a value of 1, and I can see the updated value.
      state.sessionLength -= 1

      // User Story #16: I should not be able to set a session or break length to <= 0.
      if (state.sessionLength <= 0) {
        state.sessionLength = 1
      }

      state = resetTimerLength(state, timerType.session)
    },

    incrementSessionLength: (state) => {
      if (state.status === timerStatus.playing) {
        return
      }

      // User Story #15: When I click the element with the id of session-increment, the value
      // within id="session-length" increments by a value of 1, and I can see the updated value.
      state.sessionLength += 1

      // User Story #17: I should not be able to set a session or break length to > 60.
      if (state.sessionLength > 60) {
        state.sessionLength = 60
      }

      state = resetTimerLength(state, timerType.session)
    },

    decrementBreakLength: (state) => {
      if (state.status === timerStatus.playing) {
        return
      }

      // User Story #12: When I click the element with the id of break-decrement, the value
      // within id="break-length" decrements by a value of 1, and I can see the updated value.
      state.breakLength -= 1

      // User Story #16: I should not be able to set a session or break length to <= 0.
      if (state.breakLength <= 0) {
        state.breakLength = 1
      }

      state = resetTimerLength(state, timerType.break)
    },

    incrementBreakLength: (state) => {
      if (state.status === timerStatus.playing) {
        return
      }

      // User Story #13: When I click the element with the id of break-increment, the value
      // within id="break-length" increments by a value of 1, and I can see the updated value.
      state.breakLength += 1

      // User Story #17: I should not be able to set a session or break length to > 60.
      if (state.breakLength > 60) {
        state.breakLength = 60
      }

      state = resetTimerLength(state, timerType.break)
    },

    resetTimer: (state) => {
      // User Story #11: When I click the element with the id of reset, any running timer
      // should be stopped, the value within id="break-length" should return to 5, the value
      // within id="session-length" should return to 25, and the element with id="time-left"
      // should reset to its default state.
      state.sessionLength = 25
      state.breakLength = 5
      state.status = timerStatus.paused
      state.type = timerType.session
      state.timeLeft = state.sessionLength * 60
      state.timeOutput = displayCountdown(state.timeLeft)
      toggleAudio(timerStatus.playing)
    },

    toggleTimer: (state) => {
      if (state.status === timerStatus.paused) {
        state.status = timerStatus.playing
      } else {
        state.status = timerStatus.paused
        toggleAudio(timerStatus.playing)
      }
    },

    countdown: (state) => {
      // User Story #20: If the timer is running and I click the element with id="start_stop",
      // the countdown should pause.

      // User Story #21: If the timer is paused and I click the element with id="start_stop",
      // the countdown should resume running from the point at which it was paused.
      if (state.status === timerStatus.paused) {
        return
      }

      // User Story #18: When I first click the element with id="start_stop", the timer should
      // begin running from the value currently displayed in id="session-length", even if
      // the value has been incremented or decremented from the original value of 25.

      // User Story #19: If the timer is running, the element with the id of time-left should
      // display the remaining time in mm:ss format (decrementing by a value of 1 and updating
      // the display every 1000ms).
      state.timeLeft -= 1

      if (state.timeLeft === 0) {
        toggleAudio(timerStatus.paused)
      }

      // User Story #22: When a session countdown reaches zero (NOTE: timer MUST reach 00:00),
      // and a new countdown begins, the element with the id of timer-label should display
      // a string indicating a break has begun.

      // User Story #23: When a session countdown reaches zero (NOTE: timer MUST reach 00:00),
      // a new break countdown should begin, counting down from the value currently displayed
      // in the id="break-length" element.

      // User Story #24: When a break countdown reaches zero (NOTE: timer MUST reach 00:00),
      // and a new countdown begins, the element with the id of timer-label should display
      // a string indicating a session has begun.

      // User Story #25: When a break countdown reaches zero (NOTE: timer MUST reach 00:00),
      // a new session countdown should begin, counting down from the value currently displayed
      // in the id="session-length" element.
      if (state.timeLeft < 0) {
        if (state.type === timerType.session) {
          state.type = timerType.break
          state.timeLeft = state.breakLength * 60
        } else {
          state.type = timerType.session
          state.timeLeft = state.sessionLength * 60
        }
      }
      state.timeOutput = displayCountdown(state.timeLeft)
    },

    template: (state, action: PayloadAction<TimerState["breakLength"]>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {},
})

export const {
  decrementSessionLength,
  incrementSessionLength,
  decrementBreakLength,
  incrementBreakLength,
  resetTimer,
  toggleTimer,
  countdown,
} = timerSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getTimerSessionLength = (state: RootState) =>
  state.timer.sessionLength
export const getTimerBreakLength = (state: RootState) => state.timer.breakLength
export const getTimerStatus = (state: RootState) => state.timer.status
export const getTimerType = (state: RootState) => state.timer.type
export const getTimerTimeLeft = (state: RootState) => state.timer.timeLeft
export const getTimerCountdown = (state: RootState) => state.timer.timeOutput
export const getTimerCountdownType = (state: RootState) =>
  state.timer.type === timerType.session ? "Session" : "Break"

export default timerSlice.reducer
