<script>
// import { defineAsyncComponent } from 'vue';
import AppMain from './components/AppMain.vue';

export default {
  components: {
    AppMain
  },
  data() {
    return {
      message: 'Ciao mondo'
    }
  }
}
</script>

<template>
  <AppMain />
</template>

<style lang="scss">
@use './style/general.scss';
</style>
