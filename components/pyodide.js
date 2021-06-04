import { useContext, useEffect, useState } from 'react'
import { PyodideContext } from './pyodide-provider'

export default function Pyodide({
  id,
  loadingMessage = 'loading...',
  evaluatingMessage = 'evaluating...',
  pythonCode
}) {
  const { isPyodideLoading, pyodide } = useContext(PyodideContext)
  const [pyodideOutput, setPyodideOutput] = useState(evaluatingMessage)

  // component rerenders when isLoading changes, which is set inside PyodideProvider and updated via context
  useEffect(() => {
    // evaluate python code with pyodide
    async function evaluatePython(pyodide, pythonCode) {
      try {
        return (await pyodide).runPython(pythonCode)
      } catch (err) {
        console.error(err)
        return `Error evaluating Python code. See console for details.`
      }
    }
    if (!isPyodideLoading) {
      ;(async function () {
        setPyodideOutput(await evaluatePython(pyodide.current, pythonCode))
      })()
    }
  }, [isPyodideLoading, pyodide, pythonCode])

  return (
    <>
      <div id={id}>
        Pyodide Output: {isPyodideLoading ? loadingMessage : pyodideOutput}
      </div>
    </>
  )
}
