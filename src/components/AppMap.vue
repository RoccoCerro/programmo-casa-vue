<template>
  <section class="my-map">
    <div class="container">
      <div id="map"></div>
    </div>
  </section>
</template>

<script>
  export default {
    mounted() {

      let center = [45.456429, 9.164435];
      const map = tt.map({
        key: 'SmzJJ1e9vacLwiqfqgxPWAvQ7Ey33PfG',
        container: 'map',
        center: center,
        // zoom: 10,
      });

      map.on('load', () => {
        new tt.Marker().setLngLat(center).addTo(map);
      });
    }
  }
</script>

<style lang="scss" scoped>
  #map{
    width: 100%;
    height: 300px;
  }
</style>