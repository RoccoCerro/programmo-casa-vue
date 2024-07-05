<template>

  <div class="container">
    <p><a href="http://127.0.0.1:8000/login">Accedi alla tua pagina personale</a></p>
    <p><a href="http://127.0.0.1:8000/register">Registrati</a></p>
    
    <h2 class="text-2xl my-8">Ecco i nostri appartamenti</h2>
    <ul class="grid grid-cols-3 gap-4">
      <li class="border p-4 shadow-lg rounded-lg" v-for="apartment in apartments" :key="apartment.id">
        <h2 class="text-lg text-amber-400 font-medium">{{ apartment.title_apartment }}</h2>
        <p class="text-sm">{{  apartment.user.name }}</p>
        <!-- <p v-if="apartment.service" class="text-gray-600"> -->
          <!-- {{ post.category.name }} -->
        <!-- </p> -->
        <!-- <ul class="flex flex-wrap gap-2 mt-2">
          <li class="rounded-full bg-gray-200 px-3 leading-6" v-for="tag in post.tags" :key="tag.id">
            {{ tag.name }}
          </li>
        </ul> -->
      </li>
    </ul>
    <!-- <div v-if="lastPage > 1">
      <ul class="flex gap-3 justify-center my-8">
        <li :class="n === currentPage ? 'bg-amber-400' : 'bg-gray-100'" class="cursor-pointer aspect-square w-8 flex justify-center items-center rounded-full " @click="changePage(n)" v-for="n in lastPage" :key="n">
          {{ n }}
        </li>
      </ul>
    </div> -->
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
    fetchPosts() {

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
    this.fetchPosts()
  },
}
</script>

<style>

</style>