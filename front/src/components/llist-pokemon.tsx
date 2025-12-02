import type { PokemonListItem } from '@/types/poke'
import { useState, Activity } from 'react'
import { ModalPokemonDetail } from './modal-pokemon-detail'
import { Button } from './ui/button'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'

export function ListPokemon({ items }: { items: PokemonListItem[] }) {
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null)

  return (
    <>
      {items.map((poke) => (
        <Card
          key={poke.name}
          className='hover:bg-accent/50 cursor-pointer transition-colors'
          onClick={() => setSelectedPokemon(poke.name)}
        >
          <CardHeader>
            <CardTitle className='text-center capitalize'>
              {poke.name}
            </CardTitle>
          </CardHeader>
          <CardContent className='flex justify-center'>
            <Button variant='ghost' className='w-full'>
              View Details
            </Button>
          </CardContent>
        </Card>
      ))}
      <Activity
        key={selectedPokemon}
        mode={selectedPokemon ? 'visible' : 'hidden'}
      >
        <ModalPokemonDetail
          selectedPokemon={selectedPokemon!}
          setSelectedPokemon={setSelectedPokemon}
        />
      </Activity>
    </>
  )
}
