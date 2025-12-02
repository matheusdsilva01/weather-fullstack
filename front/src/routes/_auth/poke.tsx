import { ListPokemon } from '@/components/llist-pokemon'
import { Pagination } from '@/components/pagination'
import { Skeleton } from '@/components/ui/skeleton'
import { getPokemonList } from '@/services/poke'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/poke')({
  component: PokeRoute,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      page: Number(search?.page ?? 1),
      pageSize: Number(search?.pageSize ?? 20)
    }
  }
})

function PokeRoute() {
  const { page, pageSize } = Route.useSearch()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['pokemon-list', page, pageSize],
    queryFn: () =>
      getPokemonList({
        page,
        pageSize
      })
  })

  if (isError) {
    return <div className='p-4 text-red-500'>Erro ao buscar dados</div>
  }

  return (
    <div className='space-y-6 p-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold tracking-tight'>Pokemon</h1>
      </div>

      {isLoading ? (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {Array.from({ length: pageSize }).map((_, i) => (
            <Skeleton key={i} className='h-32 w-full' />
          ))}
        </div>
      ) : (
        <>
          <div className='mt-6'>
            <Pagination
              pageIndex={page}
              pageSize={pageSize}
              pageCount={Math.ceil((data?.totalItems || 0) / pageSize)}
              totalCount={data?.totalItems}
            />
          </div>

          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {data && <ListPokemon items={data.items} />}
          </div>

          <div className='mt-6'>
            <Pagination
              pageIndex={page}
              pageSize={pageSize}
              pageCount={Math.ceil((data?.totalItems || 0) / pageSize)}
              totalCount={data?.totalItems}
            />
          </div>
        </>
      )}
    </div>
  )
}
