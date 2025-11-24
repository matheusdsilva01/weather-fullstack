import { createFileRoute, redirect } from "@tanstack/react-router"

// src/routes/_authenticated.tsx
export const Route = createFileRoute('/_auth')({
  beforeLoad: async ({ location, context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
})