"use client";

import Image, { ImageProps } from "next/image";
import React from "react";

type FadeImageProps = ImageProps & {
  fadeDurationMs?: number;
};

export default function FadeImage({
  className = "",
  fadeDurationMs = 700,
  ...props
}: FadeImageProps) {
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <Image
      {...props}
      alt={props.alt || ""}
      className={`${className} transition-opacity ${isLoaded ? "opacity-100" : "opacity-0"}`}
      style={{
        transitionDuration: `${fadeDurationMs}ms`,
      }}
      onLoad={(e) => {
        setIsLoaded(true);
        props.onLoad?.(e);
      }}
    />
  );
}
