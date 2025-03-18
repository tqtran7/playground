"use client";

import { useState } from "react";
import Button from "./Button";

export default function ButtonClicker() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <Button label="Increment" onClick={() => setCount(count + 1)} />
    </div>
  );
}
