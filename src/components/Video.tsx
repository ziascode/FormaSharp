import React from "react";

const SECTION_VIDEO_SRC =
  "https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/03/3d-design.mp4";

function Video() {
  return (
    <div className="relative w-full">
      <div className="relative h-[90vh] w-full overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={SECTION_VIDEO_SRC}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[30vh] w-full bg-gradient-to-b from-slate-300 to-transparent" />
      </div>
    </div>
  );
}

export default Video;
