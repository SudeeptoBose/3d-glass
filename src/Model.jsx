import React, { useRef } from 'react'
import { MeshTransmissionMaterial, Text, useGLTF } from '@react-three/drei'
import { useControls } from 'leva'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'

export function Model(props) {

    const { nodes, materials } = useGLTF('/cone.glb')

    const group = useRef()

    const materialProps = useControls({

        thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },

        roughness: { value: 0, min: 0, max: 1, step: 0.1 },

        transmission: {value: 1, min: 0, max: 1, step: 0.1},

        ior: { value: 1.2, min: 0, max: 3, step: 0.1 },

        chromaticAberration: { value: 0.02, min: 0, max: 1},

        backside: { value: true},

    })

    useFrame((state, delta)=>{
        // group.current.rotation.z += 0.01
        easing.damp3(state.camera.position, [state.pointer.x, state.pointer.y, 5], 0.25, delta)
        state.camera.lookAt(0,0,0)
        // group.current.rotation.x += 0.02
    })

    const newMaterial = <MeshTransmissionMaterial {...materialProps}/>
    return (
        <>
            <group ref={group}{...props} dispose={null}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cone.geometry}
                    scale={[0.5, 1, 0.5]}
                    >
                    <MeshTransmissionMaterial {...materialProps}/>
                </mesh>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cone001.geometry}
                    rotation={[0, 0, -2.356]}
                    scale={[0.5, 1, 0.5]}
                    >
                    <MeshTransmissionMaterial {...materialProps}/>
                </mesh>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cone002.geometry}
                    rotation={[0, 0, 2.356]}
                    scale={[0.5, 1, 0.5]}
                    >
                    <MeshTransmissionMaterial {...materialProps}/>
                </mesh>
            </group>

        </>
    )
}

useGLTF.preload('/cone.glb')