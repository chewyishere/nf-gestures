import { useCallback, Suspense, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Plane, useAspect, useTexture, Sparkles } from "@react-three/drei";
import Effects from "./effects";
import bgUrl from "./resources/background.png";
import midUrl from "./resources/billboard_front.png";
import frontUrl from "./resources/billboard_info.png";

import "./materials/layerMaterial";

export default function BillboardParallax({ gyro }) {
  const dof = useRef();
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <>
      <Canvas
        pixelratio={Math.min(2, isMobile ? window.devicePixelRatio : 1)}
        camera={{ fov: 100, position: [0, 0, 30] }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color("#020207"));
        }}
      >
        <fog attach="fog" args={["white", 50, 190]} />
        <pointLight distance={10} intensity={4} color="white" />
        <ambientLight intensity={1} />
        <directionalLight />
        <Sparkles
          count={200}
          scale={50}
          size={5}
          speed={1.5}
          color={"#FF9978"}
        />
        <Suspense fallback={null}>
          <Scene dof={dof} isMobile={isMobile} gyro={gyro} />
        </Suspense>
        <Effects ref={dof} />
      </Canvas>
    </>
  );
}

const Scene = ({ dof, isMobile, gyro }) => {
  const textures = useTexture([bgUrl, midUrl, frontUrl]);
  const subject = useRef();
  const group = useRef();
  const layersRef = useRef([]);
  const [movement] = useState(() => new THREE.Vector3());
  const [temp] = useState(() => new THREE.Vector3());
  const [focus] = useState(() => new THREE.Vector3());
  const layers = [
    {
      texture: textures[0],
      z: -15,
      factor: 0.005,
      scale: useAspect(30, 50, 1.9),
      y: -20,
    },
    {
      texture: textures[1],
      factor: 0.01,
      z: -5,
      y: -15,
      ref: subject,
      scaleFactor: 1,
      scale: useAspect(34, 25, 0.55),
    },
    {
      texture: textures[2],
      factor: 0.02,
      scaleFactor: 1,
      z: 5,
      y: -15,
      wiggle: 1,
      scale: useAspect(100, 60, 0.25),
    },
  ];

  useFrame((state, delta) => {
    dof.current.target = focus.lerp(subject.current.position, 1);
    console.log(gyro);
    let _x = isMobile ? gyro.x ?? 0 : state.mouse.x;
    let _y = isMobile ? gyro.y ?? 0 : state.mouse.y;

    movement.lerp(temp.set(_x, _y * 0.2, 0), 0.1);
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      _y / 10,
      0.1
    );

    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      -_x / 10,
      0.1
    );
  }, 1);

  return (
    <group ref={group}>
      {layers.map(
        (
          {
            scale,
            texture,
            ref,
            factor = 0,
            scaleFactor = 1,
            wiggle = 0.5,
            y,
            z,
          },
          i
        ) => (
          <Plane
            scale={scale}
            args={[1, 1, wiggle ? 10 : 1, wiggle ? 10 : 1]}
            position-z={z}
            position-y={y}
            key={i}
            ref={ref}
          >
            <layerMaterial
              movement={movement}
              textr={texture}
              factor={factor}
              ref={(el) => (layersRef.current[i] = el)}
              wiggle={wiggle}
              scale={scaleFactor}
            />
          </Plane>
        )
      )}
    </group>
  );
};
