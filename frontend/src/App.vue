<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.svg" width="200" height="200">
    <h3>Choose your image</h3>
    <h5>Allowed formats: PNG</h5>
    <br>
    <label for="image">
      <input type="file"
             id="image"
             @change="previewFiles"
             name="image"
             accept="image/png">
    </label>
    <template v-if="image">
      <hr>
      <h2>Uploaded image:</h2>
      <img :src="image" alt="Image to transform">
    </template>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      image: null,
    };
  },
  methods: {
    previewFiles(event) {
      const file = event.srcElement.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.image = reader.result;
      };
      reader.onerror = () => {
        console.log('there are some problems');
      };
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
