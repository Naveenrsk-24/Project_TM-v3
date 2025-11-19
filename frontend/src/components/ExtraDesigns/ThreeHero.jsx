"use client";

/**
 * PURE THREE.JS VERSION — NEXT.JS CLIENT COMPONENT
 * ------------------------------------------------
 * This is a 1:1 pure Three.js rewrite that works inside
 * a React (Next.js App Router) client component.
 *
 * No React Three Fiber used.
 * All original logic preserved.
 */

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";

export default function ZFoldCardPureJS() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    RectAreaLightUniformsLib.init();

    // CONFIG
    const config = {
      duration: 800,
      cameraDistance: 1000,
      enableShadows: false,
    };

    // -----------------------------------------------------------------
    // BASE THREE SETUP
    // -----------------------------------------------------------------
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );
    camera.position.set(0, 0, config.cameraDistance);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const rectLight = new THREE.RectAreaLight(0xffffff, 4.0, 2000, 400);
    rectLight.position.set(0, 500, 1200);
    rectLight.lookAt(0, 0, 0);
    scene.add(rectLight);

    // -----------------------------------------------------------------
    // CARD PANELS
    // -----------------------------------------------------------------
    const PANEL_W = 794;
    const PANEL_H = 374.33;

    const cardGroup = new THREE.Group();

    const whiteMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.7,
      metalness: 0,
    });

    const geom = new THREE.BoxGeometry(PANEL_W, PANEL_H, 2, 32, 16, 1);
    const loader = new THREE.TextureLoader();

    const urls = [
      "https://raw.githubusercontent.com/richardevcom/threejs-z-fold-gift-card/main/src/svg/gift-card-top.svg",
      "https://raw.githubusercontent.com/richardevcom/threejs-z-fold-gift-card/main/src/svg/gift-card-middle.svg",
      "https://raw.githubusercontent.com/richardevcom/threejs-z-fold-gift-card/main/src/svg/gift-card-bottom.svg",
    ];

    const topGroup = new THREE.Group();
    const midGroup = new THREE.Group();
    const bottomGroup = new THREE.Group();

    function panel(materialMapUrl, yPos, zPos, rotationX) {
      const map = loader.load(materialMapUrl);
      map.colorSpace = THREE.SRGBColorSpace;

      const mats = [whiteMat, whiteMat, whiteMat, whiteMat,
        new THREE.MeshStandardMaterial({ map, roughness: 0.65, metalness: 0 }),
        whiteMat];

      const mesh = new THREE.Mesh(geom, mats);
      mesh.position.set(0, yPos, zPos);
      mesh.rotation.x = rotationX;
      return mesh;
    }

    const topMesh = panel(urls[0], PANEL_H / 2, 10, Math.PI);
    const midMesh = panel(urls[1], 0, -30, 0);
    const bottomMesh = panel(urls[2], -PANEL_H / 2, -5, -Math.PI);

    topGroup.add(topMesh);
    midGroup.add(midMesh);
    bottomGroup.add(bottomMesh);

    cardGroup.add(topGroup, midGroup, bottomGroup);
    scene.add(cardGroup);

    // -----------------------------------------------------------------
    // INTERACTION
    // -----------------------------------------------------------------
    let isAnimating = false;
    let state = "folded";

    function toggle() {
      if (isAnimating) return;
      state = state === "folded" ? "unfolded" : "folded";
      animateCard();
    }

    function lerp(a, b, t) {
      return a + (b - a) * t;
    }

    function ease(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function animateCard() {
      isAnimating = true;
      const start = performance.now();
      const duration = config.duration;

      const folded = {
        topRot: Math.PI,
        topZ: 10,
        midZ: -30,
        bottomRot: -Math.PI,
        bottomZ: -5,
      };

      const unfolded = {
        topRot: Math.PI / 12,
        topZ: 2,
        midZ: 0,
        bottomRot: -Math.PI / 12,
        bottomZ: -2,
      };

      const target = state === "folded" ? folded : unfolded;

      function frame(t) {
        const progress = Math.min((t - start) / duration, 1);
        const e = ease(progress);

        topGroup.rotation.x = lerp(topGroup.rotation.x, target.topRot, e);
        topGroup.position.z = lerp(topGroup.position.z, target.topZ, e);

        midGroup.position.z = lerp(midGroup.position.z, target.midZ, e);

        bottomGroup.rotation.x = lerp(bottomGroup.rotation.x, target.bottomRot, e);
        bottomGroup.position.z = lerp(bottomGroup.position.z, target.bottomZ, e);

        if (progress < 1) requestAnimationFrame(frame);
        else isAnimating = false;
      }
      requestAnimationFrame(frame);
    }

    // CLICK
    canvas.addEventListener("click", toggle);

    // Keyboard
    window.addEventListener("keydown", (e) => {
      if (e.key === " " || e.key === "Enter") toggle();
      if (e.key === "Escape" && state === "unfolded") toggle();
    });

    // -----------------------------------------------------------------
    // PARALLAX CAMERA
    // -----------------------------------------------------------------
    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener("mousemove", (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // -----------------------------------------------------------------
    // RENDER LOOP
    // -----------------------------------------------------------------
    function loop() {
      requestAnimationFrame(loop);

      camera.position.x = lerp(camera.position.x, mouseX * 120, 0.05);
      camera.position.y = lerp(camera.position.y, mouseY * 90, 0.05);
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }

    loop();

    // Resize
    function onResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", onResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("click", toggle);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-screen h-screen"
      aria-label="Interactive 3D gift card"
      role="img"
    />
  );
}