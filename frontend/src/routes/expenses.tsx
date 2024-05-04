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
  const { data } = useSuspenseQuery(expensesQueryOptions);
  const expenses = data.expenses;

  return (
    <div>
      <h1>Expenses</h1>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.title}: ${expense.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}
