<script setup>
import logotype from '../assets/logotype.svg'
</script>

<template>
  <div class="logotype">
    <img :src="logotype"/>
    <p>Sprout</p>
  </div>
</template>

<style scoped>
.logotype {
  display: flex;
  align-items: center;
  gap: 10px;
}

p {
  font-size: 1.5rem;
  font-weight: bold;
}

img {
  width: 40px;
  height: 40px;
}
</style>
