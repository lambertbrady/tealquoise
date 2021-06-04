import { createContext, useEffect, useRef, useState } from 'react'
import Head from 'next/head'

export const PyodideContext = createContext()

export default function PyodideProvider({ children }) {
  const pyodide = useRef(null)
  const [isPyodideLoading, setIsPyodideLoading] = useState(true)

  useEffect(() => {
    async function main() {
      // load pyodide wasm module and initialize it
      pyodide.current = await globalThis.loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/dev/full/'
      })
      setIsPyodideLoading(false)
    }
    main()
  }, [])

  return (
    <>
      <Head>
        <script src="https://cdn.jsdelivr.net/pyodide/dev/full/pyodide.js" />
      </Head>
      <PyodideContext.Provider value={{ isPyodideLoading, pyodide }}>
        {children}
      </PyodideContext.Provider>
    </>
  )
}
