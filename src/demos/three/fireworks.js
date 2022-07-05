import * as THREE from "three";
import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { getRandomNum } from "utils/math";
import { Plane } from "@react-three/drei";
import { GUI } from "dat.gui";

const vertexShader = ` 
precision mediump float;
attribute vec3 position;
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform float size;
attribute float adjustSize;
uniform vec3 cameraPosition;
varying float distanceCamera;
attribute vec3 velocity;
attribute vec4 color;
varying vec4 vColor;
void main() {
    vColor = color;
    vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * adjustSize * (100.0 / length(modelViewPosition.xyz));
    gl_Position = projectionMatrix * modelViewPosition;
}
`;

const fragmentShader = `
precision mediump float;
uniform sampler2D texture;
varying vec4 vColor;
void main() {
    vec4 color = vec4(texture2D(texture, gl_PointCoord));
    gl_FragColor = color * vColor;
}
`;

const friction = 0.97;
const textureSize = 80.0;
const gravity = new THREE.Vector3(0, -0.01, 0);

const getOffsetXYZ = (i) => {
  const offset = 3;
  const index = i * offset;
  const x = index;
  const y = index + 1;
  const z = index + 2;
  return { x, y, z };
};

const getOffsetRGBA = (i) => {
  const offset = 4;
  const index = i * offset;
  const r = index;
  const g = index + 1;
  const b = index + 2;
  const a = index + 3;
  return { r, g, b, a };
};

const drawRadialGradation = (ctx, canvasRadius, canvasW, canvasH) => {
  ctx.save();
  const gradient = ctx.createRadialGradient(
    canvasRadius,
    canvasRadius,
    0,
    canvasRadius,
    canvasRadius,
    canvasRadius
  );
  gradient.addColorStop(0.0, "rgba(255,255,255,1.0)");
  gradient.addColorStop(0.5, "rgba(255,255,255,0.5)");
  gradient.addColorStop(1.0, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvasW, canvasH);
  ctx.restore();
};

const getTexture = () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const diameter = textureSize;
  canvas.width = diameter;
  canvas.height = diameter;
  const canvasRadius = diameter / 2;

  /* gradation circle
    ------------------------ */
  drawRadialGradation(ctx, canvasRadius, canvas.width, canvas.height);
  const texture = new THREE.Texture(canvas);
  texture.type = THREE.FloatType;
  texture.needsUpdate = true;
  return texture;
};

const gui = new GUI();
const guiControls = new (function () {
  this.ParticleSize = 100;
})();

gui.add(guiControls, "ParticleSize", 10, 300);

const getPointMesh = (num, vels, type, ParticleSize) => {
  // geometry
  const bufferGeometry = new THREE.BufferGeometry();
  const vertices = [];
  const velocities = [];
  const colors = [];
  const adjustSizes = [];
  const masses = [];
  const colorType = Math.random() > 0.3 ? "single" : "multiple";
  const singleColor = getRandomNum(100, 20) * 0.01;
  const multipleColor = () => getRandomNum(100, 1) * 0.01;
  let rgbType;
  const rgbTypeDice = Math.random();
  if (rgbTypeDice > 0.66) {
    rgbType = "red";
  } else if (rgbTypeDice > 0.33) {
    rgbType = "yellow";
  } else {
    rgbType = "blue";
  }
  for (let i = 0; i < num; i++) {
    const pos = new THREE.Vector3(0, 0, 0);
    vertices.push(pos.x, pos.y, pos.z);
    velocities.push(vels[i].x, vels[i].y, vels[i].z);
    if (type === "seed") {
      let size;
      if (type === "trail") {
        size = Math.random() * 0.1 + 0.1;
      } else {
        size = Math.pow(vels[i].y, 2) * 0.04;
      }
      if (i === 0) size *= 1.1;
      adjustSizes.push(size);
      masses.push(size * 0.017);
      colors.push(1.0, 1.0, 1.0, 1.0);
    } else {
      const size = getRandomNum(guiControls.ParticleSize, 10) * 0.001;
      adjustSizes.push(size);
      masses.push(size * 0.017);

      if (colorType === "multiple") {
        colors.push(multipleColor(), multipleColor(), multipleColor(), 1.0);
      } else {
        switch (rgbType) {
          case "red":
            colors.push(singleColor, 0.1, 0.1, 1.0);
            break;
          case "yellow":
            colors.push(singleColor, singleColor, 0.1, 1.0);
            break;
          case "blue":
            colors.push(0.1, 0.1, singleColor, 1.0);
            break;
          default:
            colors.push(singleColor, 0.1, 0.1, 1.0);
        }
      }
    }
  }
  bufferGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  );
  bufferGeometry.setAttribute(
    "velocity",
    new THREE.Float32BufferAttribute(velocities, 3)
  );
  bufferGeometry.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(colors, 4)
  );
  bufferGeometry.setAttribute(
    "adjustSize",
    new THREE.Float32BufferAttribute(adjustSizes, 1)
  );
  bufferGeometry.setAttribute(
    "mass",
    new THREE.Float32BufferAttribute(masses, 1)
  );

  // material
  const shaderMaterial = new THREE.RawShaderMaterial({
    uniforms: {
      size: {
        type: "f",
        value: textureSize,
      },
      texture: {
        type: "t",
        value: getTexture(),
      },
    },
    transparent: true,
    // Display of "blending: THREE.AdditiveBlending" does not work properly if "depthWrite" property is set to true.
    // Therefore, it is necessary to make it false in the case of making the image transparent by blending.
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
  });

  return new THREE.Points(bufferGeometry, shaderMaterial);
};

class ParticleMesh {
  constructor(num, vels, type) {
    this.particleNum = num;
    this.timerStartFading = 10;
    this.mesh = getPointMesh(num, vels, type);
  }

  update(gravity) {
    if (this.timerStartFading > 0) this.timerStartFading -= 0.3;
    const { position, velocity, color, mass } = this.mesh.geometry.attributes;
    const decrementRandom = () => (Math.random() > 0.5 ? 0.98 : 0.96);
    const decrementByVel = (v) => (Math.random() > 0.5 ? 0 : (1 - v) * 0.1);
    for (let i = 0; i < this.particleNum; i++) {
      const { x, y, z } = getOffsetXYZ(i);
      velocity.array[y] += gravity.y - mass.array[i];
      velocity.array[x] *= friction;
      velocity.array[z] *= friction;
      velocity.array[y] *= friction;
      position.array[x] += velocity.array[x];
      position.array[y] += velocity.array[y];
      position.array[z] += velocity.array[z];
      const { a } = getOffsetRGBA(i);
      if (this.timerStartFading <= 0) {
        color.array[a] *= decrementRandom() - decrementByVel(color.array[a]);
        if (color.array[a] < 0.001) color.array[a] = 0;
      }
    }
    position.needsUpdate = true;
    velocity.needsUpdate = true;
    color.needsUpdate = true;
  }
  disposeAll() {
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
  }
}

class BasicFireWorks {
  constructor(mouse, count) {
    this.meshGroup = new THREE.Group();
    this.isExplode = true;
    this.life = 150;
    this.flowerSizeRate = THREE.Math.mapLinear(count, 100, 300, 0.4, 0.7);
    this.flower = this.getFlower(
      new THREE.Vector3(mouse[0], mouse[1], 0),
      count
    );
    this.meshGroup.add(this.flower.mesh);
  }

  getFlower(pos, count) {
    const num = count;
    const vels = [];
    let radius;
    const dice = Math.random();

    if (dice > 0.5) {
      for (let i = 0; i < num; i++) {
        radius = getRandomNum(120, 60) * 0.01;
        const theta = THREE.Math.degToRad(Math.random() * 180);
        const phi = THREE.Math.degToRad(Math.random() * 360);
        const vx = Math.sin(theta) * Math.cos(phi) * radius;
        const vy = Math.sin(theta) * Math.sin(phi) * radius;
        const vz = Math.cos(theta) * radius;
        const vel = new THREE.Vector3(vx, vy, vz);
        vel.multiplyScalar(this.flowerSizeRate);
        vels.push(vel);
      }
    } else {
      const zStep = 180 / num;
      const trad = (360 * (Math.random() * 20 + 1)) / num;
      const xStep = trad;
      const yStep = trad;
      radius = getRandomNum(120, 60) * 0.01;
      for (let i = 0; i < num; i++) {
        const sphereRate = Math.sin(THREE.Math.degToRad(zStep * i));
        const vz = Math.cos(THREE.Math.degToRad(zStep * i)) * radius;
        const vx =
          Math.cos(THREE.Math.degToRad(xStep * i)) * sphereRate * radius;
        const vy =
          Math.sin(THREE.Math.degToRad(yStep * i)) * sphereRate * radius;
        const vel = new THREE.Vector3(vx, vy, vz);
        vel.multiplyScalar(this.flowerSizeRate);
        vels.push(vel);
      }
    }

    const particleMesh = new ParticleMesh(num, vels, gravity);
    particleMesh.mesh.position.set(pos.x, pos.y, pos.z);
    return particleMesh;
  }
  update() {
    this.flower.update(gravity);
    if (this.life > 0) this.life -= 1;
  }
}

export default function Fireworks({ count }) {
  const mesh = useRef();
  const fireworksInstances = useRef([]);
  const mouse_pos = useRef([0, 0]);
  const { viewport } = useThree();

  const launchFireWorks = () => {
    const fw = new BasicFireWorks(mouse_pos.current, count);
    fireworksInstances.current.push(fw);
    mesh.current.add(fw.meshGroup);
  };

  useFrame(({ mouse }) => {
    const x = (mouse.x * viewport.width) / 2;
    const y = (mouse.y * viewport.height) / 2;
    mouse_pos.current = [x, y];

    const exploadedIndexList = [];
    for (let i = fireworksInstances.current.length - 1; i >= 0; i--) {
      const instance = fireworksInstances.current[i];
      instance.update();
      if (instance.isExplode) exploadedIndexList.push(i);
    }
    for (let i = 0, l = exploadedIndexList.length; i < l; i++) {
      const index = exploadedIndexList[i];
      const instance = fireworksInstances.current[index];
      if (!instance) return;

      if (instance.life <= 0) {
        mesh.current.remove(instance.meshGroup);
        if (instance.tailMeshGroup) {
          instance.tails.forEach((v) => {
            v.disposeAll();
          });
        }
        instance.flower.disposeAll();
        fireworksInstances.current.splice(index, 1);
      }
    }
  });

  return (
    <mesh ref={mesh} receiveShadow>
      <Plane
        args={[50, 30]}
        position={[0, 20, 0]}
        rotation={[0, 0, 0]}
        onClick={launchFireWorks}
      >
        <meshBasicMaterial color="#08060b" />
      </Plane>
    </mesh>
  );
}
export { BasicFireWorks };
