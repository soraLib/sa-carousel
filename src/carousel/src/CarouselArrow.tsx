import { h, defineComponent, inject } from 'vue';
import { carouselMethodsInjectionKey } from './interface';

const backwardIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
    <g fill="none">
      <path
        d="M10.26 3.2a.75.75 0 0 1 .04 1.06L6.773 8l3.527 3.74a.75.75 0 1 1-1.1 1.02l-4-4.25a.75.75 0 0 1 0-1.02l4-4.25a.75.75 0 0 1 1.06-.04z"
        fill="currentColor"
      ></path>
    </g>
  </svg>
);

const forwardIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
    <g fill="none">
      <path
        d="M5.74 3.2a.75.75 0 0 0-.04 1.06L9.227 8L5.7 11.74a.75.75 0 1 0 1.1 1.02l4-4.25a.75.75 0 0 0 0-1.02l-4-4.25a.75.75 0 0 0-1.06-.04z"
        fill="currentColor"
      ></path>
    </g>
  </svg>
);

export default defineComponent({
  name: 'CarouselArrow',
  setup(props) {
    const {
      prev,
      next
    } = inject(carouselMethodsInjectionKey, null)!;

    return {
      prev,
      next
    };
  },
  render() {
    return (
      <div class={'carousel__arrow-group'}>
        <div
          class={[
            'carousel__arrow'
          ]}
          role="button"
          onClick={this.prev}
        >
          {backwardIcon}
        </div>
        <div
          class={[
            'carousel__arrow'
          ]}
          role="button"
          onClick={this.next}
        >
          {forwardIcon}
        </div>
      </div>
    );
  }
});
