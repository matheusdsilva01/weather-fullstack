import { UsersTable } from '@/components/users-table'
import { listUsers } from '@/services/list-users'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

type SearchParams = {
  page: number
  pageSize: number
}

export const Route = createFileRoute('/_auth/users')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): SearchParams => {
    return {
      page: Number(search?.page ?? 1),
      pageSize: Number(search?.pageSize ?? 10)
    }
  }
})

function RouteComponent() {
  const params = Route.useSearch()
  const { data, isLoading } = useQuery({
    queryKey: ['users', params.page, params.pageSize],
    queryFn: () => listUsers({ page: params.page, pageSize: params.pageSize })
  })

  return (
    <div>
      {isLoading && <div>Loading users...</div>}
      <UsersTable
        users={data?.items || []}
        pageCount={data?.totalPages ?? 1}
        totalCount={data?.totalItems ?? 1}
      />
    </div>
  )
}
