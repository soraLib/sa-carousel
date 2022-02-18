import { cloneVNode, CSSProperties, defineComponent, provide, Ref, ref, Transition, VNode } from 'vue';
import { carouselMethodsInjectionKey } from './interface';
import { clampValue, flatten, getDisplayIndex, getNextIndex, getRealIndex } from './utils';

import SCarouselArrow from './CarouselArrow';

import './styles/index.scss';

const carouselProps = {
  defaultIndex: {
    required: false,
    type: Number,
    default: 0
  }
};

export type CarouselProps = typeof carouselProps;

export default defineComponent({
  name: 'SaCarousel',
  props: carouselProps,
  setup(props) {
    // Dom
    const selfElRef = ref<HTMLDivElement | null>(null);
    const slidesElsRef = ref<HTMLElement[]>([]);
    const slideVNodesRef = { value: [] as VNode[] };

    // display view
    const displaySlidesPerViewRef = 1;

    // Index
    const initializeIndex = props.defaultIndex + 0;
    const virtualIndexRef = ref(initializeIndex);
    const realIndexRef = ref(initializeIndex);

    const speedRef = ref(0);

    const displayIndexRef = ref(initializeIndex);
    const totalViewRef = ref(5);

    // Reality methods
    function toRealIndex(index: number, speed = speedRef.value): void {
      const { value: length } = totalViewRef;

      if ((index = clampValue(index, 0, length - 1)) !== realIndexRef.value) {
        const displayIndex = (displayIndexRef.value = getDisplayIndex(
          index,
          totalViewRef.value
        ));

        virtualIndexRef.value = index;
        realIndexRef.value = getRealIndex(displayIndex);

        translateTo(index, speed);
      }
    }
    function getRealNextIndex(
      index: number = realIndexRef.value
    ): number | null {
      return getNextIndex(index, totalViewRef.value);
    }

    // Translate to
    function to(index: number): void {}
    function prev(): void {
      console.log('prev');
    }
    function next(): void {
      console.log('next');

      const nextIndex = getRealNextIndex();
      if (nextIndex !== null) {
        toRealIndex(nextIndex);
      }
    }

    // Translate to
    const translateStyleRef: Ref<CSSProperties> = ref({});
    // let inTransition = false;
    function updateTranslate(translate: number, speed = 0): void {
      translateStyleRef.value = Object.assign({}, {
        transform: `translateX(${-translate}px)`,
        transitionDuration: `${speed}ms`
      });
    }
    function fixTranslate(speed = 0): void {
      translateTo(realIndexRef.value, speed);
    }
    function translateTo(index: number, speed = speedRef.value): void {
      const translate = getTranslate(index);
      // if (translate !== previousTranslate && speed > 0) {
      //   inTransition = true;
      // }
      updateTranslate(translate, speed);
      // previousTranslate = getTranslate(realIndexRef.value);
    }
    function getTranslate(index: number): number {
      let translate;
      // Deal with auto slides pre view
      if (index >= totalViewRef.value - 1) {
        translate = getLastViewTranslate();
      } else {
        translate = slideTranlatesRef.value[index] || 0;
      }

      return translate;
    }

    // Provide
    function addSlide(slide?: HTMLElement): void {}
    function removeSlide(slide?: HTMLElement): void {}
    function onCarouselItemClick(index: number, event: MouseEvent): void {}

    const carouselMethods = {
      to,
      prev,
      next,
      addSlide,
      removeSlide,
      onCarouselItemClick
    };

    provide(carouselMethodsInjectionKey, carouselMethods as any /* TODO: */);

    return {
      selfElRef
    };
  },
  render() {
    const {
      $slots: { default: defaultSlot }
    } = this;

    const children = (defaultSlot && flatten(defaultSlot())) || [];

    let slides = filterCarouselItem(children);
    if (!slides.length) {
      slides = children.map((ch) => (
        cloneVNode(ch)
      ));
    }

    console.log('children', children);

    const { length: realLength } = slides;
    if (realLength > 1 /* && this.duplicatedable */) {
      slides.push(duplicateSlide(slides[0], 0, 'append'));
      slides.unshift(
        duplicateSlide(slides[realLength - 1], realLength - 1, 'prepend')
      );
    }

    return (
      <div ref="selfElRef" class="carousel">
        <div role="listbox" class="slides">
          {
            slides.map((slide, i) => (
              <div key={i} class="slide">
                {slide}
              </div>
            ))
          }
        </div>

        <SCarouselArrow />
      </div>
    );
  }
});

function filterCarouselItem(
  vnodes: VNode[],
  carouselItems: VNode[] = []
): VNode[] {
  if (Array.isArray(vnodes)) {
    vnodes.forEach((vnode) => {
      if (vnode.type && (vnode.type as any).name === 'CarouselItem') {
        carouselItems.push(vnode);
      }
    });
  }

  return carouselItems;
}

function duplicateSlide(
  child: VNode,
  index: number,
  position: 'prepend' | 'append'
): VNode {
  return cloneVNode(child, {
    // for patch
    key: `carousel-item-duplicate-${index}-${position}`
  });
}
