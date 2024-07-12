<template>
  <div class="container">
    <!-- <div class="heading">
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
    <h3>Metri Quadrati: </h3><p>{{ sqrMeters }}</p> -->
    <div class="row">
      <div class="col">
        <div class="card p-3">
          <div class="col-lg-6 mb-3">
            <router-link :to="{name: 'messages', params: {id: apartment.id}}" class="btn btn-primary">Contatta il proprietario</router-link>
          </div>
          <div v-if="apartment" class="card-text">
            {{ apartment.title_apartment }}
          </div>
          <div v-if="apartment.services" v-for="service in apartment.services">
            {{ service.name }}
          </div>
        </div>
      </div>
    </div>
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
import axios from 'axios'
export default {
  props:{
    id: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      apartment: null
      // apartmentId: sessionStorage.getItem("apartmentId"),
      // titleApartment: sessionStorage.getItem("titleApartment"),
      // rooms: sessionStorage.getItem("rooms"),
      // beds: sessionStorage.getItem("beds"),
      // bathrooms: sessionStorage.getItem("bathrooms"),
      // sqrMeters: sessionStorage.getItem("sqrMeters"),
      // imgApartment: sessionStorage.getItem("imgApartment"),
      // description: sessionStorage.getItem("description"),
      // latitude: sessionStorage.getItem("latitude"),
      // longitude: sessionStorage.getItem("longitude"),
      // completeAddress: sessionStorage.getItem("completeAddress"),
    }
  },
  methods: {
    fetchApartment(){
      axios.get( 'http://127.0.0.1:8000/api/apartments/' + this.id)
      .then(res => {
          this.apartment = res.data.apartment
          console.log(this.apartment)
      })
      .catch((err)=>{
        this.$router.push({
          name: 'not-found',
          params: { pathMatch: this.$route.path.substring(1).split('/') },
        })
      })
    }
  },
  components:{

  },
  created() {
    this.fetchApartment()
    console.log(this.id);
  }
}
</script>

<style lang="scss" scoped></style>