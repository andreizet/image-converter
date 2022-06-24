<template>
  <div id="app" style="text-align: center">
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
    console.log(process.env.NODE_ENV);
    return {
      apiPath: process.env.NODE_ENV === 'production' ? 'https://85p6eei9pa.execute-api.us-east-1.amazonaws.com/dev/' : 'http://localhost:3000/dev',
      image: null,
      imageName: null,
    };
  },
  methods: {
    previewFiles(event) {
      const file = event.srcElement.files[0];
      this.imageName = file.name;

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = async () => {
        this.image = reader.result;

        const response = await fetch(this.apiPath, {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            image: this.image,
          }),
        });

        const resp = await response.json();

        const a = document.createElement('a');
        a.href = resp.message;
        a.download = this.imageName.replace('.png', '-resized.png');
        a.click();
      };
    },
  },
};
</script>
