import { Button } from "@/components/ui/button";
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex max-w-md flex-col gap-2 bg-background">
        <Button onClick={() => setCount((count) => count + 1)}>up</Button>
        <Button onClick={() => setCount((count) => count - 1)}>down</Button>
        <p>{count}</p>
      </div>
    </>
  );
}

export default App;
