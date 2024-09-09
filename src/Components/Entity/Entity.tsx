// Entity.tsx
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

interface EntityProps {
  mesh: THREE.Mesh;
  resolution: { x: number; y: number };
  option?: { size: number; number: number };
}

const Entity: React.FC<EntityProps> = ({
  mesh,
  resolution,
  option = { size: 1.5, number: 0.5 },
}) => {
  const meshRef = useRef<THREE.Mesh>(mesh);

  useEffect(() => {
    meshRef.current.castShadow = true;
    meshRef.current.receiveShadow = true;

    // Create instance of Entity class
    const entity = new (class {
      mesh: THREE.Mesh;
      resolution: { x: number; y: number };
      option: { size: number; number: number };

      constructor(
        mesh: THREE.Mesh,
        resolution: { x: number; y: number },
        option: { size: number; number: number }
      ) {
        this.mesh = mesh;
        this.resolution = resolution;
        this.option = option;
      }

      get position() {
        return this.mesh.position;
      }

      getIndexByCoord() {
        const { x } = this.resolution;
        return this.position.z * x + this.position.x;
      }

      in() {
        gsap.from(this.mesh.scale, {
          duration: 1,
          x: 0,
          y: 0,
          z: 0,
          ease: `elastic.out(${this.option.size}, ${this.option.number})`,
        });
      }

      out() {
        // Implement out animation if needed
      }
    })(mesh, resolution, option);

    // Call the in animation
    entity.in();

    return () => {
      // Cleanup if needed
    };
  }, [mesh, resolution, option]);

  return null; // No need to render anything as mesh is already part of the scene
};

export default Entity;
