<template>
  <div class="card h-100">
    <img :src="'http://127.0.0.1:8000/storage/' + apartment.img_apartment" class="card-img-top" alt="">
    <div class="card-body">
      <RouterLink :to="{ name: 'apartment.show', params: {id: apartment.id} }">
        <h6 class="title">{{ apartment.title_apartment }}</h6>
      </RouterLink>
      <p class="card-text"></p>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      apartment:{
        require: true
      }
    },
    mounted(){
      console.log('console.log.card'+this.apartment)
    }
  }
</script>

<style lang="scss" scoped>

</style>