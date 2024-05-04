import { createFileRoute } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/")({
  component: Index,
});

const getTotalSpent = async () => {
  const res = await api.expenses["total-spent"].$get();
  if (!res.ok) throw new Error("Failed to fetch total spent");
  const data = await res.json();
  return data;
};
function Index() {
  const { isPending, error, data } = useQuery({
    queryKey: ["total-spent"],
    queryFn: getTotalSpent,
  });

  if (error) return <p>Error: {error.message}</p>;

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
          <p className="text-2xl font-bold">
            {isPending ? "..." : data.totalSpent}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
