import { useThree, useRender } from 'react-three-fiber'
import { state } from './shipContext'

export function useTopDownCamera() {
  const { camera, canvas } = useThree()
  useRender(() => {
    const player = state[0]
    camera.position.set(player.position.x, 10, player.position.z)
    camera.lookAt(player.position.x, player.position.y, player.position.z)
  })
}
