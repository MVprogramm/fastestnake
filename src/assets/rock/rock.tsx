import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { TreeProps } from "../../types/obstacle";

const Tree = (props: TreeProps) => {
  const {
    position,
    rotation = [0, 0, 0],
    scale = [1, 1, 1],
    color = 0xa2d109,
  } = props;
  const groupRef = useRef<THREE.Group>(null);

  // Используем useMemo для кэширования геометрии и материала
  const geometry = useMemo(() => {
    const geom = new THREE.IcosahedronGeometry(0.3);
    geom.scale(1, 6, 1);
    return geom;
  }, []);

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        flatShading: true,
        color: color,
      }),
    [color]
  );

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.scale.set(scale[0], scale[1], scale[2]);
      groupRef.current.rotation.set(rotation[0], rotation[1], rotation[2]);
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh
        geometry={geometry}
        material={material}
        scale={1} // Установите фиксированный масштаб
        rotation-y={0} // Установите фиксированное вращение
      />
    </group>
  );
};

export default Tree;
