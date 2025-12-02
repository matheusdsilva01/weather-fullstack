type RouteItem = {
  title: string
  url: string
}

type AppRoutes = {
  items: RouteItem[]
} & RouteItem

export const appRoutes: AppRoutes[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    items: [
      { title: 'Home', url: '/' },
      { title: 'About', url: '/about' },
      { title: 'Users', url: '/users' },
      { title: 'Poke', url: '/poke' }
    ]
  }
]

export function isActiveRoute(routeUrl: string, currentUrl: string): boolean {
  return currentUrl === routeUrl || currentUrl.startsWith(routeUrl + '/')
}
