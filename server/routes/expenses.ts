import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const expenseSchema = z.object({
  id: z.number().positive().min(1),
  title: z.string().min(3).max(100),
  amount: z.number().positive(),
});

type Expense = z.infer<typeof expenseSchema>;

export const createExpenseSchema = expenseSchema.omit({ id: true });

const fakeExpenses: Expense[] = [
  {
    id: 1,
    title: "Expense 1",
    amount: 100,
  },
  {
    id: 2,
    title: "Expense 2",
    amount: 200,
  },
  {
    id: 3,
    title: "Expense 3",
    amount: 300,
  },
];

export const expensesRoute = new Hono()
  .get("/", (c) => {
    return c.json({ expenses: fakeExpenses });
  })
  .post("/", zValidator("json", createExpenseSchema), async (c) => {
    const expense = await c.req.valid("json");
    fakeExpenses.push({ ...expense, id: fakeExpenses.length + 1 });
    c.status(201);
    return c.json(expense);
  })
  .get("/total-spent", async (c) => {
    const totalSpent = fakeExpenses.reduce(
      (acc, expense) => acc + expense.amount,
      0
    );
    return c.json({ totalSpent });
  })
  .get("/:id{[0-9]+}", async (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const expense = fakeExpenses.find((expense) => expense.id === id);
    if (!expense) return c.notFound();
    return c.json({ expense });
  })
  .delete("/:id{[0-9]+}", async (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const index = fakeExpenses.findIndex((expense) => expense.id === id);
    if (index === -1) return c.notFound();
    const deletedExpense = fakeExpenses.splice(index, 1)[0];
    return c.json(deletedExpense);
  });
