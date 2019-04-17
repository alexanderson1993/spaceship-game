import * as THREE from 'three'
import { useMemo } from 'react'
import { useThree, useRender } from 'react-three-fiber'
const OrbitControls = require('three-orbit-controls')(THREE)

export function useOrbitControls() {
  const { camera, canvas } = useThree()
  const controls = useMemo(() => {
    const ctrls = new OrbitControls(camera, canvas)
    ctrls.enableKeys = false
    return ctrls
  }, [camera, canvas])

  useRender(() => {
    controls.update()
  })
}
