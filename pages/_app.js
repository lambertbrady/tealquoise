import '../styles/index.css'
import PyodideProvider from '../components/pyodide-provider'

export default function MyApp({ Component, pageProps }) {
  return (
    <PyodideProvider>
      <Component {...pageProps} />
    </PyodideProvider>
  )
}
