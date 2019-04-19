import * as THREE from 'three'

function distance3d(coord2, coord1) {
  const { x: x1, y: y1, z: z1 } = coord1
  let { x: x2, y: y2, z: z2 } = coord2
  return Math.sqrt((x2 -= x1) * x2 + (y2 -= y1) * y2 + (z2 -= z1) * z2)
}

function getAngle(position, destination, rotation) {
  const obj = new THREE.Object3D()
  const q = new THREE.Quaternion(...Object.values(rotation))
  obj.setRotationFromQuaternion(q)
  obj.position.set(position.x, position.y, position.z)
  obj.lookAt(new THREE.Vector3(...Object.values(destination)))
  const newQ = q.multiply(obj.quaternion.inverse())
  const e = new THREE.Euler()
  e.setFromQuaternion(newQ)
  return e
}
export function calculateShipAI(
  { position, destination, rotation, ...ship },
  isPlayer
) {
  // Choose a new destination if we are at the position
  if (!destination || distance3d(position, destination) < 0.01) {
    destination = {
      x: Math.random() * 800 - 400,
      y: 0,
      z: Math.random() * 800 - 400
    }
  }
  // console.log(distance3d(position, destination))
  // Rotate the ship towards the destination
  // First get the angle that we need to rotate towards
  const angle = getAngle(position, destination, rotation)

  // Do the rotation
  const rotationAcceleration = {
    x: 0, //ship.rotationAccelerationScalar * (angle.x),
    y: ship.rotationAccelerationScalar * angle.y,
    z: 0 //ship.rotationAccelerationScalar * (angle.z)
  }

  // Update the acceleration
  const acceleration = {
    x: 0,
    y: 0,
    z: Math.max(
      -0.5,
      Math.min(0.5, (distance3d(position, destination) - 15) / -15)
    )
  }

  return {
    ...ship,
    position,
    destination,
    rotation,
    rotationAcceleration,
    acceleration
  }
}
