import Container from '../components/container'
import Layout from '../components/layout'
import Pyodide from '../components/pyodide'
import test from '../public/assets/python/test.py'

export default function Test() {
  return (
    <Layout>
      <Container>
        <div>TEST</div>
        <Pyodide id="py-test" pythonCode={test} />
      </Container>
    </Layout>
  )
}
