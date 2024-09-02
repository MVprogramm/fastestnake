import * as THREE from "three";
import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { FieldsProps } from "../../types/field";
import Tree from "../../assets/tree/tree";
import Entity from "../Entity/Entity";

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
    gridHelper.position.set(
      0, // Позиция по оси X (центрирование)
      0, // Позиция по оси Y (вместе с полем)
      0 // Позиция по оси Z (центрирование)
    );

    // Поворачиваем сетку, чтобы она лежала в плоскости XZ
    gridHelper.rotation.x = Math.PI / 2;

    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.3;

    // Создание и настройка фона (тумана)
    scene.background = new THREE.Color(0x87ceeb); // Цвет фона
    scene.fog = new THREE.Fog(0x87ceeb, 10, 100); // Цвет тумана, близость и дальность видимости

    // Добавление сетки в сцену
    scene.add(gridHelper);
    gridRef.current = gridHelper;

    // Создание и добавление кубов за пределами поля
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });

    const createCube = (position: THREE.Vector3) => {
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.position.copy(position);
      scene.add(cube);
    };

    // Размещение кубов за пределами поля
    createCube(new THREE.Vector3(-size / 2 - 1, 0.5, 0)); // Куб слева и сзади
    createCube(new THREE.Vector3(size / 2 + 1, 0.5, 0)); // Куб справа и сзади
    createCube(new THREE.Vector3(-size / 2 - 2, 5.5, 0)); // Куб слева и спереди
    createCube(new THREE.Vector3(size / 2 + 1, 10.5, 0)); // Куб справа и спереди

    return () => {
      scene.remove(gridHelper);
      scene.remove(
        ...scene.children.filter(
          (child) =>
            child instanceof THREE.Mesh &&
            child.geometry instanceof THREE.BoxGeometry
        )
      );
    };
  }, [scene, size]);

  return (
    <group>
      <mesh position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[size, size]} />
        <meshStandardMaterial color="green" />
      </mesh>
    </group>
  );
};

export default Fields;
