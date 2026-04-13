declare module 'scrolly-video/dist/ScrollyVideo.cjs.jsx' {
  import type { ComponentType } from 'react';

  export interface ScrollyVideoProps {
    src?: string;
    videoPercentage?: number;
    transitionSpeed?: number;
    frameThreshold?: number;
    useWebCodecs?: boolean;
    full?: boolean;
    [key: string]: unknown;
  }

  const ScrollyVideo: ComponentType<ScrollyVideoProps>;
  export default ScrollyVideo;
}
