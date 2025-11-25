import { LoginForm } from '@/components/login-form'
import { createFileRoute, redirect } from '@tanstack/react-router'

type LoginRouteSearch = {
  redirect?: string
}

export const Route = createFileRoute('/login')({
  validateSearch: (search: Record<string, unknown>): LoginRouteSearch => {
    const s = search as LoginRouteSearch
    return {
      redirect: s?.redirect as string || undefined,
    }
  },
  beforeLoad: ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({
        to: search.redirect || '/',
      })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
