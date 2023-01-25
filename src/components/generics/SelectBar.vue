<script>
export default {
    data() {
        return {
            optionValue: this.defaultOption || '---'
        }
    },
    props: {
        options: Array,
        defaultOption: String,
    },
    emits: ['option-change']
}
</script>

<template>
    <select class="w-50 my-3 text-center" name="select" id="select" @change="$emit('option-change', optionValue)"
        v-model="optionValue">
        <option>{{ defaultOption || '---' }}</option>
        <option v-for="option in options" :value="option">{{ option }}</option>
    </select>
</template>

<style>

</style>