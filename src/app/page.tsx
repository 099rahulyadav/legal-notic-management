"use client";  // 👈 Add this line at the top

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { increment, decrement } from "../store/slices";

export default function Home() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
}
