"use client";

import {
  useEffect,
  useRef,
  type ComponentPropsWithoutRef,
  type Ref,
} from "react";
import { enableSafariAutoplay } from "@/lib/safariVideo";

type AutoplayVideoProps = ComponentPropsWithoutRef<"video"> & {
  videoRef?: Ref<HTMLVideoElement>;
};

function assignRef(
  ref: Ref<HTMLVideoElement> | undefined,
  node: HTMLVideoElement | null
) {
  if (!ref) return;
  if (typeof ref === "function") ref(node);
  else ref.current = node;
}

/**
 * Drop-in video that applies Safari/iOS muted inline autoplay unlock.
 */
export default function AutoplayVideo({
  videoRef,
  autoPlay = true,
  muted = true,
  playsInline = true,
  ...props
}: AutoplayVideoProps) {
  const innerRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = innerRef.current;
    if (!video || autoPlay === false) return;
    return enableSafariAutoplay(video);
  }, [autoPlay, props.src]);

  return (
    <video
      ref={(node) => {
        innerRef.current = node;
        assignRef(videoRef, node);
      }}
      {...props}
      autoPlay={autoPlay}
      muted={muted}
      playsInline={playsInline}
    />
  );
}
