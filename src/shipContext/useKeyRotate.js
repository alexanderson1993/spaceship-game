import { useEffect } from 'react'

const acceleration = 1
export function useKeyRotate(setState, playerId) {
  useEffect(() => {
    function startRotate(e) {
      setState(oldState =>
        oldState.map(player => {
          const acceleration = player.rotationAccelerationScalar
          const direction = player.rotationAcceleration
          if (player.id === playerId) {
            // if (e.key === 'w') {
            //   direction.x = -1 * acceleration
            // }
            // if (e.key === 's') {
            //   direction.x = 1 * acceleration
            // }
            if (e.key === 'd') {
              direction.y = -1 * acceleration
            }
            if (e.key === 'a') {
              direction.y = 1 * acceleration
            }
            // if (e.key === 'q') {
            //   direction.z = 1 * acceleration
            // }
            // if (e.key === 'e') {
            //   direction.z = -1 * acceleration
            // }
            return { ...player, rotationAcceleration: direction }
          }
          return player
        })
      )
    }
    function endRotate(e) {
      setState(oldState =>
        oldState.map(player => {
          if (player.id === playerId) {
            const direction = player.rotationAcceleration

            if (e.key === 'w' || e.key === 's') {
              direction.x = 0
            }
            if (e.key === 'a' || e.key === 'd') {
              direction.y = 0
            }
            if (e.key === 'q' || e.key === 'e') {
              direction.z = 0
            }
            return { ...player, rotationAcceleration: direction }
          }
          return player
        })
      )
    }
    window.addEventListener('keydown', startRotate)
    window.addEventListener('keyup', endRotate)
    return () => {
      window.removeEventListener('keydown', startRotate)
      window.removeEventListener('keyup', endRotate)
    }
  }, [])
}
