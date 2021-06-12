import { useContext, useEffect, useState } from 'react'
import { PyodideContext } from './pyodide-provider'

export default function Pyodide({
  id,
  loadingMessage = 'loading...',
  evaluatingMessage = 'evaluating...',
  pythonCode
}) {
  const {
    indexURL,
    pyodide,
    hasLoadPyodideBeenCalled,
    isPyodideLoading,
    setIsPyodideLoading
  } = useContext(PyodideContext)
  const [pyodideOutput, setPyodideOutput] = useState(evaluatingMessage)

  // load pyodide wasm module and initialize it
  useEffect(() => {
    if (!hasLoadPyodideBeenCalled.current) {
      // immediately set hasLoadPyodideBeenCalled ref, which is part of context, to true
      // this prevents any additional Pyodide components from calling loadPyodide a second time
      hasLoadPyodideBeenCalled.current = true
      ;(async function () {
        pyodide.current = await globalThis.loadPyodide({ indexURL })
        // updating value of isPyodideLoading triggers second useEffect
        setIsPyodideLoading(false)
      })()
    }
    // pyodide and hasLoadPyodideBeenCalled are both refs and setIsPyodideLoading is a setState function (from context)
    // as a result, these dependencies will be stable and never cause the component to re-render
  }, [indexURL, pyodide, hasLoadPyodideBeenCalled, setIsPyodideLoading])

  // evaluate python code with pyodide and set output
  useEffect(() => {
    const evaluatePython = (pyodide, pythonCode) => {
      try {
        return pyodide.runPython(pythonCode)
      } catch (err) {
        console.error(err)
        return `Error evaluating Python code. See console for details.`
      }
    }
    if (!isPyodideLoading) {
      setPyodideOutput(evaluatePython(pyodide.current, pythonCode))
    }
    // component re-renders when isPyodideLoading changes, which is set with first useEffect and updated via context
  }, [pyodide, isPyodideLoading, pythonCode])

  return (
    <div id={id}>
      Pyodide Output: {isPyodideLoading ? loadingMessage : pyodideOutput}
    </div>
  )
}
