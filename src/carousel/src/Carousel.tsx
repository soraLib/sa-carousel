import { cloneVNode, computed, CSSProperties, defineComponent, onMounted, onUpdated, provide, Ref, ref, Transition, VNode } from 'vue';
import { carouselMethodsInjectionKey } from './interface';
import { calculateSize, clampValue, flatten, getDisplayIndex, getNextIndex, getPrevIndex, getRealIndex } from './utils';

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

    const displayIndexRef = ref(initializeIndex);
    const totalViewRef = ref(5);

    const speedRef = ref(400);
    const sizeAxisRef = { value: 'width' } as const;

    const slideSizesRef = computed(() => {
      const { value: slidesEls } = slidesElsRef;

      const { length } = slidesEls;
      if (!length) return [];

      return slidesEls.map((slide) => {
        const size = calculateSize(slide);

        return {
          width: size.width + 8,
          height: size.height
        };
      });
    });

    const slideTranlatesRef = computed(() => {
      const { value: slideSizes } = slideSizesRef;

      const { length } = slideSizes;
      if (!length) return [];

      const { value: axis } = sizeAxisRef;

      let previousTranslate = 0;

      return slideSizes.map(({ [axis]: slideSize }) => {
        const translate = previousTranslate;
        previousTranslate += slideSize ;

        return translate;
      });
    });

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
    function getRealPrevIndex(
      index: number = realIndexRef.value
    ): number | null {
      return getPrevIndex(index, totalViewRef.value);
    }
    function getRealNextIndex(
      index: number = realIndexRef.value
    ): number | null {
      return getNextIndex(index, totalViewRef.value);
    }

    // Translate to
    function to(index: number): void {}
    function prev(): void {
      const prevIndex = getRealPrevIndex();
      if (prevIndex !== null) {
        toRealIndex(prevIndex);
      }
    }
    function next(): void {
      const nextIndex = getRealNextIndex();
      if (nextIndex !== null) {
        toRealIndex(nextIndex);
      }
    }

    // Translate to
    const translateStyleRef: Ref<CSSProperties> = ref({});
    let inTransition = false;
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
      if (speed > 0) {
        inTransition = true;
      }
      updateTranslate(translate, speed);
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
    function getLastViewTranslate(): number {
      const { value: translates } = slideTranlatesRef;

      return translates[totalViewRef.value - 1] || 0;
    }

    // Provide
    function addSlide(slide?: HTMLElement): void {
      if (!slide) return;
      slidesElsRef.value.push(slide);
    }
    function removeSlide(slide?: HTMLElement): void {}
    function onCarouselItemClick(index: number, event: MouseEvent): void {}

    const carouselMethods = {
      to,
      prev: () => {
        // wait transition end
        if (!inTransition) prev();
      },
      next: () => {
        // wait transition end
        if (!inTransition) next();
      },
      addSlide,
      removeSlide,
      onCarouselItemClick
    };

    provide(carouselMethodsInjectionKey, carouselMethods);

    function handleTransitionEnd(): void {
      const { value: virtualIndex } = virtualIndexRef;
      const { value: realIndex } = realIndexRef;

      translateStyleRef.value.transitionDuration = '0ms';
      if (inTransition && virtualIndex !== realIndex) {
        translateTo(realIndex, 0);
      }

      inTransition = false;
    }

    onMounted(() => {
      toRealIndex(initializeIndex + 1);
    });

    return {
      selfElRef,
      displayIndex: displayIndexRef,
      realIndex: realIndexRef,
      slideVNodes: slideVNodesRef,
      translateStyle: translateStyleRef,
      handleTransitionEnd
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

    const { length: realLength } = slides;
    if (realLength > 1 /* && this.duplicatedable */) {
      slides.push(duplicateSlide(slides[0], 0, 'append'));
      slides.unshift(
        duplicateSlide(slides[realLength - 1], realLength - 1, 'prepend')
      );
    }

    this.slideVNodes.value = slides;

    const currentSlide = slides[this.realIndex];
    const currentBackgroundSlot = currentSlide.children as {
      content: () => VNode,
      default: () => VNode
    };

    return (
      <div ref="selfElRef" class="carousel">
        <Transition name="carousel-fade">
          <div class="carousel__current" key={this.realIndex}>
            <div class="carousel__current-background">
              { currentBackgroundSlot.default() } {/* current slide item background */}
            </div>

            <div class="carousel__current-content" style={{width: 'calc(100% - 300px)'}}>
              { currentBackgroundSlot.content() } {/* current slide item content */}
            </div>
          </div>
        </Transition>

        <div
          class="carousel__main"
          style={{
            width: '300px',
            left: 'calc(100% - 300px)'
          }}
        >
          <div
            role="listbox"
            class="slides"
            style={this.translateStyle}
            onTransitionend={this.handleTransitionEnd}
          >
            {
              slides.map((slide, i) => (
                <div key={i} class="slide">
                  {slide}
                </div>
              ))
            }
          </div>

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
