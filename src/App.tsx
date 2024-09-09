import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useState, useEffect } from "react";
import { Leva, useControls } from "leva";
import Wrapper from "./Components/Wrapper/Wrapper";
import Game from "./Components/Game/Game";
import { useMenuStore } from "./store/menuStore";
import { PerspectiveCamera } from "three"; // Импортируем PerspectiveCamera
import Menu from "./Components/Menu/Menu";

function CameraSettings() {
  const { camera, gl } = useThree(); // Получаем доступ к камере и WebGLRenderer
  const [aspect, setAspect] = useState(window.innerWidth / window.innerHeight);

  // Обрабатываем изменение размеров окна для пересчета соотношения сторон
  useEffect(() => {
    const handleResize = () => {
      setAspect(window.innerWidth / window.innerHeight);

      if (camera instanceof PerspectiveCamera) {
        // Проверяем тип камеры и используем приведение типа
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      }

      gl.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [camera, gl]);

  // Используем Leva для создания контролов для камеры
  const { fov, near, far, position } = useControls("Camera", {
    fov: { value: 50, min: 10, max: 100, step: 1 },
    near: { value: 0.1, min: 0.1, max: 10, step: 0.1 },
    far: { value: 1000, min: 100, max: 5000, step: 10 },
    position: {
      value: [0, -20, 15],
      step: 1,
      joystick: "invertY", // Позволяет управлять камерой через интерфейс
    },
  });

  // Обновляем параметры камеры
  useEffect(() => {
    if (camera instanceof PerspectiveCamera) {
      camera.fov = fov;
      camera.aspect = aspect; // Обновляем соотношение сторон при изменении FOV
      camera.updateProjectionMatrix();
    }
    camera.near = near;
    camera.far = far;
    camera.position.set(...position);
  }, [fov, near, far, position, aspect, camera]);

  return null;
}

function App() {
  const { isVisible } = useMenuStore();

  return (
    <>
      <Wrapper>
        <Canvas
          camera={{
            fov: 50, // Изначальный угол обзора
            aspect: window.innerWidth / window.innerHeight, // Изначальное соотношение сторон
            near: 0.1, // Изначальная ближняя точка
            far: 1000, // Изначальная дальняя точка
            position: [0, -20, 15], // Изначальное положение камеры
          }}
        >
          <CameraSettings /> {/* Компонент для настройки камеры */}
          <OrbitControls />
          <Game />
        </Canvas>
        {isVisible && <Menu />}
        <Leva collapsed={false} /> {/* Панель управления от Leva */}
      </Wrapper>
    </>
  );
}

export default App;
