<template>
  <div class="container">
    <h1 class="text-2xl my-8 text-center mb-3 my_title">Visita i nostri Appartamenti!</h1>
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
  <div class="container mt-3 mb-3">

    <div class="my_section-title my-5">
      <div class="line mx-5"></div>
      <h1 class="text-2xl my-8 text-center mb-3 my_title">I Premium</h1>
    </div>

    <div class="row gy-3 gx-3 row-cols-1 row-cols-md-2 row-cols-lg-3">
      <AppApartmentCardSponsored v-for="apartment in apartments" :apartment="apartment"/>
      
    </div>
  </div>


  <div class="container">
    <div class="my_section-title my-5">
      <div class="line mx-5"></div>
      <h1 class="text-2xl my-8 text-center mb-3 my_title">Gli Standard</h1>
    </div>
    <div class="row gy-2 gx-2 flex-wrap row-cols-1 row-cols-md-2 row-cols-lg-3">
      <AppApartmentCard v-if="zone === ''"  v-for="apartment in apartments" :apartment="apartment"/>
    </div>
  </div>

</template>

<style lang="scss" scoped>
@use '../style/partials/app-apartments';

.my_section-title{
  position: relative;
  .line{
    border: 1px solid;
  }
  .my_title{
    position: absolute;
    font-size: 20px;
    background-color: white;
    top: -12px;
    display: inline;
    margin-left: 50%;
    transform: translate(-50%, 0px);
    padding-left: 10px;
    padding-right: 10px;
  }
}

</style>

<script>
// var  _ =  require ( 'lodash' );
import axios from 'axios'
// import useMath from '@vueuse/math'
import _ from 'lodash'
import AppApartmentCard from '../components/AppApartmentCard.vue'
import AppApartmentCardSponsored from '../components/AppApartmentCardSponsored.vue'

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
  components:{
    AppApartmentCard,
    AppApartmentCardSponsored
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

