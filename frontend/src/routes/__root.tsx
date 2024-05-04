import { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    component: Root,
  },
);

function NavBar() {
  return (
    <div className="flex gap-2 p-2">
      <Link className="[&.active]:font-bold" to="/">
        Home
      </Link>
      <Link className="[&.active]:font-bold" to="/about">
        About
      </Link>
      <Link className="[&.active]:font-bold" to="/expenses">
        Expenses
      </Link>
      <Link className="[&.active]:font-bold" to="/create-expense">
        Create
      </Link>
    </div>
  );
}

function Root() {
  return (
    <>
      <NavBar />
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
