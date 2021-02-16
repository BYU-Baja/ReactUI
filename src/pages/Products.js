import React from 'react';
import '@google/model-viewer';
import ModelViewer from 'react-model-viewer';

function Products() {
  return (
    <div className='products'>
      <script type="module"
    src="https://unpkg.com/@google/model-viewer@<version>/dist/model-viewer.min.js">
</script>
<script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
<script nomodule src="https://unpkg.com/@google/model-viewer/dist/model-viewer-legacy.js"></script>
      {/* <model-viewer camera-controls alt="A 3D model of an astronaut" src="/Users/justinmiller/taste_of_mqtt_in_react/Astronaut.glb"></model-viewer> */}
      
      <model-viewer id="lazy-load" camera-controls reveal="interaction" src="/Users/justinmiller/taste_of_mqtt_in_react/Astronaut.glb" alt="A 3D model of a damaged helmet">
  <div id="lazy-load-poster" slot="poster"></div>
  <div id="button-load" slot="poster">Load 3D Model</div>
</model-viewer>
<ModelViewer type="gtlf" src="/Users/justinmiller/taste_of_mqtt_in_react/Astronaut.glb" />
      {/* <h1>Products</h1> */}
      <h1>why no astronaut?</h1>
    </div>
  );
}

export default Products;