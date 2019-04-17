function distance3d(coord2, coord1) {
  const { x: x1, y: y1, z: z1 } = coord1
  let { x: x2, y: y2, z: z2 } = coord2
  return Math.sqrt((x2 -= x1) * x2 + (y2 -= y1) * y2 + (z2 -= z1) * z2)
}

export function useShipAI({ position, destination, rotation, ...ship }) {
  // Choose a new destination if we are at the position
  if (!destination || distance3d(position, destination) < 0.01) {
    destination = {
      x: Math.random() * 800 - 400,
      y: 0,
      z: Math.random() * 800 - 400
    }
  }
  // Rotate the ship towards the destination

  return { ...ship, position, destination, rotation }
}
