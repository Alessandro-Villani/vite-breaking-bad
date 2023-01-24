<script>

</script>

<template>
    <div class="loader d-flex flex-column justify-content-center align-items-center">
        <img class="mb-3" src="pokeball.png" alt="pokeball">
        <h2>Loading...</h2>
    </div>
</template>

<style scoped lang="scss">
.loader {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba($color: gray, $alpha: 0.5);

    img {
        width: 100px;
        height: 100px;
        animation: rotation 2s infinite linear;

    }
}

@keyframes rotation {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(359deg);
    }
}
</style>