window.onload = function() {
  Player.init();
}

Player = {
  init: function() {
    Player.container = document.getElementById("webgl-player");

    Player.size = {
      width: Player.container.offsetWidth,
      height: Player.container.offsetHeight
    };

    Player.scene = new THREE.Scene();
    Player.camera = new THREE.PerspectiveCamera(45.0, Player.size.width / Player.size.height, 2, 8000);
    Player.camera.position.z = 300;
    Player.scene.add(Player.camera);

    Player.light = new THREE.AmbientLight();
    Player.scene.add(Player.light);

    textureLoader = new THREE.TextureLoader();

    textureLoader.load("./object/texture.jpg", function(texture) {
      Player.texture = texture;
      Player.loadModel();
    });

    Player.renderer = new THREE.WebGLRenderer();

    Player.renderer.setSize(Player.size.width, Player.size.height);
    Player.container.appendChild(Player.renderer.domElement);

    Player.controls = new THREE.TrackballControls(Player.camera, Player.container);

    Player.animate();
  },

  loadModel: function() {
    objectLoader = new THREE.OBJLoader();

    objectLoader.load("./object/object.obj", function(object) {
      object.traverse(function(child) {
        if (child instanceof THREE.Mesh) {
          child.material.map = Player.texture;
        }
      });
      Player.scene.add(object);
    });
  },

  animate: function() {
    requestAnimationFrame(Player.animate);
    Player.controls.update();
    Player.renderer.render(Player.scene, Player.camera);
  }
};
