<script>
import axios from 'axios';
import PokemonCard from './components/PokemonCard.vue';
import AppLoader from './components/AppLoader.vue'
import { store } from './data/store'
import SelectBar from './components/generics/SelectBar.vue';

export default {
  data() {
    return {
      store,
      page: 1,
      pokemonPerPage: 10,
      typeFilter: '',
      isFiltered: false,
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
        store.isLoading = false;
        if (!this.isFiltered && !store.hasNextPage) {
          return
        }
        page = ++page;
        console.log(page)
      }
      if (!this.isFiltered) {
        console.log('is not filtered');
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
      } else {
        console.log('is filtered');
        if (page > store.filteredPages) {
          store.isLoading = false
          return
        }
        const urlFiltered = `https://41tyokboji.execute-api.eu-central-1.amazonaws.com/dev/api/v1/pokemons?eq[type1]=${this.typeFilter}&page=${page}`
        console.log(urlFiltered);
        axios.get(urlFiltered).then(res => {
          console.log(res.data);
          console.log('pokemons ' + res.data.docs);
          store.pokemons.push(...res.data.docs);
          store.currentPage = res.data.page;
          this.page = store.currentPage;
          store.hasNextPage = res.data.hasNextPage;
        }).catch(error => { }).then(() => {
          store.isLoading = false;
        });
      }
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
    },
    filterPokemons(filter) {
      this.typeFilter = filter;
      this.$refs.pokedex.scrollTop = 0;
      if (filter === 'No Filter') {
        this.isFiltered = false;
        this.page = 1;
        store.currentPage = 1;
        store.pokemons = [];
        this.fetchPokemons(this.page);
      } else {
        this.isFiltered = true;
        this.page = 1;
        store.currentPage = 1;
        axios.get(`https://41tyokboji.execute-api.eu-central-1.amazonaws.com/dev/api/v1/pokemons?eq[type1]=${filter}`).then(res => {
          store.pokemons = res.data.docs
          store.filteredPages = res.data.totalPages
        })
      }
    }
  },
  created() {
    this.fetchPokemons(this.page);
    this.fetchPokemonTypes();

  },
  components: { PokemonCard, AppLoader, SelectBar }
}
</script>

<template>
  <main>
    <div class="container d-flex flex-column align-items-center py-3">
      <img class="img-fluid mb-3" src="./assets/img/pokemon-logo.png" alt="">
      <SelectBar :options="store.pokemonTypes" :default-option="'No Filter'" @option-change="filterPokemons" />
      <div ref="pokedex" class="pokedex row row-cols-5 p-5 rounded-2" @scroll="chargePageOnScroll">
        <PokemonCard v-for="pokemon in store.pokemons" :key="pokemon._id" :id="pokemon._id"></PokemonCard>
      </div>
      <AppLoader v-if="store.isLoading" />
    </div>
  </main>
</template>

<style lang="scss">
@use './assets/styles/style.scss'
</style>