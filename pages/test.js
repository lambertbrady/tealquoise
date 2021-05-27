import Container from '../components/container'
import Layout from '../components/layout'
import Pyodide from '../components/pyodide'

export default function Test() {
  return (
    <Layout>
      <Container>
        <div>TEST</div>
        <Pyodide />
      </Container>
    </Layout>
  )
}
