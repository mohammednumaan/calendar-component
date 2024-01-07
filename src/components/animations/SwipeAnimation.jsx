import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledAnimation = styled.div`
  @keyframes fadeInLeft {
    0% {
      opacity: 0;
      transform: translateX(20%);
    }
    100% {
      opacity: 1;
      transform: translateX(0%);
    }
  }
  @keyframes fadeOutLeft {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translateX(-20%);
    }
  }
  @keyframes fadeOutRight {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translateX(20%);
    }
  }
  @keyframes fadeInRight {
    0% {
      opacity: 0;
      transform: translateX(-20%);
    }
    100% {
      opacity: 1;
      transform: translateX(0%);
    }
  }
`;

const Fade = ({ show, direction, children }) => {
  const [render, setRender] = useState(show);

  useEffect(() => {
    if (show) setRender(true);
  }, [show]);

  const onAnimationEnd = () => {
    if (!show) setRender(false);
  };

  const returnAnimation = () => {
    switch (direction) {
      case "left":
        return (
          <StyledAnimation
            style={{
              animation: `${show ? "fadeInLeft" : "fadeOutLeft"} 0.5s `,
            }}
            onAnimationEnd={onAnimationEnd}
          >
            {children}
          </StyledAnimation>
        );
      case "right":
        return (
          <StyledAnimation
            style={{
              animation: `${show ? "fadeInRight" : "fadeOutRight"} 0.5s `,
            }}
            onAnimationEnd={onAnimationEnd}
          >
            {children}
          </StyledAnimation>
        );
      default:
        return ({children});
    }
  };

  return render && returnAnimation();
};

export default Fade;