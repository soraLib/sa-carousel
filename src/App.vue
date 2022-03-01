
<template>
  <div class="mx-auto h-full bg-slate-50" style="min-width: calc(472px + 0.5rem);">

    <header class="flex justify-center items-center">
      <h1 class="font-bold text-lg py-4">Sa Carousel</h1>
    </header>

    <main class="flex justify-center">
      <SCarousel style="width: 800px; height: 400px;">
        <SCarouselItem>
          <template #content>
            <section>
              <h2>测试的标题</h2>

              <p>这里是正文....这里是正文这里是正文这里是正文....这里是正文</p>

              <footer>作者是我</footer>
            </section>
          </template>

          <img src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg" />
        </SCarouselItem>

        <SCarouselItem>
          <template #content>
            <section>
              <h2>如何看待 2 月 27 日尼泊尔议会批准尼同美国「千年挑战计划」协议</h2>

              <p>尼泊尔众议院27日晚间批准了受到众多关注的“千禧年挑战公司协议”（简称MCC协议）。协议规定美政府援助5亿美元、尼泊尔政府投入1.3亿美元用于尼国内的基础设施建设。</p>

              <footer>但该协议中的部分条款</footer>
            </section>
          </template>

          <img src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg" />
        </SCarouselItem>

        <SCarouselItem>
          <template #content>
            <section>
              <h2>教训1 建设再快也没有别人推翻快。</h2>

              <p>1.经营的好好的缅甸，说没就没。2.一带一路沿线国家，屡次出事，上次哈萨克斯坦还是集安组织镇压的，全程就没我们啥事。</p>

              <footer>宣传平台没出海 舆论战不得力迟早得吃大亏。</footer>
            </section>
          </template>

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
  color: #2c3e50;
  height: 100vh;
}

body {
  padding: 0;
  margin: 0;
}
</style>
