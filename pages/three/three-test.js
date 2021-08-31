import Container from '../../components/container'
import Layout from '../../components/layout'
import Box from '../../components/three-box'
import { Canvas } from '@react-three/fiber'

export default function Test() {
  return (
    <Layout>
      <Container>
        <div>TEST</div>
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Box position={[-1.2, 0, 0]} />
          <Box position={[1.2, 0, 0]} />
        </Canvas>
      </Container>
    </Layout>
  )
}
