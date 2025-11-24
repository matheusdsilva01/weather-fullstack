import { Toaster } from '@/components/ui/sonner'
import { createRootRouteWithContext, Outlet, useNavigate } from '@tanstack/react-router'
import { useAuth } from '@/context/AuthContext'

interface MyRouterContext {
  auth: ReturnType<typeof useAuth>
}
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

const RootLayout = () => {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate({ to: '/login', search: { redirect: window.location.pathname || '/' } })
  }

  return (
    <>
      <div className="p-2 flex gap-2 text-lg border-b justify-between items-center">
        <div className="font-bold">Weather App</div>
        {isAuthenticated && (
          <button onClick={handleLogout} className="cursor-pointer bg-red-500 text-white px-3 py-1 rounded">
            Logout
          </button>
        )}
      </div>
      <Outlet />
      <Toaster />
      <TanStackRouterDevtools />
    </>
  )
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootLayout,
})