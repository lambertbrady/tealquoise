import { useEffect, useRef, useState } from 'react'

export default function Pyodide() {
  const pythonCodeString = '1+2'

  let pyodideReadyPromise = useRef(null)
  let [pyodideOutput, setPyodideOutput] = useState('[loading Pyodide...]')

  useEffect(() => {
    // load pyodide wasm module and initialize
    async function main() {
      return await window.loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/dev/full/'
      })
    }
    // only call main to load pyodide once, otherwise it will result in an error
    if (pyodideReadyPromise.current === null) {
      pyodideReadyPromise.current = main()
    }

    async function evaluatePython(pythonCode) {
      let pyodide = await pyodideReadyPromise.current
      try {
        setPyodideOutput(pyodide.runPython(pythonCode))
      } catch (err) {
        console.error(err)
      }
    }
    evaluatePython(pythonCodeString)
  }, [])

  return (
    <>
      <div>Pyodide Output: {pyodideOutput}</div>
    </>
  )
}
