import Container from '../../components/container'
import Layout from '../../components/layout'
import Pyodide from '../../components/pyodide'
import test from '../../public/assets/python/test.py'

export default function Test() {
  return (
    <Layout>
      <Container>
        <div>TEST</div>
        {/* TODO: pass id or element as argument to python so events can target appropriate component */}
        {/* NOTE: currently, pythonCode is only adding event listeners to 'py-test' */}
        <Pyodide id="py-test" pythonCode={test} />
        <Pyodide id="py-test2" pythonCode={test} />
      </Container>
    </Layout>
  )
}
