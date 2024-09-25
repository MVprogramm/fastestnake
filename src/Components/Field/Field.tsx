import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap"; // Импорт GSAP для анимации
import Tree from "../../assets/tree/Tree";
import { FieldsProps } from "../../types/field";

const Fields: React.FC<FieldsProps> = ({ size }) => {
  const { scene } = useThree();
  const gridRef = useRef<THREE.GridHelper | null>(null);

  useEffect(() => {
    const resolution = new THREE.Vector2(size, size);

    // Создание и настройка сетки
    const gridHelper = new THREE.GridHelper(
      resolution.x, // Ширина сетки
      resolution.y, // Глубина сетки
      0xffffff, // Цвет делений по оси X
      0xffffff // Цвет делений по оси Z
    );

    // Устанавливаем позицию сетки
    gridHelper.position.set(0, 0, 0.1);

    // Поворот сетки в плоскость XZ
    gridHelper.rotation.x = Math.PI / 2;

    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.3;

    // Установка тумана
    scene.fog = new THREE.Fog(0x39c09f, 10, 100); // Изначальные параметры тумана

    // Цвет фона
    scene.background = new THREE.Color(0x39c09f); // Задание цвета фона

    // Анимация тумана
    gsap.to(scene.fog, {
      duration: 5, // Длительность анимации (5 секунд)
      near: 40, // Параметр near станет 5 (туман начнётся ближе к камере)
      far: 50, // Параметр far станет 50 (объекты на расстоянии 50 будут полностью затуманены)
      ease: "power2.inOut", // Плавность анимации
    });

    // Добавление сетки в сцену
    scene.add(gridHelper);
    gridRef.current = gridHelper;

    return () => {
      scene.remove(gridHelper);
    };
  }, [scene, size]);

  return (
    <>
      <group>
        <mesh position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[size * 50, size * 50]} />
          <meshStandardMaterial color="#56F854" />
        </mesh>
        {/* Размещение деревьев */}
        <Tree
          position={[-size / -3 - 1, 15.5, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1, 1, 1]}
        />
        <Tree
          position={[size / 2 + 1, 0.5, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1, 1, 1]}
        />
        <Tree
          position={[-size / 2 - 2, 15.5, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1, 1, 1]}
        />
        <Tree
          position={[size / 2 + 1, -5.5, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1, 1, 1]}
        />
      </group>
    </>
  );
};

export default Fields;
