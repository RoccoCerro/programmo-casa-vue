<template>
   <div class="container">
    <h1 class="text-2xl my-8">Visita i nostri appartamenti</h1>
    <!-- <ul class="grid grid-cols-3 gap-4">
      <li class="border p-4 shadow-lg rounded-lg" v-for="apartment in apartments" :key="apartment.id">
        <h2 class="text-lg text-amber-400 font-medium">{{ apartment.title_apartment }}</h2>
        <p class="text-sm">{{  apartment.user.name }}</p>
      </li>
    </ul> -->
  </div>

  <div class="container search-bar">
    <form class="form-search-latitude my-3"action="">
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

  <div class="container">
    <div class="row flex-wrap row-cols-1 row-cols-md-2 row-cols-lg-3">
      <div v-for="apartment in apartments" class="col">
        <div class="card">
          <img :src="'http://127.0.0.1:8000/storage/'+apartment.img_apartment" class="card-img-top" alt="">
          <div class="card-body">
            <p class="card-text">{{ apartment.title_apartment }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// import useMath from '@vueuse/math'


export default {
  data() {
    return {
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
      if(n === this.currentPage) return
      this.currentPage = n
      this.fetchPosts()
    },
    fetchApartments() {

      axios.get('http://127.0.0.1:8000/api/apartments',{
        params: {
          page: this.currentPage,
          // perPage: 9
        }
      })
      .then((res) => {
        // console.log(res.data.posts) // senza la paginazione
        console.log(res.data.results.data)
        this.apartments = res.data.results.data
        this.lastPage = res.data.results.last_page
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
  },
}
</script>

<style lang="scss" scoped>

</style>