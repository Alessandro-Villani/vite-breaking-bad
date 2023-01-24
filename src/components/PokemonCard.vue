<script>
import { store } from '../data/store'

export default {
    data() {
        return {
            store
        }
    }
}
</script>

<template>
    <div class="col d-flex flex-column align-items-center">
        <h3>{{ store.pokemons.name }}</h3>
        <img class="img-fluid" :src="store.pokemons.imageUrl" :alt="store.pokemons.name">
    </div>
</template>

<style scoped lang="scss">

</style>