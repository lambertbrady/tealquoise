import { createContext, useRef, useState } from 'react'
import Head from 'next/head'

export const PyodideContext = createContext()

export default function PyodideProvider({ children }) {
  const indexURL = 'https://cdn.jsdelivr.net/pyodide/dev/full/'
  const pyodide = useRef(null)
  const hasLoadPyodideBeenCalled = useRef(false)
  const [isPyodideLoading, setIsPyodideLoading] = useState(true)

  return (
    <>
      <Head>
        <script src={`${indexURL}pyodide.js`} />
      </Head>
      <PyodideContext.Provider
        value={{
          indexURL,
          pyodide,
          hasLoadPyodideBeenCalled,
          isPyodideLoading,
          setIsPyodideLoading
        }}
      >
        {children}
      </PyodideContext.Provider>
    </>
  )
}
