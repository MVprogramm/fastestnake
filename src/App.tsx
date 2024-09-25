// App.tsx
import { Canvas } from "@react-three/fiber";
import Wrapper from "./Components/Wrapper/Wrapper";
import Game from "./Components/Game/Game";
import { useMenuStore } from "./store/menuStore";
import Menu from "./Components/Menu/Menu";

function App() {
  const { isVisible } = useMenuStore();
  const cameraSettings = {
    fov: 30,
    aspect: window.innerWidth / window.innerHeight,
    near: 0.1,
    far: 1000,
    position: [0, -20, 20] as [number, number, number],
  };

  return (
    <>
      <Wrapper>
        <Canvas camera={cameraSettings}>
          <Game />
        </Canvas>
        {isVisible && <Menu />}
      </Wrapper>
    </>
  );
}

export default App;
