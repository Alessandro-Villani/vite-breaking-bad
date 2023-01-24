<script>
import { store } from '../data/store'
import axios from 'axios'

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
        getColor1() {
            return this.currentPokemon.type1 ? `--${this.currentPokemon.type1.toLowerCase()}` : '--transparent';
        },
        getColor2() {
            return this.currentPokemon.type2 ? `--${this.currentPokemon.type2.toLowerCase()}` : '--transparent';
        }
    },
}
</script>

<template>
    <div class="col d-flex align-items-center justify-content-center mb-3">
        <div class="card d-flex flex-column align-items-center p-3 w-100"
            :style="{ 'background-image': `linear-gradient(135deg, var(${getColor1}), var(${getColor2}))` }">
            <p class="number">{{ currentPokemon.number }}</p>
            <h5 class="mb-5">{{ currentPokemon.name }}</h5>
            <figure class="d-flex justify-content-center align-items-center">
                <img :src="currentPokemon.imageUrl" :alt="currentPokemon.name"
                    @error="(e) => e.target.src = '/pokeball.png'">
            </figure>
            <div class="type row">
                <h6 class="col-12 text-center my-2">TYPE</h6>
                <div v-if="currentPokemon.type2" class="double-type d-flex">
                    <div class="col-6 text-center">
                        <div class="rounded-pill" :style="{ 'background-color': `var(${getColor1})` }"><b>{{
                            currentPokemon.type1
                        }}</b></div>
                    </div>
                    <div class="col-6 text-center">
                        <div class="rounded-pill" :style="{ 'background-color': `var(${getColor2})` }"><b>{{
                            currentPokemon.type2
                        }}</b></div>
                    </div>
                </div>
                <div v-else class="single-type col-12 text-center">
                    <div class="rounded-pill" :style="{ 'background-color': `var(${getColor1})` }"> <b>{{
                        currentPokemon.type1
                    }}</b></div>
                </div>
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
                <div class="col-12 text-center mt-2"><b>TOTAL:</b> {{ currentPokemon.total }}</div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '../assets/styles/partials/variables' as *;

.card {
    cursor: pointer;
    text-shadow: 2px gray;
    box-shadow: 0 0 5px black;
    transition: all 0.5s;
    position: relative;

    &:hover {
        scale: 1.1;
        z-index: 1;
    }

    figure {
        height: 150px;
        width: 150px;
        background-color: white;
        border-radius: 50%;

        img {
            display: block;
            max-width: 60%;
            max-height: 60%;
        }
    }

    .rounded-pill {
        color: white;
    }

    .number {
        position: absolute;
        top: 0;
        left: 0;
        padding: .5rem;
    }


}

.col-4,
.col-2 {
    font-size: 10px;
}

.col-4 {
    font-weight: bold;
}
</style>