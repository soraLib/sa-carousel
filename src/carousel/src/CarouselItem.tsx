import { defineComponent, inject, Transition } from 'vue';

import { carouselMethodsInjectionKey } from './interface';

export default defineComponent({
  name: 'SaCarouselItem',
  setup() {
    const SCarousel = inject(carouselMethodsInjectionKey, null);

    if (!SCarousel) {
      throw new Error('[sa-carousel]: `s-carousel-item` must be placed inside `s-carousel`');
    }
  },
  render() {
    const {
      $slots: slots
    } = this;

    return (
      <div>
        <Transition /* background transition props */>
          {slots.default?.({

          })}
        </Transition>

        <Transition /* content transition props */>
          {slots.content?.({

          })}
        </Transition>,
      </div>
    );
  }
});