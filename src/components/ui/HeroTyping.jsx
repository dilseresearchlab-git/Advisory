"use client";

import { TypeAnimation } from "react-type-animation";

export default function HeroTyping() {
  return (
    <span className="inline-block min-w-[320px] sm:min-w-[560px]">
      <TypeAnimation
        sequence={[
          "deeper analysis.",
          1800,
          "informed decisions.",
          1800,
          "clearer insights.",
            1800,
        ]}
        wrapper="span"
        speed={50}
        repeat={Infinity}
        className="text-emerald-300"
      />
    </span>
  );
}