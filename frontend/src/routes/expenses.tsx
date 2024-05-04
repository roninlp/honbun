import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/lib/api";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

const expensesQueryOptions = queryOptions({
  queryKey: ["expenses-list"],
  queryFn: getAllExpenses,
});

export const Route = createFileRoute("/expenses")({
  component: Expenses,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(expensesQueryOptions),
});
async function getAllExpenses() {
  const res = await api.expenses.$get();
  if (!res.ok) throw new Error("Failed to fetch expenses");
  const data = await res.json();
  return data;
}

function Expenses() {
  const { data, isPending } = useSuspenseQuery(expensesQueryOptions);
  const expenses = data.expenses;

  return (
    <div className="mx-auto max-w-3xl p-2">
      <h1>Expenses</h1>
      <Table>
        <TableCaption>A list of all your expenses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Amo unt</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending
            ? Array(3)
                .fill(0)
                .map((_, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">
                      <Skeleton className="h-4" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4" />
                    </TableCell>
                  </TableRow>
                ))
            : expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{expense.id}</TableCell>
                  <TableCell>{expense.title}</TableCell>
                  <TableCell>${expense.amount}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}
