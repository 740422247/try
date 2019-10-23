<template>
  <div id="three"></div>
</template>
<script>
import * as THREE from "three";
import OrbitControls from "three-orbitcontrols";
import { OBJLoader } from "three-obj-mtl-loader";
import Stats from "stats-js";

export default {
  name: "webGL",
  mounted() {
    this.init();
  },
  methods: {
    init() {
      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera(
        68,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      var renderer = new THREE.WebGLRenderer();
      var scene = new THREE.Scene();
      scene.add(camera);
      new OBJLoader().load("/static/model/test.obj", obj => {
        scene.add(obj);
      });
      var controls = new OrbitControls(camera);
      function animate() {
        renderer.render(scene, camera);
        Stats();
        controls.update();
        requestAnimationFrame(animate); //再次调用animate方法实现刷新
      }
      // var renderer = new THREE.WebGLRenderer();
      // renderer.setSize(window.innerWidth, window.innerHeight);
      // document.querySelector("#three").appendChild(renderer.domElement);

      // var geometry = new THREE.BoxGeometry(1, 1, 1);
      // var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

      // var cube = new THREE.Mesh(geometry, material);

      // scene.add(cube);

      // camera.position.set(0, 0, 5);

      // var animate = function() {
      //   requestAnimationFrame(animate);

      //   cube.rotation.x += 0.01;
      //   cube.rotation.y += 0.01;
      //   // cube.rotation.z += 0.01;

      //   renderer.render(scene, camera);
      // };

      animate();
    }
  }
};
</script>
