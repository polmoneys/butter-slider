import * as React from "react";
import { CreateSlider, Options } from "./utils";
import "./slideable.css";

// TODO: MAKEFILE PER DEVOPS REPO

interface Props extends Options {
  className?: string;
  children?:
    | ((...args: any[]) => React.ReactElement | null)
    | React.ReactNode
    | React.ReactElement
    | Element
    | null;
}

export const Slideable = (props: Props) => {
  const { className, container, slider, children, ...rest } = props;

  const containerRef = React.useRef<HTMLDivElement>(null);
  const slideableRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (containerRef.current === null && slideableRef.current === null) return;
    new CreateSlider({
      container: containerRef.current,
      slider: slideableRef.current,
      hasTouchEvent: true,
      dragSpeed: 2,
      smoothAmount: 0.1,
      ...rest
    });
  });

  const containerClassName = ["slideable-container", className]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={containerClassName} ref={containerRef}>
      <div className="slideable-viewport" ref={slideableRef}>
        {children}
      </div>
    </div>
  );
};
