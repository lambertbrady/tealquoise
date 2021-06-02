import { useEffect, useRef, useState } from 'react'

export default function Pyodide({ id, pythonCode }) {
  const pyodideReadyPromise = useRef(null)
  const [pyodideOutput, setPyodideOutput] = useState('[loading Pyodide...]')

  // load pyodide wasm module and initialize
  async function main() {
    return await window.loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/dev/full/'
    })
  }
  // evaluate python code with pyodide
  async function evaluatePython(pyodidePromise, pythonCode) {
    const pyodide = await pyodidePromise
    try {
      return pyodide.runPython(pythonCode)
    } catch (err) {
      console.error(err)
      return `Error evaluating Python code. See console for details.`
    }
  }

  useEffect(() => {
    // only call main to load pyodide once, otherwise it will result in an error
    if (pyodideReadyPromise.current === null) {
      pyodideReadyPromise.current = main()
    }
    // update state of pyodideOutput with result of evaluated python code
    ;(async function () {
      setPyodideOutput(
        await evaluatePython(pyodideReadyPromise.current, pythonCode)
      )
    })()
  }, [pythonCode])

  return (
    <>
      <div id={id}>Pyodide Output: {pyodideOutput}</div>
    </>
  )
}
