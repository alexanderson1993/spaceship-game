import { useEffect, useRef } from 'react'
import * as THREE from 'three'
const rotationDrag = 0.5
const drag = 0.001

function degtorad(deg) {
  return deg * (Math.PI / 180)
}

function calcRotVel(
  maxRotationVelocity,
  rotationAcceleration,
  rotationVelocity
) {
  return (
    Math.round(
      Math.max(
        maxRotationVelocity * -1,
        Math.min(
          maxRotationVelocity,
          rotationAcceleration +
            rotationVelocity +
            Math.sign(rotationVelocity) * -1 * rotationDrag
        )
      ) * 10
    ) / 10
  )
}
function calcVel(maxVelocity, velocity, acceleration) {
  return (
    Math.round(
      Math.min(
        maxVelocity,
        Math.max(
          maxVelocity * -1,
          velocity + acceleration + Math.sign(velocity) * -1 * drag
        )
      ) * 10000
    ) / 10000
  )
}
export function useTick(setState) {
  const timeout = useRef()

  useEffect(() => {
    tick()
    function tick() {
      setState(oldState =>
        oldState.map(player => {
          const {
            velocity,
            position,
            acceleration,
            maxVelocity,
            rotation,
            rotationVelocity,
            maxRotationVelocity,
            rotationAcceleration
          } = player

          const newRotationVelocity = {
            x: calcRotVel(
              maxRotationVelocity,
              rotationAcceleration.x,
              rotationVelocity.x
            ),
            y: calcRotVel(
              maxRotationVelocity,
              rotationAcceleration.y,
              rotationVelocity.y
            ),
            z: calcRotVel(
              maxRotationVelocity,
              rotationAcceleration.z,
              rotationVelocity.z
            )
          }
          const q = new THREE.Quaternion()
          q.setFromAxisAngle(
            new THREE.Vector3(
              degtorad(rotationVelocity.x),
              degtorad(rotationVelocity.y),
              degtorad(rotationVelocity.z)
            ),
            Math.PI / 2
          )
          const rot = new THREE.Quaternion(...Object.values(rotation))
          const newQuaternion = rot.multiply(q).normalize()

          // Acceleration is based on the rotation;
          const rotatedAcceleration = new THREE.Vector3(
            ...Object.values(acceleration)
          ).applyQuaternion(newQuaternion)
          const newVelocity = {
            x: calcVel(maxVelocity, velocity.x, rotatedAcceleration.x),
            y: calcVel(maxVelocity, velocity.y, rotatedAcceleration.y),
            z: calcVel(maxVelocity, velocity.z, rotatedAcceleration.z)
          }
          const [x, y, z, w] = Object.values(newQuaternion)
          const newRotation = { x, y, z, w }
          const newPosition = {
            x: position.x + newVelocity.x,
            y: position.y + newVelocity.y,
            z: position.z + newVelocity.z
          }
          return {
            ...player,
            velocity: newVelocity,
            position: newPosition,
            rotation: newRotation,
            rotationVelocity: newRotationVelocity
          }
        })
      )
      timeout.current = setTimeout(tick, 1000 / 60)
    }
    return () => {
      clearTimeout(timeout.current)
    }
  }, [])
}
