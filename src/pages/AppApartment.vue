<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="card p-3">
          <div class="col-lg-6 mb-3">
            <router-link :to="{name: 'messages', params: {id: apartment_id}}" class="btn btn-primary">Contatta il proprietario</router-link>
          </div>
          <div v-if="apartment" class="card-text">
            <h5>
              Titolo dell Appartamento:
            </h5>
            <p>
              {{ apartment.title_apartment }}
            </p>

            <div class="mb-3">
              <h5>Foto dell Appartamento:</h5>
            <img :src="'http://127.0.0.1:8000/storage/' + apartment.img_apartment" class="card-img-top" alt="">
           </div>

            <h5>
              Descrizione Appartamento:
            </h5>
            <p>
              {{apartment.description}}
            </p>

            <h5>
              N° di Stanze
            </h5>
            <p>
              {{apartment.rooms}}
            </p>

            <h5>
              N° Camere da Letto:
            </h5>
            <p>
              {{apartment.beds}}
            </p>

            <h5>
              N° di Bagni:
            </h5>
            <p>
              {{apartment.bathrooms}}
            </p>

            <h5>
              N° M²:
            </h5>
            <p>
              {{apartment.sqr_meters}}
            </p>
          </div>

          <h5>
              Servizi Disponibili:
          </h5>
          <div v-if="apartment.services" v-for="service in apartment.services">
            {{ service.name }}
          </div>
        </div>
      </div>
    </div>
  </div>

  
</template>

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