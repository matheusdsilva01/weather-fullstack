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
    url: '/',
    items: [
      { title: 'Home', url: '/' },
      { title: 'Usuários', url: '/users' },
      { title: 'Pokemons', url: '/poke' }
    ]
  }
]

export function isActiveRoute(routeUrl: string, currentUrl: string): boolean {
  return currentUrl === routeUrl || currentUrl.startsWith(routeUrl + '/')
}
