<script>
export default {
    props: {
        options: Array
    }
}
</script>

<template>
    <select name="select" id="select">
        <option v-for="option in options" :value="option">{{ option }}</option>
    </select>
</template>

<style>

</style>