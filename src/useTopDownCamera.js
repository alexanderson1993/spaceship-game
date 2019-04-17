import { useContext, useEffect } from 'react'
import { ShipContext } from './shipContext'
import { useThree, useRender } from 'react-three-fiber'

export function useTopDownCamera() {
  const { camera, canvas } = useThree()
  const { players } = useContext(ShipContext)
  const player = players[0]
  useEffect(() => {
    camera.position.set(player.position.x, 10, player.position.z)
    camera.lookAt(player.position.x, player.position.y, player.position.z)
  }, [camera, player.position])
}
