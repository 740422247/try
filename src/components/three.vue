<template>
  <div id="three"></div>
</template>
<script>
import * as three from "three";
export default {
  name: "webGL",
  mounted() {
    this.init();
  },
  methods: {
    init() {
      var scene = new three.Scene();
      var camera = new three.PerspectiveCamera(
        68,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );

      var renderer = new three.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.querySelector("#three").appendChild(renderer.domElement);

      var geometry = new three.BoxGeometry(1, 1, 1);
      var material = new three.MeshBasicMaterial({ color: 0x00ff00 });

      var cube = new three.Mesh(geometry, material, geometry1, material1);

      scene.add(cube);

      camera.position.z = 5;

      var material1 = new three.LineBasicMaterial({ color: 0x0000ff });
      var geometry1 = new three.Geometry();
      geometry1.vertices.push(new three.Vector3(-10, 0, 0));
      geometry1.vertices.push(new three.Vector3(0, 10, 0));
      geometry1.vertices.push(new three.Vector3(10, 0, 0));
      var line = new three.Line( geometry1, material1 );

      var animate = function() {
        requestAnimationFrame(animate);

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        // cube.rotation.z += 0.01;

        renderer.render(scene, camera);
      };

      animate();
    }
  }
};
</script>
