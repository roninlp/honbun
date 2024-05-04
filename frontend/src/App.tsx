import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";

function App() {
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    async function fetchTotalSpent() {
      const res = await fetch("/api/expenses/total-spent");
      const data = await res.json();
      setTotalSpent(data.totalSpent);
    }
    fetchTotalSpent();
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Total amount spent</CardTitle>
          <CardDescription>
            Total amount spent on all transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{totalSpent}</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
