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
    <form class="form-search-apartment my-3"action="">
      <label for="complete_address" class="form-label">Cerca dove vorresti trovare un appartamento</label>
      <input type="text" class="form-control my-input-address" id="complete_address" name="complete_address" value="" required placeholder="Inserisci la Via e scegli tra quelle suggerite">
    </form>

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

export default {
  data() {
    return {
      apartments: [],
      currentPage: 1,
      lastPage: null
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

    }
  },
  created() {
    this.fetchApartments()
  },
}
</script>

<style lang="scss" scoped>

</style>