import React, { useRef } from 'react'
import { MeshTransmissionMaterial, Text, useGLTF } from '@react-three/drei'
import { useControls } from 'leva'
import { useFrame, useThree } from '@react-three/fiber'
import { easing } from 'maath'

export function Head(props) {
  const { nodes, materials } = useGLTF('/head2.glb')
  const group = useRef()

  const materialProps = useControls({

      thickness: { value: 0.15, min: 0, max: 3, step: 0.05 },

      roughness: { value: 0.1, min: 0, max: 1, step: 0.1 },

      transmission: {value: 1, min: 0, max: 1, step: 0.1},

      ior: { value: 1.2, min: 0, max: 3, step: 0.1 },

      chromaticAberration: { value: 1, min: 0, max: 1},

      backside: { value: true},

  })
  useFrame((state, delta)=>{
    group.current.rotation.z += 0.015
    // group.current.rotation.y += 0.005
    easing.damp3(state.camera.position, [state.pointer.x*5, state.pointer.y*5, 5], 0.25, delta)
    state.camera.lookAt(0,0,0)
    // group.current.rotation.x += 0.005
})
const { viewport } = useThree()

  return (
    <>
        <group scale={viewport.width / 15} ref={group}{...props} dispose={null}>
        {/* <mesh
            castShadow
            receiveShadow
            geometry={nodes.BSurfaceMesh.geometry}
            // material={materials['Material.001']}
        >
                        <MeshTransmissionMaterial {...materialProps}/>
            </mesh> */}
            <mesh position={[0,0,1]}>
                <torusKnotGeometry args={[1, 0.3, 300, 20]}/>
                
                {/* <boxGeometry args={[2,2, 2]}/> */}
                

                <MeshTransmissionMaterial {...materialProps}/>
            </mesh>
            
        </group>
        <Text scale={viewport.width / 20}  font={'glasket500.otf'} position={[0, 0, -1]} fontSize={3}  color="white" anchorX="center" anchorY="middle">
                	 3D Glass Material
            	</Text>
    </>
  )
}

useGLTF.preload('/head2.glb')