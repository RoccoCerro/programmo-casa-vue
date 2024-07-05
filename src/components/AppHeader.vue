<template>
  <div>
    <ul class="list-unstyled">
      <li>
        <RouterLink class="nav-link" :to="{ name: 'home' }">Casa</RouterLink>
      </li>
      <li>
        <RouterLink class="nav-link" :to="{ name: 'apartments' }">Appartamenti</RouterLink>
      </li>
      <li>
        <a href="http://127.0.0.1:8000/login">
          <font-awesome-icon :icon="['fas', 'user']" />
          Accedi alla tua pagina personale
        </a>
      </li>
      <li>
        <a href="http://127.0.0.1:8000/register">Registrati</a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>

</style>