import { CSSProperties, defineComponent, provide, Ref, ref, Transition, VNode } from 'vue';
import { carouselMethodsInjectionKey } from './interface';
import { flatten, getDisplayIndex } from './utils';

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

    // Translate to
    const translateStyleRef: Ref<CSSProperties> = ref({});
    const inTransition = false;
    function to(index: number): void {}
    function prev(): void {}
    function next(): void {}
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

    console.log(children);

    return (
      <div ref="selfElRef">
        {
          defaultSlot?.({

          })
        }
      </div>
    );
  }
});