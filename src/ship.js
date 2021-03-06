import * as THREE from 'three'
import React, { useRef, useMemo, useEffect } from 'react'
import { useRender, useThree } from 'react-three-fiber'
import { state } from './shipContext'

export function Ship({ id }) {
  let group = useRef()
  const { scene } = useThree()
  window.SCENE = window.SCENE || scene
  useRender(() => {
    const { rotation, position } = state.find(s => s.id === id)
    const { x, y, z, w } = rotation
    const { x: px, y: py, z: pz } = position
    const quat = new THREE.Quaternion(x, y, z, w)
    group.current.setRotationFromQuaternion(quat)
    group.current.position.set(px, py, pz)
  })
  const [geo, mat1, mat2] = useMemo(() => {
    const geometry = new THREE.Geometry()
    geometry.vertices.push(new THREE.Vector3(0, 0, -1))
    geometry.vertices.push(new THREE.Vector3(0.5, 0, 0.5))
    geometry.vertices.push(new THREE.Vector3(0, 0.25, 0))
    geometry.vertices.push(new THREE.Vector3(-0.5, 0, 0.5))
    geometry.vertices.push(new THREE.Vector3(0, -0.25, 0))

    geometry.faces.push(new THREE.Face3(0, 2, 1))
    geometry.faces.push(new THREE.Face3(0, 3, 2))
    geometry.faces.push(new THREE.Face3(0, 1, 4))
    geometry.faces.push(new THREE.Face3(0, 4, 3))
    geometry.faces.push(new THREE.Face3(2, 4, 1))
    geometry.faces.push(new THREE.Face3(2, 3, 4))
    const material1 = new THREE.MeshBasicMaterial({
      wireframe: true,
      color: 0xcccccc
    })
    const material2 = new THREE.MeshBasicMaterial({
      wireframe: false,
      color: 0x888888
    })
    return [geometry, material1, material2]
  }, [])
  return (
    <group ref={group}>
      <mesh geometry={geo} material={mat1} />
      <mesh geometry={geo} material={mat2} />
    </group>
  )
}
