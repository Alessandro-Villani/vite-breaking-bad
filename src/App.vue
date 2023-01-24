<script>
import axios from 'axios';
import PokemonCard from './components/PokemonCard.vue';
import AppLoader from './components/AppLoader.vue'
import { store } from './data/store'

export default {
  data() {
    return {
      store
    };
  },
  methods: {
    fetchPokemons() {
      store.isLoading = true;
      axios.get("https://41tyokboji.execute-api.eu-central-1.amazonaws.com/dev/api/v1/pokemons?per=10&page=1")
        .then(res => {
          store.pokemons = res.data.docs;
        }).catch(error => { }).then(() => {
          store.isLoading = false;
        });
    }
  },
  created() {
    this.fetchPokemons();
  },
  components: { PokemonCard, AppLoader }
}
</script>

<template>
  <main>
    <div class="container d-flex flex-column align-items-center py-3">
      <img class="img-fluid mb-3" src="./assets/img/pokemon-logo.png" alt="">
      <div v-if="!store.isLoading" class="pokedex row row-cols-5 py-5">
        <PokemonCard v-for="pokemon in store.pokemons" :key="pokemon._id" :id="pokemon._id"></PokemonCard>
      </div>
      <AppLoader v-else />
    </div>
  </main>
</template>

<style lang="scss">
@use './assets/styles/style.scss'
</style>