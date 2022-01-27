import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial])

  function transition(mode, replace = false) {
    setMode((prev) => mode)

    if (!replace) {
      setHistory(prev => ([...prev, mode]));
    }
  }


  function back() {
    setMode(initial);

    if (history.length !== 1) {

      setMode(history[history.length - 2]);
      history.pop();
      setHistory(history);
    }
  }

  return { mode, transition, back };
}

