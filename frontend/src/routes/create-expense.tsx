import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";
import { useForm, type FieldApi } from "@tanstack/react-form";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";

export const Route = createFileRoute("/create-expense")({
  component: CreateExpense,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.touchedErrors ? (
        <em>{field.state.meta.touchedErrors}</em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}

function CreateExpense() {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      title: "",
      amount: 0,
    },
    onSubmit: async ({ value }) => {
      await new Promise((r) => setTimeout(r, 1000));
      const res = await api.expenses.$post({ json: value });
      if (!res.ok) throw new Error(res.statusText);
      navigate({ to: "/expenses" });
    },
    validatorAdapter: zodValidator,
  });
  return (
    <div className="p-2">
      <h2>Create Expense</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit();
        }}
        className="mx-auto max-w-xl"
      >
        <form.Field
          name="title"
          validators={{
            onChange: z
              .string()
              .min(3, "Title must be at least 3 characters long"),
          }}
          children={(field) => (
            <>
              <Label htmlFor={field.name}>Title</Label>
              <Input
                name={field.name}
                id={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </>
          )}
        />
        <form.Field
          name="amount"
          children={(field) => (
            <>
              <Label htmlFor={field.name}>Amount</Label>
              <Input
                name={field.name}
                id={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(Number(e.target.value))}
              />
              <FieldInfo field={field} />
            </>
          )}
        />
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              disabled={!canSubmit || isSubmitting}
              className="mt-4"
            >
              {isSubmitting ? "..." : "Create Expense"}
            </Button>
          )}
        />
      </form>
    </div>
  );
}
