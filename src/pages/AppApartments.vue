<template>
  <div class="container">
    <h1 class="text-2xl my-8">Visita i nostri appartamenti</h1>
    <div>
      <div class="my-errors text-danger" v-if="errorSearch !== ''">
        {{ errorSearch }}
      </div>
      <form class="d-flex" role="search" @submit.prevent="searchForZone"> 
        
        <input v-model="zone" class="form-control me-2" type="search" placeholder="Cerca" aria-label="Search" @keyup="search">
        <!-- @keyup="fetchSuggestions"  -->
        <!-- <RouterLink class="nav-link" :to="{ name: 'advanced-search' }"> -->
        <button class="btn btn-outline-dark" type="submit">Cerca</button>
        <!-- </RouterLink> -->
      </form>
      <ul v-if="zone" class="suggestions list-unstyled">
        <li v-for="(suggestion, i) in suggestions" class="suggestion" @click="selectSuggestion(suggestion)">
          {{ suggestion.address.freeformAddress }}
        </li>
      </ul>
    </div>
  </div>

  <!-- MOSTRIAMO GLI APPARTAMENTI IN EVIDENZA -->
  <div class="container mt-3 mb-3 text-center">
    <h1>appartamenti in evidenza</h1>
    <div class="row gy-3 gx-3 row-cols-1 row-cols-md-2 row-cols-lg-3">
      <div class="col" v-for="apartment in apartments">
        <div v-if="apartment.sponsorships.length > 0" class="card h-100">
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
    </div>
  </div>


  <div class="container">
    <h1>Altri appartamenti</h1>
    <div class="row gy-2 gx-2 flex-wrap row-cols-1 row-cols-md-2 row-cols-lg-3">
      <div class="col" v-if="zone === ''" v-for="apartment in apartments">
      
          <div class="card h-100">
            <!-- <router-link :to="'/apartment'" class="card h-100" @click="bringMeToApartment(apartment.id, apartment.title_apartment, apartment.rooms, apartment.beds, apartment.bathrooms, apartment.sqr_meters, apartment.img_apartment, apartment.description, apartment.latitude, apartment.longitude, apartment.complete_address)"> -->
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
        
        
      </div>
    </div>
  </div>

</template>

<script>
// var  _ =  require ( 'lodash' );
import axios from 'axios'
// import useMath from '@vueuse/math'
import _ from 'lodash'

export default {
  data() {
    return {
      zone:'',
      suggestions:[],
      apartments: [],
      currentPage: 1,
      lastPage: null,
      count: 0,
      errorSearch: ''
    }
  },
  methods: {
    bringMeToApartment(id, titleApartment, rooms, beds, bathrooms, sqrMeters, imgApartment, description, latitude, longitude, completeAddress){
    },
    changePage(n) {
      if (n === this.currentPage) return
      this.currentPage = n
      this.fetchPosts()
    },

    search: _.debounce(async function() {
      if (!this.zone) {
        this.suggestions = []
        return
      }

      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/suggestions?parametro=${this.zone}`)
        this.suggestions = response.data.response.results
        console.log(response.data.response.results)
      } catch (error) {
        console.error(error)
      }

      sessionStorage.setItem('latitude', '');
      sessionStorage.setItem('longitude', '');

    }, 500),
    fetchApartments() {

      axios.get('http://127.0.0.1:8000/api/apartments', {
        params: {
          page: this.currentPage,
          // perPage: 9
        }
      })
        .then((res) => {
          this.apartments = res.data.results.data
          this.lastPage = res.data.results.last_page
        })

    },
    searchForZone() {
      if (sessionStorage.getItem('latitude') !== ''){
        sessionStorage.setItem('zone', this.zone);
        this.$router.push('/advanced-search')
        
        return true
      }else{
        this.errorSearch = 'Seleziona una via suggerita'
        return false
      }
    },
    selectSuggestion(el){
      this.zone = el.address.freeformAddress
      this.suggestions = ''

      sessionStorage.setItem('latitude', el.position.lat);
      sessionStorage.setItem('longitude', el.position.lon);
      
    },
  },
  created() {
    this.fetchApartments();
    sessionStorage.setItem('latitude', '');
    sessionStorage.setItem('longitude', '');
  }
}
</script>

<style lang="scss" scoped>
@use '../style/partials/app-apartments';
</style>