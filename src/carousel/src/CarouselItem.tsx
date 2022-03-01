import { defineComponent, inject, onMounted, ref, Transition } from 'vue';

import { carouselMethodsInjectionKey } from './interface';

export default defineComponent({
  name: 'SaCarouselItem',
  setup() {
    const SCarousel = inject(carouselMethodsInjectionKey, null);

    if (!SCarousel) {
      throw new Error('[sa-carousel]: `s-carousel-item` must be placed inside `s-carousel`');
    }

    const selfElRef = ref<HTMLElement>();

    onMounted(() => SCarousel.addSlide(selfElRef.value));

    return {
      selfElRef
    };
  },
  render() {
    const {
      $slots: slots
    } = this;

    return (
      <div
        class="slide__item"
        ref="selfElRef"
      >
        <Transition /* background transition props */>
          {slots.default && <div class="slide__item-background">{slots.default()}</div>}
        </Transition>

        <Transition /* content transition props */>
          {slots.content && <div class="slide__item-content">{slots.content()}</div>}
        </Transition>
      </div>
    );
  }
});