import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/aboutt")({
  beforeLoad: () => {
    throw redirect({
      to: "/about",
      replace: true,
    });
  },
});
