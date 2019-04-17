import React, { useContext } from 'react'
import ReactDOM from 'react-dom'
import { Canvas } from 'react-three-fiber'
import { Stars } from './stars'
import { Ship } from './ship'
import { ShipProvider, ShipContext } from './shipContext'
import './styles.css'
import { useTopDownCamera } from './useTopDownCamera'

function Thing() {
  useTopDownCamera()
  const { players } = useContext(ShipContext)
  return (
    <group>
      <Stars />
      {players.map(p => (
        <Ship {...p} key={p.id} />
      ))}
    </group>
  )
}

ReactDOM.render(
  <Canvas>
    <ShipProvider>
      <Thing />
    </ShipProvider>
  </Canvas>,
  document.getElementById('root')
)
