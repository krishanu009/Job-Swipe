import React, { useState, useRef } from "react";
import '../styling/swipe.css'

const SwipeCard = ({ onSwipe }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isSwiping, setIsSwiping] = useState(false);
  const cardRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsSwiping(true);
    cardRef.current.initialX = e.clientX - position.x;
    cardRef.current.initialY = e.clientY - position.y;
  };

  const handleMouseMove = (e) => {
    if (!isSwiping) return;
    const x = e.clientX - cardRef.current.initialX;
    const y = e.clientY - cardRef.current.initialY;
    setPosition({ x, y });
  };

  const handleMouseUp = () => {
    setIsSwiping(false);
    if (position.x > 100) {
      onSwipe("right");
    } else if (position.x < -100) {
      onSwipe("left");
    } else {
      setPosition({ x: 0, y: 0 }); // Reset if not swiped enough
    }
  };

  const handleSwipeButton = (direction) => {
    if (direction === "left") {
      setPosition({ x: -200, y: 0 });
      onSwipe("left");
    } else {
      setPosition({ x: 200, y: 0 });
      onSwipe("right");
    }
  };

  return (
    <div>
      <div
        className="swipe-card"
        ref={cardRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      >
        {/* Content of the card */}
      </div>
      <div className="buttons">
        <button onClick={() => handleSwipeButton("left")}>Swipe Left</button>
        <button onClick={() => handleSwipeButton("right")}>Swipe Right</button>
      </div>
    </div>
  );
};

export default SwipeCard;
