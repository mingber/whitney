import React, { useState } from "react";
import { useSpring, animated, config } from "react-spring";

const Square = props => {
  const { x, y, width } = props;
  const transformOrigin = `${x + width / 2}px ${y + width / 2}px`;

  const [initialCoords, setInitialCoords] = useState(null);
  const [initialTime, setInitialTime] = useState(null);

  const [{ transform }, setTransformSpring] = useSpring(() => ({
    transform: "rotateX(0deg) rotateY(0deg)"
  }));

  const handleMouseOver = e => {
    const { left, top } = e.target.getBoundingClientRect();

    setInitialCoords({
      x: e.clientX - left,
      y: e.clientY - top
    });

    setInitialTime(Date.now());
  };

  const handleMouseOut = e => {
    if (!initialCoords) return null;

    const { left, top } = e.target.getBoundingClientRect();

    const finalCoords = {
      x: e.clientX - left,
      y: e.clientY - top
    };

    const timeElapsed = Date.now() - initialTime;

    const v = {
      x: (finalCoords.x - initialCoords.x) / timeElapsed,
      y: (finalCoords.y - initialCoords.y) / timeElapsed
    };

    const getAngle = a => Math.round(1000 * a);

    setTransformSpring({
      transform: `rotateX(${getAngle(v.y)}deg) rotateY(${-1 *
        getAngle(v.x)}deg)`,
      config: {
        ...config.molasses,
        friction: 1000
      }
    });

    setInitialCoords(null);
  };

  return (
    <animated.rect
      {...props}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      style={{
        transformOrigin,
        transform
      }}
    />
  );
};

export default Square;
