<template>
  <div class="home">
    <div class="title">
      Weather App
    </div>
    <Weather />
  </div>
</template>

<script lang="ts">
import Weather from '@/components/weather/Weather.vue'

export default {
  name: 'Home',
  components: {
    Weather,
  },
}
</script>

<style lang="scss" scoped>
.title {
  margin: 20px 0;
  font-size: 1.6em;
}
</style>
