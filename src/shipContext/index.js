import React, { useState, createContext } from 'react'
import uuid from 'uuid'
import { useTick } from './useTick'
import { useKeyRotate } from './useKeyRotate'
import { useKeyThrust } from './useKeyThrust'

const initialState = [
  {
    id: uuid.v4(),
    position: { x: 0, y: 0, z: 0 },
    velocity: { x: 0, y: 0, z: 0 },
    acceleration: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0, w: 1 },
    rotationVelocity: { x: 0, y: 0, z: 0 },
    rotationAcceleration: { x: 0, y: 0, z: 0 },
    maxVelocity: 1,
    maxRotationVelocity: 3
  }
]

export let state = initialState.concat()
function setState(data) {
  if (typeof data === 'function') {
    state = data(state)
    return
  }
  state = data
}
export const ShipContext = createContext(initialState)

export const ShipProvider = ({ children }) => {
  //  const [state, setState] = useState(initialState)
  const playerId = state[0].id
  useKeyRotate(setState, playerId)
  useKeyThrust(setState, playerId)
  useTick(setState)
  return (
    <ShipContext.Provider value={{ players: state }}>
      {children}
    </ShipContext.Provider>
  )
}
