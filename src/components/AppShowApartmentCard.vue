<template>
  <div class="card">
    <img :src="'http://127.0.0.1:8000/storage/' + apartment.img_apartment" class="card-img-top" alt="">
    <div class="card-body">
      <div class="my-contact mb-3">
        <router-link :to="{name: 'messages', params: {id: apartment_id}}" class="btn btn-primary">Contatta il proprietario</router-link>
      </div>
      <div class="card-title">
        {{ apartment.title_apartment }}
      </div>
      <div class="card-text">
        <p>
          {{apartment.description}}
        </p>
      </div>
      <section>
        <div class="row">
          <div class="col">
            <img src="/public/img/servizi/Risorsa 1.svg" alt="" class="img-service"> {{apartment.rooms}}
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      apartment:{
        required: true,
      }
    }
  }
</script>

<style lang="scss" scoped>
  .img-service{
    width: 30px;
  }
</style>