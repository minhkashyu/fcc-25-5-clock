import timerReducer, {
  timerType,
  timerStatus,
  initialState,
  decrementSessionLength,
  incrementSessionLength,
  decrementBreakLength,
  incrementBreakLength,
  resetTimer,
  toggleTimer,
  countdown,
} from "./timerSlice"

describe("audio reducer", () => {
  it("should handle initial state", () => {
    expect(timerReducer(undefined, { type: "unknown" })).toEqual(initialState)
  })

  it("should handle decrementSessionLength", () => {
    const actual = timerReducer(initialState, decrementSessionLength())
    expect(actual.sessionLength).toEqual(24)
  })

  it("should handle incrementSessionLength", () => {
    const actual = timerReducer(initialState, incrementSessionLength())
    expect(actual.sessionLength).toEqual(26)
  })

  it("should handle decrementBreakLength", () => {
    const actual = timerReducer(initialState, decrementBreakLength())
    expect(actual.breakLength).toEqual(4)
  })

  it("should handle incrementBreakLength", () => {
    const actual = timerReducer(initialState, incrementBreakLength())
    expect(actual.breakLength).toEqual(6)
  })

  it("should handle resetTimer", () => {
    let actual = timerReducer(initialState, incrementSessionLength())
    actual = timerReducer(actual, incrementBreakLength())
    actual = timerReducer(actual, resetTimer())
    expect(actual.sessionLength).toEqual(25)
    expect(actual.breakLength).toEqual(5)
  })

  it("should handle toggleTimer", () => {
    let actual = timerReducer(initialState, toggleTimer())
    expect(actual.status).toEqual(timerStatus.playing)
  })

  it("should handle countdown", () => {
    let actual = timerReducer(initialState, toggleTimer())
    actual = timerReducer(actual, countdown())
    expect(actual.timeLeft).toEqual(25 * 60 - 1)
  })
})
