<template>
  <div class="col" >
    <div class="card h-100" v-if="apartment.sponsorships.length > 0">
      <!-- mostriamo gli appartamenti in evidenza -->
      <div class="card-header">
        <img :src="'http://127.0.0.1:8000/storage/' + apartment.img_apartment" class="card-img-top" alt="">
      </div>
      <div class="card-body">
        {{ apartment.sponsorships.apartment_id }}
        <RouterLink :to="{ name: 'apartment.show', params: {id: apartment.id} }">
          <p>
            {{ apartment.title_apartment }}
          </p>
        </RouterLink>
      </div>
    </div>
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