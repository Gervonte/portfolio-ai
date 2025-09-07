declare module 'sakura-js' {
  interface SakuraOptions {
    className?: string;
    fallSpeed?: number;
    maxSize?: number;
    minSize?: number;
    delay?: number;
    colors?: Array<{
      gradientColorStart: string;
      gradientColorEnd: string;
      gradientColorDegree: number;
    }>;
  }

  interface SakuraInstance {
    destroy(graceful?: boolean): void;
  }

  function Sakura(
    selector: string | HTMLElement,
    options?: SakuraOptions
  ): SakuraInstance;

  export = Sakura;
}
