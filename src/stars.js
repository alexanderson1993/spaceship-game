import * as THREE from 'three'
import React, { useRef, useMemo } from 'react'
window.THREE = THREE
export function Stars() {
  let group = useRef()
  const [geo, mat, vertices, coords] = useMemo(() => {
    const geo = new THREE.SphereBufferGeometry(0.1, 10, 10)
    const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color('white') })
    const coords = new Array(2000)
      .fill()
      .map(i => [
        Math.random() * 800 - 400,
        Math.random() * 200 - 200,
        Math.random() * 800 - 400
      ])
    return [geo, mat, vertices, coords]
  }, [])
  return (
    <group ref={group}>
      {coords.map(([p1, p2, p3], i) => (
        <mesh key={i} geometry={geo} material={mat} position={[p1, p2, p3]} />
      ))}
    </group>
  )
}
