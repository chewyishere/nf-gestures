let scene,
  camera,
  renderer,
  orbitControls,
  planeMesh,
  canvasTexture,
  isAutoLaunch = true;

const gravity = new THREE.Vector3(0, -0.005, 0);
const friction = 0.998;
const textureSize = 128.0;
const fireworksInstances = [];

let outputDom;

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

/* datGUI
--------------------------------------*/
const gui = new dat.GUI();
const guiControls = new (function () {
  this.ParticleSize = 300;
  this.AutoLaunch = true;
})();
gui.add(guiControls, "ParticleSize", 100, 600);
gui.add(guiControls, "AutoLaunch").onChange((e) => {
  isAutoLaunch = e;
  outputDom.style.cursor = isAutoLaunch ? "auto" : "pointer";
});

const getRandomNum = (max = 0, min = 0) =>
  Math.floor(Math.random() * (max + 1 - min)) + min;

const launchFireWorks = () => {
  if (fireworksInstances.length > 5) return;
  const fw = new BasicFIreWorks();
  fireworksInstances.push(fw);
  scene.add(fw.meshGroup);
};

const autoLaunch = () => {
  if (!isAutoLaunch) return;
  if (Math.random() > 0.7) launchFireWorks();
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

canvasTexture = getTexture();

const getPointMesh = (num, vels, type) => {
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
    rgbType = "green";
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
          case "green":
            colors.push(0.1, singleColor, 0.1, 1.0);
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
  bufferGeometry.addAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3).setDynamic(true)
  );
  bufferGeometry.addAttribute(
    "velocity",
    new THREE.Float32BufferAttribute(velocities, 3).setDynamic(true)
  );
  bufferGeometry.addAttribute(
    "color",
    new THREE.Float32BufferAttribute(colors, 4).setDynamic(true)
  );
  bufferGeometry.addAttribute(
    "adjustSize",
    new THREE.Float32BufferAttribute(adjustSizes, 1).setDynamic(true)
  );
  bufferGeometry.addAttribute(
    "mass",
    new THREE.Float32BufferAttribute(masses, 1).setDynamic(true)
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
        value: canvasTexture,
      },
    },
    transparent: true,
    // Display of "blending: THREE.AdditiveBlending" does not work properly if "depthWrite" property is set to true.
    // Therefore, it is necessary to make it false in the case of making the image transparent by blending.
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexShader: document.getElementById("vs").textContent,
    fragmentShader: document.getElementById("fs").textContent,
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

class BasicFIreWorks {
  constructor() {
    this.meshGroup = new THREE.Group();
    this.isExplode = true;
    this.petalsNum = 300;
    this.life = 150;
    this.flowerSizeRate = THREE.Math.mapLinear(
      this.petalsNum,
      100,
      400,
      0.4,
      0.7
    );
    this.flower = this.getFlower(new THREE.Vector3(0, 0, 0));
    this.meshGroup.add(this.flower.mesh);
  }

  getFlower(pos) {
    const num = this.petalsNum;
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

    const particleMesh = new ParticleMesh(num, vels);
    particleMesh.mesh.position.set(pos.x, pos.y, pos.z);
    return particleMesh;
  }
  update(gravity) {
    this.flower.update(gravity);
    if (this.life > 0) this.life -= 1;
  }
}

const render = () => {
  orbitControls.update();

  const exploadedIndexList = [];

  for (let i = fireworksInstances.length - 1; i >= 0; i--) {
    const instance = fireworksInstances[i];
    instance.update(gravity);
    if (instance.isExplode) exploadedIndexList.push(i);
  }

  for (let i = 0, l = exploadedIndexList.length; i < l; i++) {
    const index = exploadedIndexList[i];
    const instance = fireworksInstances[index];
    if (!instance) return;

    /*
			Be careful because js heap size will continue to increase unless you do the following:
			- Remove unuse mesh from scene 
			- Execute dispose method of Geometres and Materials in the Mesh
		*/

    if (instance.life <= 0) {
      scene.remove(instance.meshGroup);
      if (instance.tailMeshGroup) {
        instance.tails.forEach((v) => {
          v.disposeAll();
        });
      }
      instance.flower.disposeAll();
      fireworksInstances.splice(index, 1);
    }
  }

  renderer.render(scene, camera);

  requestAnimationFrame(render);
};

const onResize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
};

const onClickWindow = () => {
  if (isAutoLaunch) return;
  launchFireWorks();
};

const init = () => {
  outputDom = document.querySelector("#WebGL-output");

  /* scene
    -------------------------------------------------------------*/
  scene = new THREE.Scene();
  //scene.fog = new THREE.Fog(0x000d20, 0, 1000 * 3);

  /* camera
    -------------------------------------------------------------*/
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
  );
  camera.position.set(0, -40, 170);
  //camera.position.set(0, 250, 0);
  //camera.position.set(0, -250, 0);
  camera.lookAt(scene.position);

  /* renderer
    -------------------------------------------------------------*/
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  // renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setClearColor(new THREE.Color(0x000000), 0);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.setClearAlpha(0);

  /* OrbitControls
    -------------------------------------------------------------*/
  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
  orbitControls.autoRotate = false;
  orbitControls.enableDamping = true;
  orbitControls.dampingFactor = 0.2;

  /* AmbientLight
    -------------------------------------------------------------*/
  const ambientLight = new THREE.AmbientLight(0x666666);
  scene.add(ambientLight);

  /* SpotLight
    -------------------------------------------------------------*/
  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.distance = 2000;
  spotLight.position.set(-500, 1000, 0);
  spotLight.castShadow = true;
  scene.add(spotLight);

  /* Plane
    --------------------------------------*/
  const planeGeometry = new THREE.PlaneGeometry(200, 200, 10, 10);
  const planeMaterial = new THREE.MeshLambertMaterial({
    //color: 0xffffff,
    side: THREE.DoubleSide,
    wireframe: true,
  });
  planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
  planeMesh.receiveShadow = true;
  planeMesh.rotation.x = -0.5 * Math.PI;
  planeMesh.position.x = 0;
  planeMesh.position.y = -50;
  planeMesh.position.z = 0;
  scene.add(planeMesh);

  /* resize
    -------------------------------------------------------------*/
  window.addEventListener("resize", onResize);

  /* rendering start
    -------------------------------------------------------------*/
  document.getElementById("WebGL-output").appendChild(renderer.domElement);
  requestAnimationFrame(render);

  window.addEventListener("click", onClickWindow);

  setInterval(autoLaunch, 100);
};

document.addEventListener("DOMContentLoaded", () => {
  init();
});
