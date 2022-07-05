import { home } from "data/app";
import * as THREE from "three";
import { useState, useCallback, useRef, Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Fireworks from "./fireworks";
import { Image } from "@react-three/drei";

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
        <pointLight distance={100} intensity={4} color="white" />
        <Fireworks count={isMobile ? 200 : 200} />
        <Image url={home.billboardParticle} position={[0, 0, 0]} scale={45} />
      </Canvas>
    </>
  );
}
