import { getPokemonDetails } from '@/services/poke'
import { useQuery } from '@tanstack/react-query'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from './ui/dialog'
import { Badge } from './ui/badge'
import { Skeleton } from './ui/skeleton'

export function ModalPokemonDetail({
  selectedPokemon,
  setSelectedPokemon
}: {
  selectedPokemon: string
  setSelectedPokemon: (name: string | null) => void
}) {
  const { data: details, isLoading: isLoadingDetails } = useQuery({
    queryKey: ['pokemon-detail', selectedPokemon],
    queryFn: () => getPokemonDetails(selectedPokemon),
    enabled: !!selectedPokemon
  })

  return (
    <Dialog
      open={!!selectedPokemon}
      onOpenChange={(open) => !open && setSelectedPokemon(null)}
    >
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='text-center text-2xl capitalize'>
            {selectedPokemon}
          </DialogTitle>
          <DialogDescription className='text-center'>
            Pokemon Details
          </DialogDescription>
        </DialogHeader>
        {isLoadingDetails ? (
          <div className='flex flex-col items-center space-y-4 p-4'>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-2/3' />
          </div>
        ) : details ? (
          <div className='flex flex-col items-center space-y-4'>
            <div className='grid w-full grid-cols-2 gap-4 text-center'>
              <div className='bg-muted rounded-lg p-2'>
                <p className='text-muted-foreground text-sm'>Height</p>
                <p className='font-medium'>{details.height / 10} m</p>
              </div>
              <div className='bg-muted rounded-lg p-2'>
                <p className='text-muted-foreground text-sm'>Weight</p>
                <p className='font-medium'>{details.weight / 10} kg</p>
              </div>
            </div>

            <div className='flex flex-wrap justify-center gap-2'>
              {details.types.map((t) => (
                <Badge key={t.slot} variant='secondary' className='capitalize'>
                  {t.type.name}
                </Badge>
              ))}
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
