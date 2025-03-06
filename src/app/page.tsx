"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks"; 
import { increment, decrement } from "@/store/counterSlice";

export default function Home() {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.counter?.value || 0); 

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
}
