
<template>
  <div class="mx-auto h-full bg-slate-50" style="min-width: calc(472px + 0.5rem);">

    <header class="flex justify-center items-center">
      <h1 class="font-bold text-lg py-4">Sa Carousel</h1>
    </header>

    <main class="flex justify-center">
      <SCarousel style="width: 800px; height: 400px;">
        <SCarouselItem>
          <template #content>A content</template>

          <img src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg" />
        </SCarouselItem>

        <SCarouselItem>
          <template #content>B content</template>

          <img src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg" />
        </SCarouselItem>

        <SCarouselItem>
          <template #content>C content</template>

          <img src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg" />
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
