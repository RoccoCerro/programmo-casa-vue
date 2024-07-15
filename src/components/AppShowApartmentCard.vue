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
        <div class="row align-items-center ">
          <div class="col-auto my-col-auto">
            
            <div class="flex-column">
              <div class="col-auto my-col-auto text-center ">
              <img class="icon-service" src="/public/img/servizi/Risorsa 1.svg" alt="">
              </div>
              <div class="col-auto my-col-auto my-name-icon text-center">Stanze</div>
            </div>

          </div>
          <div class="col-auto my-col-auto">
            {{apartment.rooms}}
          </div>
          <div class="col-auto my-col-auto">
            
            <div class="flex-column justify-content-center align-items-center align-self-center ">
              <div class="col-auto my-col-auto text-center">
              <img class="icon-service" src="/public/img/servizi/Risorsa 2.svg" alt="">
              </div>
              <div class="col-auto my-col-auto my-name-icon">Camere</div>
            </div>

          </div>
          <div class="col-auto my-col-auto">
            {{apartment.beds}}
          </div>
          <div class="col-auto my-col-auto">
            
            <div class="flex-column justify-content-center align-items-center align-self-center">
              <div class="col-auto my-col-auto text-center">
              <img class="icon-service" src="/public/img/servizi/Risorsa 4.svg" alt="">
              </div>
              <div class="col-auto my-col-auto my-name-icon text-center">M.Q.</div>
            </div>

          </div>
          <div class="col-auto my-col-auto">
            {{apartment.sqr_meters}}
          </div>
        </div>
      </section>
      <section class="my-services">
        
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
  .icon-service{
    height: 30px;
  }

  .my-name-icon{
    font-size: 10px;
  }

  .my-col-auto{
    padding: 0;
    padding-left: 5px;
    
  }
</style>