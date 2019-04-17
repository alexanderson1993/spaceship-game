import { useEffect } from 'react'

const acceleration = 0.01
export function useKeyThrust(setState, playerId) {
  useEffect(() => {
    function startRotate(e) {
      setState(oldState =>
        oldState.map(player => {
          const direction = player.acceleration
          if (player.id === playerId) {
            if (e.key === 'w') {
              direction.z = -1 * acceleration
            }
            if (e.key === 's') {
              direction.z = 1 * acceleration
            }
            return { ...player, acceleration: direction }
          }
          return player
        })
      )
    }
    function endRotate(e) {
      setState(oldState =>
        oldState.map(player => {
          if (player.id === playerId) {
            const direction = player.acceleration

            if (e.key === 'w' || e.key === 's') {
              direction.z = 0
            }
            return { ...player, acceleration: direction }
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
