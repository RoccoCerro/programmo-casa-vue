<template>
  <div class="container">
    <div class="heading">
      <div class="row align-items-center">
        <div class="col-lg-6">
          <h1>{{ title }}</h1>
          <h3>Indirizzo: </h3><p>{{ completeAddress }}</p>
        </div>
        <div class="col-lg-6">
          <router-link :to="'/messages'" class="btn btn-primary">Contatta il proprietario</router-link>
        </div>
      </div>
    </div>
    <img class="my-3" :src="'http://127.0.0.1:8000/storage/' + imgApartment" alt="">
    <h3>Descrizione</h3>
    <p>{{ description }}</p>
    <h3>Numero di stanze: </h3><p>{{ rooms }}</p>
    <h3>Numero di bagni: </h3><p>{{ bathrooms }}</p>
    <h3>Numero di stanze da letto: </h3><p>{{ beds }}</p>
    <h3>Metri Quadrati: </h3><p>{{ sqrMeters }}</p>
    <h3>Servizi Attivi:</h3>
    <p v-for="service in services">{{service}}</p>
    
  </div>

  
</template>


 <!-- // Save data to sessionStorage
sessionStorage.setItem("key", "value");

// Get saved data from sessionStorage
let data = sessionStorage.getItem("key");

// Remove saved data from sessionStorage
sessionStorage.removeItem("key");

// Remove all saved data from sessionStorage
sessionStorage.clear(); -->
<script>

export default {
  data() {
    return {
      apartmentId: sessionStorage.getItem("apartmentId"),
      titleApartment: sessionStorage.getItem("titleApartment"),
      rooms: sessionStorage.getItem("rooms"),
      beds: sessionStorage.getItem("beds"),
      bathrooms: sessionStorage.getItem("bathrooms"),
      sqrMeters: sessionStorage.getItem("sqrMeters"),
      imgApartment: sessionStorage.getItem("imgApartment"),
      description: sessionStorage.getItem("description"),
      latitude: sessionStorage.getItem("latitude"),
      longitude: sessionStorage.getItem("longitude"),
      completeAddress: sessionStorage.getItem("completeAddress"),
      services: sessionStorage.getItem("services")
    }
  },
  methods: {


  },
  components:{

  },
  created() {
    console.log(this.services)
  }
}
</script>

<style lang="scss" scoped></style>