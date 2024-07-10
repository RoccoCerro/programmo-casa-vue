<template>
  <div>
    ricerca avanzata
    {{ zone }}

    <ul>
      <li v-for="apartment in apartmentsResearch">
        {{ apartment.title_apartment }}
        <p>via: {{ apartment.complete_address }}</p>
      </li>
    </ul>

    <div class="services">
      <button :class="('btn btn-primary me-1 mb-1 service-'+service.id)" @click="toggleService(service.id), buttonToggle(service.id) " v-for="(service, index) in services">{{ service.name }}</button>
    </div>

    <!-- {{ latitude }} {{ longitude  }} -->

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
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data(){
      return{
        zone:'',
        apartmentsResearch: '',
        suggestion:'',
        // i set the datas used to calculate the bounds
        latitude: 0,
        longitude: 0,
        distance: 20,
        buttonColors: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark'],
        services: {},
        activeFilters: [],
        bounds: {
          latMin: 0,
          latMax: 0,
          lonMin: 0,
          lonMax: 0,
        }
      }
    },
    methods:{
      // this function takes latitude, longitude, distance in kilometers and calculates the bounds
      calculateLimitsLatLon(){
        const lat = this.latitude;
        const lon = this.longitude;
        const distanceKm = this.distance;
        // i create the constances that i will use
        const kmPerDegreeLat = 110.574; // chilometri per angolo di latitudine
        const kmPerDegreeLon = 111.320 * Math.cos(lat * (Math.PI / 180)); // chilometri per angolo di longitudine

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

      },
      fetchServices(){
        axios.get('http://127.0.0.1:8000/api/services')
      .then((res) => {
        this.services = res.data.results
        console.log(this.services[0])
      })
      },
      toggleService(serviceId){

        const _this = this;
        const id = serviceId;

        if(this.activeFilters.includes(id)){
           let index = _this.activeFilters.indexOf(serviceId);
          this.activeFilters.splice(index, 1);
        }else{
          this.activeFilters.push(serviceId);
        }
        
        console.log(this.activeFilters);
      },
      buttonToggle(serviceId){
        const button = document.querySelector('.service-'+serviceId);
        if(this.activeFilters.includes(serviceId)){
          button.classList.remove('btn-primary');
          button.classList.add('btn-secondary');
        }else{
          button.classList.remove('btn-secondary');
          button.classList.add('btn-primary');
        }
      }
    },
    mounted(){
      // this.zone = sessionStorage.getItem('zone')
      this.latitude = parseFloat(sessionStorage.getItem('latitude'))
      this.longitude = parseFloat(sessionStorage.getItem('longitude'))
      this.calculateLimitsLatLon()
      this.fetchServices()

      // this.latitude = el.position.lat
      // this.longitude = el.position.lon

      axios.get('http://127.0.0.1:8000/api/search',{
        params: {
          // page: this.currentPage,
          min_lat: this.bounds.latMin,
          max_lat: this.bounds.latMax,
          min_lon: this.bounds.lonMin,
          max_lon: this.bounds.lonMax
          // perPage: 9
        }
      })
      .then((res) => {
        
        this.apartmentsResearch = res.data;
        console.log(res.data)
        console.log(this.zone)
        console.log('arrey ricerca' + this.apartmentsResearch)
      })
    }
  }
</script>

<style lang="scss" scoped>

</style>