import { Environment, OrbitControls, Text } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Model } from "./Model"
import { Head } from "./Head"


function App() {

	
	return (
		<>
			<Canvas style={{background:'#000000'}}>
				{/* <OrbitControls/> */}
				{/* <Model/> */}
				<directionalLight intensity={2} position={[3, 2, 3]}/>
				<Head/>
				<Environment preset="city" />

			</Canvas>
		</>
	)
}

export default App
