<template>
  <div class="col">
    <div class="card h-100" v-if="apartment.sponsorships.length > 0">
      <!-- mostriamo gli appartamenti in evidenza -->
      <div class="card-body my_card-body">
        <img :src="'http://127.0.0.1:8000/storage/' + apartment.img_apartment" class="card-img-top img_card" alt="">
        <div class="my_card-title">
          <RouterLink :to="{ name: 'apartment.show', params: {id: apartment.id} }">
          <h4>
            {{ apartment.title_apartment }}
          </h4>
          <div class="my-shadow"></div>
        </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
a{
  text-decoration: none;
  color: currentColor
};
.my_card-body{
  padding: 0;
  position: relative;
  display: flex;
  justify-content: center;
  .img_card{
  height: 300px;
  object-fit: cover;
  border: none;
  border-top-left-radius: var(--bs-card-inner-border-radius);
  border-top-right-radius: var(--bs-card-inner-border-radius);
  border-bottom-left-radius: var(--bs-card-inner-border-radius);
  border-bottom-right-radius: var(--bs-card-inner-border-radius);
}
.my_card-title{
    position: absolute;
    top: 20px;
    // left: 0;
    // right: 0;
    border: 2px solid black;
    background-color: white;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    // box-shadow: 10px 5px;
    text-transform: capitalize;
    h4{
      font-size: 20px;
      font-weight: 500;
      line-height: 20px;
    }
    .my-shadow{
      height: 10px;
      background-color: black;
      position: absolute;
      margin-left: 7px;
      margin-right: 7px;
      // width: calc(100% - 7px);
      top: 48px;
      left: 0;
      right: 0;
    }
  }
}

</style>

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



