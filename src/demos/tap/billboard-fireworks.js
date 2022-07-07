import { home } from "data/app";
import * as THREE from "three";
import { useCallback, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import Fireworks from "./fireworks";
import { useAspect, useTexture, Plane } from "@react-three/drei";
import frontUrl from "./billboard_particle.png";
import "./materials/layerMaterial";

export default function BillboardFireworks() {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const mouse = useRef([0, 0]);

  const onMouseMove = useCallback(
    ({ clientX: x, clientY: y }) =>
      (mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]),
    []
  );

  return (
    <>
      <Canvas
        pixelratio={Math.min(2, isMobile ? window.devicePixelRatio : 1)}
        camera={{ fov: 100, position: [0, 0, 30] }}
        onMouseMove={onMouseMove}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color("#020207"));
        }}
      >
        <fog attach="fog" args={["white", 100, 200]} />
        <pointLight distance={10} intensity={4} color="white" />
        <ambientLight intensity={10} />
        <directionalLight />
        <Fireworks count={200} />
        <Front />
      </Canvas>
    </>
  );
}

const Front = () => {
  const textr = useTexture(frontUrl);
  const scale = useAspect(40, 80, 1);

  return (
    <Plane scale={scale} args={[1, 1]} position={[0, 0, 0]}>
      <meshBasicMaterial attach="material" map={textr} transparent />
    </Plane>
  );
};
