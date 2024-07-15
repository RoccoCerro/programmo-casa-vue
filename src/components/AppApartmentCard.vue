<template>
    <div class="card h-100">
      <img :src="'http://127.0.0.1:8000/storage/' + apartment.img_apartment" class="card-img-top  h-100" alt="">
      <div class="card-body">
        <RouterLink :to="{ name: 'apartment.show', params: {id: apartment.id} }">
        <p>
          {{ apartment.title_apartment }}
        </p>
      </RouterLink>
      </div>
      <!-- </router-link> -->
    </div>
</template>

<script>

export default {
  props:{
    apartment:{
      type: Object,
      required: true
    }
  },
  data() {
    return {
      
    }
  },
  methods: {
    
  },
  created() {
    
  }
}
</script>

<style lang="scss" scoped></style>