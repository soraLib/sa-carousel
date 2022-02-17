
<template>
  <div class="w-3/5 mx-auto h-full" style="min-width: calc(472px + 0.5rem);">

    <header class="flex justify-center items-center">
      <h1 class="font-bold text-lg py-4">Sa Carousel</h1>
    </header>

    <main>
      <SCarousel>
        <SCarouselItem>
          <template #content>A content</template>

          <div>image slot A</div>
        </SCarouselItem>

        <SCarouselItem>
          <template #content>B content</template>

          <div>image slot B</div>
        </SCarouselItem>
      </SCarousel>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { SCarousel, SCarouselItem } from './carousel';

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}

body {
  padding: 0;
  margin: 0;
}
</style>
