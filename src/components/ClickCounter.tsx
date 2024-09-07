import { useState } from 'react';

const ClickCounter = () => {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  return (
    <>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      {count}
    </>
  );
};

export default ClickCounter;
