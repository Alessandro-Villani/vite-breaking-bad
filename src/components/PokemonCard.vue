<script>
import { store } from '../data/store'

export default {
    data() {
        return {
            store
        }
    },
    props: {
        id: String
    },
    computed: {
        currentPokemon() {
            return store.pokemons.find(pokemon => pokemon._id === this.id);
        },
    },
}
</script>

<template>
    <div class="col d-flex align-items-center justify-content-center mb-3">
        <div class="card d-flex flex-column align-items-center p-3 w-100" :class="currentPokemon.type1.toLowerCase()">
            <h4 class="mb-4">{{ currentPokemon.name }}</h4>
            <figure class="d-flex justify-content-center align-items-center">
                <img class="mb-3" :src="currentPokemon.imageUrl" :alt="currentPokemon.name">
            </figure>
            <div class="type row">
                <h6 class="col-12 text-center my-2">TYPE</h6>
                <div v-if="currentPokemon.type1" class="col-6 text-center px-0"> {{ currentPokemon.type1 }}</div>
                <div v-if="currentPokemon.type2" class="col-6 text-center px-0"> {{ currentPokemon.type2 }}</div>
            </div>
            <div class="attributes row">
                <h6 class="col-12 text-center my-2">ATTRIBUTES</h6>
                <div class="col-4">HP:</div>
                <div class="col-2 px-0">{{ currentPokemon.hp }}</div>
                <div class="col-4">ATK:</div>
                <div class="col-2 px-0">{{ currentPokemon.atk }}</div>
                <div class="col-4">DEF</div>
                <div class="col-2 px-0">{{ currentPokemon.def }}</div>
                <div class="col-4">SP-ATK:</div>
                <div class="col-2 px-0">{{ currentPokemon.sp_atk }}</div>
                <div class="col-4">SP-DEF:</div>
                <div class="col-2 px-0">{{ currentPokemon.sp_def }}</div>
                <div class="col-4">SPD:</div>
                <div class="col-2 px-0">{{ currentPokemon.spd }}</div>
                <div class="col-12 text-center mt-2">TOTAL: {{ currentPokemon.total }}</div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '../assets/styles/partials/variables' as *;

figure {
    height: 150px;
    width: 150px;
    background-color: white;
    border-radius: 50%;

    img {
        width: 60%;
    }
}

.col-4,
.col-2 {
    font-size: 10px;
}

.col-4 {
    font-weight: bold;
}

.grass {
    background-color: $grass;
}

.fire {
    background-color: $fire;
}

.water {
    background-color: $water;
}
</style>