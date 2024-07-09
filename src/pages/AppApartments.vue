<template>
  <div class="container">
    <h1 class="text-2xl my-8">Visita i nostri appartamenti</h1>
    <div>
      <form class="d-flex" role="search" @submit.prevent="searchForZone">
        <input v-model="zone" class="form-control me-2" type="search" placeholder="Cerca" aria-label="Search" @keyup="fetchSuggestions">
        <!-- @keyup="fetchSuggestions"  -->
        <button class="btn btn-outline-dark" type="submit">Cerca</button>
      </form>
      <ul class="suggestions list-unstyled">
        <li v-for="suggestion in suggestions">
          {{ suggestion.address.freeformAddress }}
        </li>
      </ul>
    </div>
  </div>

  <div class="container search-bar">
    <form class="form-search-latitude my-3" action="">
      <label for="complete_address" class="form-label">Inserisci la latitudine</label>
      <input v-model.number="latitude" @input="calculateLimitsLatLon" type="number" class="form-control my-input-address" id="complete_address" name="complete_address" placeholder="Inserisci la Via e scegli tra quelle suggerite">
      <label for="complete_address" class="form-label">Inserisci la longitudine</label>
      <input v-model.number="longitude" @input="calculateLimitsLatLon" type="number" class="form-control my-input-address" id="complete_address" name="complete_address" placeholder="Inserisci la Via e scegli tra quelle suggerite">
      <label for="complete_address" class="form-label">Inserisci la distanza in Chilometri</label>
      <input v-model.number="distance" @input="calculateLimitsLatLon" type="number" class="form-control my-input-address" id="complete_address" name="complete_address" placeholder="Inserisci la Via e scegli tra quelle suggerite">
    </form>
    <div class="search-bar_solutions">
      <h4>Latitudine: </h4><span>{{ latitude }}</span>
      <h4>Longitudine: </h4><span>{{ longitude }}</span>
      <h4>Distanza: </h4><span>{{ distance }}</span>
      <h4>Latitudine Minima: </h4><span>{{ bounds.latMin }}</span>
      <h4>Latitudine Massima: </h4><span>{{ bounds.latMax }}</span>
      <h4>Longitudine Minima: </h4><span>{{ bounds.lonMin }}</span>
      <h4>Longitudine Massima: </h4><span>{{ bounds.lonMax }}</span>
    </div>

    <hr>
  </div>

  <!-- MOSTRIAMO GLI APPARTAMENTI IN EVIDENZA -->
  <div class="container mt-3 mb-3 text-center">
    <h1>appartamenti in evidenza</h1>
    <div class="row gy-3 gx-3 row-cols-1 row-cols-md-2 row-cols-lg-3">
      <div v-for="apartment in apartments">
        <!-- mostriamo gli appartamenti in evidenza -->

        <div class="card h-100">
          <div class="card-header">
            <img :src="'http://127.0.0.1:8000/storage/' + apartment.img_apartment" class="card-img-top" alt="">

          </div>
          <div class="card-body">
            {{ apartment.sponsorships.apartment_id }}
            <p>
              {{
                apartment.title_apartment
              }}
            </p>
          </div>

        </div>
      </div>

    </div>
  </div>


  <div class="container">
    <h1>Altri appartamenti</h1>
    <div class="row gy-2 gx-2 flex-wrap row-cols-1 row-cols-md-2 row-cols-lg-3">
      <div v-if="zone === ''" v-for="apartment in apartments">
        <div class="card h-100">
          <img :src="'http://127.0.0.1:8000/storage/' + apartment.img_apartment" class="card-img-top" alt="">
          <div class="card-body">
            <p class="card-text">{{ apartment.title_apartment }}</p>
          </div>
        </div>
      </div>

      <div v-else v-for="apartment in apartmentsResearch" class="col">
        <div class="card">
          <img :src="'http://127.0.0.1:8000/storage/' + apartment.img_apartment" class="card-img-top" alt="">
          <div class="card-body">
            <p class="card-text">{{ apartment.title_apartment }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// var  _ =  require ( 'lodash' );
import axios from 'axios'
// import useMath from '@vueuse/math'

export default {
  data() {
    return {
      zone:'',
      suggestions:[],
      apartmentsResearch: '',
      apartments: [],
      currentPage: 1,
      lastPage: null,
      // i set the datas used to calculate the bounds
      latitude: 45.482516,
      longitude: 9.168860,
      distance: 20,
      bounds: {
        latMin: 0,
        latMax: 0,
        lonMin: 0,
        lonMax: 0,
      }
    }
  },
  methods: {
    changePage(n) {
      if (n === this.currentPage) return
      this.currentPage = n
      this.fetchPosts()
    },
    fetchSuggestions(){
      axios.get('http://127.0.0.1:8000/api/suggestions', {
        params: {
          page: this.currentPage,
          parametro: this.zone,
          // perPage: 9
        }
      })
      .then((res) => {
        this.suggestions = res.data.response.results
        console.log(res.data.response.results)
      })
    },
    fetchApartments() {

      axios.get('http://127.0.0.1:8000/api/apartments', {
        params: {
          page: this.currentPage,
          // perPage: 9
        }
      })
        .then((res) => {
          // console.log(res.data.posts) // senza la paginazione
          // console.log(res.data.results.data)
          this.apartments = res.data.results.data
          this.lastPage = res.data.results.last_page
        })

    },
    searchForZone() {
      axios.get('http://127.0.0.1:8000/api/search',{
        params: {
          page: this.currentPage,
          zone: this.zone
          // perPage: 9
        }
      })
      .then((res) => {
        
        this.apartmentsResearch = res.data;
        console.log(res.data)
        console.log(this.zone)
        console.log('arrey ricerca' + this.apartmentsResearch)
      })
    },
    // this function takes latitude, longitude, distance in kilometers and calculates the bounds
    calculateLimitsLatLon(){
      const lat = this.latitude;
      const lon = this.longitude;
      const distanceKm = this.distance;
      // i create the constances that i will use
      const kmPerDegreeLat = 110.574;
      const kmPerDegreeLon = 111.320 * Math.cos(lat * (Math.PI / 180));

    console.log(lat);

      // // i calculate the bounds
        const latMin = lat - (distanceKm / kmPerDegreeLat);
        const latMax = lat + (distanceKm / kmPerDegreeLat);
        const lonMin = lon - (distanceKm / kmPerDegreeLon);
        const lonMax = lon + (distanceKm / kmPerDegreeLon);

      // // i pass the results to my datas
      this.bounds.latMin = latMin;
      this.bounds.latMax = latMax;
      this.bounds.lonMin = lonMin;
      this.bounds.lonMax = lonMax;

    }
  },
  created() {
    this.fetchApartments();
    this.calculateLimitsLatLon(this.latitude, this.longitude, this.distance)
  }
}
</script>

<style lang="scss" scoped></style>