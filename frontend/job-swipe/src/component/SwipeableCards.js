import React, { useState } from 'react';


const SwipeableCards = () => {
  const [cards] = useState([
    { name: 'Card 1' },
    { name: 'Card 2' },
    { name: 'Card 3' },
  ]);

  return (
    <div>
      {/* {cards.map((card, index) => (
        <TinderCard key={index}>
          <div>{card.name}</div>
        </TinderCard>
      ))} */}
    </div>
  );
};

export default SwipeableCards;