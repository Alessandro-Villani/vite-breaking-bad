import { reactive } from 'vue'

export const store = reactive({
    pokemons: [],
    isLoading: false,
    currentPage: undefined,
    hasNextPage: undefined,
    totalPokemons: undefined,
    pokemonTypes: []
})