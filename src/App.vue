<script>
import axios from 'axios';
import PokemonCard from './components/PokemonCard.vue';
import AppLoader from './components/AppLoader.vue'
import { store } from './data/store'

export default {
  data() {
    return {
      store,
      page: 1,
      pokemonPerPage: 10
    };
  },
  computed: {
    pokemonNumber() {
      return this.page * this.pokemonPerPage;
    }
  },
  methods: {
    fetchPokemons(page, next = false) {
      store.isLoading = true;
      console.log(page);
      if (next) {
        if (!store.hasNextPage) {
          store.isLoading = false;
          return
        }
        page = ++page;
        console.log(page)
      }
      const url = `https://41tyokboji.execute-api.eu-central-1.amazonaws.com/dev/api/v1/pokemons?per=${this.pokemonPerPage}&page=${page}`
      axios.get(url)
        .then(res => {
          store.pokemons.push(...res.data.docs);
          store.currentPage = res.data.page;
          this.page = store.currentPage;
          store.hasNextPage = res.data.hasNextPage;
          store.totalPokemons = res.data.totalDocs;
        }).catch(error => { }).then(() => {
          store.isLoading = false;
        });
    },
    fetchPokemonTypes() {
      axios.get('https://41tyokboji.execute-api.eu-central-1.amazonaws.com/dev/api/v1/pokemons/types1').then(res => {
        store.pokemonTypes = res.data
      })
    },
    chargePageOnScroll(event) {
      if (event.target.scrollTop + event.target.clientHeight >= event.target.scrollHeight) {
        this.fetchPokemons(store.currentPage, true);
      }
    }
  },
  created() {
    this.fetchPokemons(this.page);
    this.fetchPokemonTypes();

  },
  components: { PokemonCard, AppLoader }
}
</script>

<template>
  <main>
    <div class="container d-flex flex-column align-items-center py-3">
      <img class="img-fluid mb-3" src="./assets/img/pokemon-logo.png" alt="">
      <div v-if="pokemonNumber === store.pokemons.length || store.pokemons.length === store.totalPokemons"
        class="pokedex row row-cols-5 p-5 rounded-2" @scroll="chargePageOnScroll">
        <PokemonCard v-for="pokemon in store.pokemons" :key="pokemon._id" :id="pokemon._id"></PokemonCard>
      </div>
      <AppLoader v-else />
    </div>
  </main>
</template>

<style lang="scss">
@use './assets/styles/style.scss'
</style>