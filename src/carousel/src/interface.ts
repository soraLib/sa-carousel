import { InjectionKey } from 'vue';

export interface CarouselMethodsInjection {
  to: (index: number) => void
  prev: () => void
  next: () => void
  isPrev: (slide: number | HTMLElement) => boolean
  isNext: (slide: number | HTMLElement) => boolean
  isActive: (slide: number | HTMLElement) => boolean
  getCurrentIndex: () => number
  onCarouselItemClick: (index: number, event: MouseEvent) => void
}

export const carouselMethodsInjectionKey: InjectionKey<CarouselMethodsInjection> = Symbol('carousel-key');