/** Safari / iOS inline + muted autoplay helpers. */

export function prepareSafariVideo(video: HTMLVideoElement): void {
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");
}

function unlockOnGesture(video: HTMLVideoElement): void {
  const unlock = () => {
    prepareSafariVideo(video);
    void video.play().catch(() => {});
    window.removeEventListener("touchstart", unlock);
    window.removeEventListener("click", unlock);
  };
  window.addEventListener("touchstart", unlock, { once: true, passive: true });
  window.addEventListener("click", unlock, { once: true });
}

/** Attempt play(); on rejection, unlock on first user gesture. */
export function trySafariPlay(video: HTMLVideoElement): void {
  prepareSafariVideo(video);
  const playPromise = video.play();
  if (playPromise === undefined) return;
  playPromise.catch(() => unlockOnGesture(video));
}

export type EnableSafariAutoplayOptions = {
  /** Retry play when the video scrolls into view (default true). */
  observeVisibility?: boolean;
  visibilityThreshold?: number;
};

/**
 * Prepare a muted inline video and keep trying to autoplay (iOS-safe).
 * Returns a cleanup function.
 */
export function enableSafariAutoplay(
  video: HTMLVideoElement,
  options: EnableSafariAutoplayOptions = {}
): () => void {
  const { observeVisibility = true, visibilityThreshold = 0.25 } = options;

  prepareSafariVideo(video);
  let cancelled = false;

  const tryPlay = () => {
    if (cancelled) return;
    trySafariPlay(video);
  };

  if (video.readyState >= 2) {
    tryPlay();
  } else {
    video.addEventListener("loadeddata", tryPlay, { once: true });
    video.addEventListener("canplay", tryPlay, { once: true });
    video.load();
  }

  let observer: IntersectionObserver | undefined;
  if (observeVisibility) {
    observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) tryPlay();
      },
      { threshold: visibilityThreshold }
    );
    observer.observe(video);
  }

  return () => {
    cancelled = true;
    observer?.disconnect();
    video.removeEventListener("loadeddata", tryPlay);
    video.removeEventListener("canplay", tryPlay);
  };
}

/** WebCodecs path in scrolly-video is unreliable on iOS Safari. */
export function prefersWebCodecsForScrolly(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  const isIOS =
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  return !isIOS;
}
