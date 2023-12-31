import React from "react"

import SessionControl from "./features/clock/SessionControl"
import BreakControl from "./features/clock/BreakControl"
import TimerControl from "./features/clock/TimerControl"

import Header from "./features/Header"
import Footer from "./features/Footer"

function App() {
  return (
    <div className="App">
      <div
        id="drum-machine"
        className="d-flex align-items-center justify-content-center vh-100"
      >
        <div className="mw-100" style={{ width: 350 }}>
          <Header />

          <div className="row">
            <div className="col me-auto">
              <SessionControl />
            </div>
            <div className="col">
              <BreakControl />
            </div>
          </div>

          <TimerControl />

          <Footer />
        </div>
      </div>
    </div>
  )
}

export default App
