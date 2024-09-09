import { Canvas } from "@react-three/fiber";
import Wrapper from "./Components/Wrapper/Wrapper";
import Game from "./Components/Game/Game";
import { useMenuStore } from "./store/menuStore";
import Menu from "./Components/Menu/Menu";
import { OrbitControls } from "@react-three/drei";

function App() {
  const { isVisible } = useMenuStore();

  return (
    <>
      <Wrapper>
        <Canvas
          camera={{
            fov: 50, // Угол обзора
            aspect: window.innerWidth / window.innerHeight, // Соотношение сторон
            near: 0.1, // Ближайшая точка обзора
            far: 1000, // Самая дальняя точка обзора
            position: [0, -12, 20], // Положение камеры
          }}
        >
          <OrbitControls />
          <Game />
        </Canvas>
        {isVisible && <Menu />}
      </Wrapper>
    </>
  );
}

export default App;
